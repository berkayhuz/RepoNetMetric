// <copyright file="MediaOptionsAndValidationTests.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using System.Text;
using FluentAssertions;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using NetMetric.Media;
using NetMetric.Media.Models;
using NetMetric.Media.Options;
using NetMetric.Media.Services;
using NetMetric.Media.Urls;
using NetMetric.Media.Validation;

namespace NetMetric.Account.Api.UnitTests;

public sealed class MediaOptionsAndValidationTests
{
    [Fact]
    public void DevelopmentMediaOptions_ShouldGenerateLocalUrl()
    {
        var options = CreateDevelopmentMediaOptions();
        var validation = new MediaOptionsValidation(new TestHostEnvironment("Development")).Validate(null, options);

        validation.Succeeded.Should().BeTrue();

        var url = new MediaUrlBuilder(Microsoft.Extensions.Options.Options.Create(options))
            .BuildPublicUrl("netmetric/media/tenant/avatar/original.png");

        url.Should().Be("http://localhost:5301/uploads/netmetric/media/tenant/avatar/original.png");
        url.Should().NotContain("cdn.netmetric.net");
        url.Should().NotContain(Path.GetFullPath(options.Local.RootPath));
    }

    [Fact]
    public void ProductionMediaOptions_ShouldAllowCdnBackedCloudflareStorage()
    {
        var options = new MediaOptions
        {
            PublicBaseUrl = "https://cdn.netmetric.net",
            StorageProvider = "CloudflareR2",
            CloudflareR2 = new MediaCloudflareR2Options
            {
                AccountId = "netmetricprodaccount",
                BucketName = "netmetric-prod-media",
                AccessKeyId = "prod-access-key",
                SecretAccessKey = "prod-secret-key",
                ObjectKeyPrefix = "netmetric"
            }
        };

        var validation = new MediaOptionsValidation(new TestHostEnvironment("Production")).Validate(null, options);
        validation.Succeeded.Should().BeTrue();

        var url = new MediaUrlBuilder(Microsoft.Extensions.Options.Options.Create(options))
            .BuildPublicUrl("netmetric/media/tenant/avatar/original.png");

        url.Should().Be("https://cdn.netmetric.net/netmetric/media/tenant/avatar/original.png");
    }

    [Fact]
    public async Task MediaAssetService_ShouldRejectInvalidAvatarPayload()
    {
        var options = CreateDevelopmentMediaOptions();
        var storage = new InMemoryMediaStorageProvider();
        var service = new MediaAssetService(
            storage,
            new MediaUrlBuilder(Microsoft.Extensions.Options.Options.Create(options)),
            new DefaultImageValidator(Microsoft.Extensions.Options.Options.Create(options)),
            new DefaultImageMetadataReader(),
            Microsoft.Extensions.Options.Options.Create(options));

        await using var content = new MemoryStream(Encoding.UTF8.GetBytes("not an image"));
        var request = new MediaUploadRequest(
            "tenant",
            "avatar",
            "user",
            "avatar.png",
            "image/png",
            content,
            content.Length,
            "account");

        var act = () => service.UploadImageAsync(request, CancellationToken.None);

        await act.Should().ThrowAsync<MediaValidationException>();
        storage.SavedKeys.Should().BeEmpty();
    }

    private static MediaOptions CreateDevelopmentMediaOptions() =>
        new()
        {
            PublicBaseUrl = "http://localhost:5301/uploads",
            StorageProvider = "LocalFile",
            MaxImageBytes = 10 * 1024 * 1024,
            Local = new MediaLocalOptions
            {
                RootPath = ".runlogs/media",
                RequestPath = "/uploads"
            }
        };

    private sealed class InMemoryMediaStorageProvider : NetMetric.Media.Abstractions.IMediaStorageProvider
    {
        public List<string> SavedKeys { get; } = [];

        public string Name => "LocalFile";

        public Task SaveAsync(string key, Stream content, string contentType, CancellationToken cancellationToken)
        {
            SavedKeys.Add(key);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(string key, CancellationToken cancellationToken) => Task.CompletedTask;

        public Task<bool> ExistsAsync(string key, CancellationToken cancellationToken) => Task.FromResult(false);
    }

    private sealed class TestHostEnvironment(string environmentName) : IHostEnvironment
    {
        public string EnvironmentName { get; set; } = environmentName;
        public string ApplicationName { get; set; } = "NetMetric.Account.Api.UnitTests";
        public string ContentRootPath { get; set; } = Directory.GetCurrentDirectory();
        public IFileProvider ContentRootFileProvider { get; set; } = new NullFileProvider();
    }
}
