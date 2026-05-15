// <copyright file="ProfileAndPreferencesCommandTests.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using FluentAssertions;
using Moq;
using NetMetric.Account.Application.Abstractions.Audit;
using NetMetric.Account.Application.Abstractions.Membership;
using NetMetric.Account.Application.Abstractions.Persistence;
using NetMetric.Account.Application.Abstractions.Security;
using NetMetric.Account.Application.Preferences.Commands;
using NetMetric.Account.Contracts.Organizations;
using NetMetric.Account.Contracts.Preferences;
using NetMetric.Account.Domain.Common;
using NetMetric.Account.Domain.Preferences;
using NetMetric.Account.Domain.Profiles;
using NetMetric.Clock;
using NetMetric.Media.Abstractions;
using NetMetric.Media.Models;

namespace NetMetric.Account.Application.UnitTests;

public sealed class ProfileAndPreferencesCommandTests
{
    [Fact]
    public async Task UpdateMyProfile_ShouldRejectInvalidPhone()
    {
        var now = DateTimeOffset.UtcNow;
        var current = CreateCurrentUser();
        var profile = UserProfile.Create(TenantId.From(current.TenantId), UserId.From(current.UserId), "A", "B", now);

        var handler = new NetMetric.Account.Application.Profiles.Commands.UpdateMyProfileCommandHandler(
            MockCurrentUser(current),
            Mock.Of<IClock>(c => c.UtcNow == now),
            MockRepo(profile),
            Mock.Of<IAccountDbContext>(),
            Mock.Of<IConcurrencyTokenWriter>(),
            Mock.Of<IAccountAuditWriter>());

        var result = await handler.Handle(
            new NetMetric.Account.Application.Profiles.Commands.UpdateMyProfileCommand(
                new NetMetric.Account.Contracts.Profiles.UpdateMyProfileRequest(
                    "Ada", "Lovelace", "ZZ", "abc", null, null, null, "UTC", "en-US", null)),
            CancellationToken.None);

        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be("validation_error");
    }

    [Fact]
    public async Task UpdateMyProfile_ShouldNormalizeValidPhone()
    {
        var now = DateTimeOffset.UtcNow;
        var current = CreateCurrentUser();
        var profile = UserProfile.Create(TenantId.From(current.TenantId), UserId.From(current.UserId), "A", "B", now);

        var handler = new NetMetric.Account.Application.Profiles.Commands.UpdateMyProfileCommandHandler(
            MockCurrentUser(current),
            Mock.Of<IClock>(c => c.UtcNow == now),
            MockRepo(profile),
            Mock.Of<IAccountDbContext>(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()) == Task.FromResult(1)),
            Mock.Of<IConcurrencyTokenWriter>(),
            Mock.Of<IAccountAuditWriter>());

        var result = await handler.Handle(
            new NetMetric.Account.Application.Profiles.Commands.UpdateMyProfileCommand(
                new NetMetric.Account.Contracts.Profiles.UpdateMyProfileRequest(
                    "Ada", "Lovelace", "TR", "5551234567", null, null, null, "UTC", "en-US", null)),
            CancellationToken.None);

        result.IsSuccess.Should().BeTrue();
        result.Value!.PhoneNumber.Should().StartWith("+");
        result.Value.PhoneCountryIso2.Should().Be("TR");
    }

    [Fact]
    public async Task UpdateMyProfile_ShouldPreserveExistingAvatar()
    {
        var now = DateTimeOffset.UtcNow;
        var current = CreateCurrentUser();
        var profile = UserProfile.Create(TenantId.From(current.TenantId), UserId.From(current.UserId), "A", "B", now);
        var assetId = Guid.NewGuid();
        profile.AssignManagedAvatar(assetId, "https://cdn.netmetric.net/netmetric/media/avatar.png", now);

        var handler = new NetMetric.Account.Application.Profiles.Commands.UpdateMyProfileCommandHandler(
            MockCurrentUser(current),
            Mock.Of<IClock>(c => c.UtcNow == now),
            MockRepo(profile),
            Mock.Of<IAccountDbContext>(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()) == Task.FromResult(1)),
            Mock.Of<IConcurrencyTokenWriter>(),
            Mock.Of<IAccountAuditWriter>());

        var result = await handler.Handle(
            new NetMetric.Account.Application.Profiles.Commands.UpdateMyProfileCommand(
                new NetMetric.Account.Contracts.Profiles.UpdateMyProfileRequest(
                    "Ada", "Lovelace", null, null, null, "Engineer", null, "UTC", "en-US", null)),
            CancellationToken.None);

        result.IsSuccess.Should().BeTrue();
        profile.AvatarUrl.Should().Be("https://cdn.netmetric.net/netmetric/media/avatar.png");
        profile.AvatarMediaAssetId.Should().Be(assetId);
    }

    [Fact]
    public async Task UploadMyAvatar_ShouldStoreSafeFileNameAndLocalPublicUrl()
    {
        var now = DateTimeOffset.UtcNow;
        var current = CreateCurrentUser();
        var profile = UserProfile.Create(TenantId.From(current.TenantId), UserId.From(current.UserId), "Ada", "Lovelace", now);
        var mediaAssets = new List<AccountMediaAsset>();
        var mediaAssetService = new Mock<IMediaAssetService>();
        mediaAssetService
            .Setup(x => x.UploadImageAsync(It.IsAny<MediaUploadRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new MediaUploadResult(
                "image/png",
                ".png",
                128,
                new string('a', 64),
                1,
                1,
                "LocalFile",
                "netmetric/media/tenant/avatar/original.png",
                "http://localhost:5301/uploads/netmetric/media/tenant/avatar/original.png"));

        var handler = new NetMetric.Account.Application.Profiles.Commands.UploadMyAvatarCommandHandler(
            MockCurrentUser(current),
            Mock.Of<IClock>(c => c.UtcNow == now),
            MockRepo(profile),
            MockRepoList(mediaAssets),
            Mock.Of<IAccountDbContext>(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()) == Task.FromResult(1)),
            mediaAssetService.Object);

        await using var content = new MemoryStream([0x89, 0x50, 0x4E, 0x47]);
        var result = await handler.Handle(
            new NetMetric.Account.Application.Profiles.Commands.UploadMyAvatarCommand(
                "..\\secret.png",
                "image/png",
                content,
                content.Length),
            CancellationToken.None);

        result.IsSuccess.Should().BeTrue();
        result.Value!.PublicUrl.Should().Be("http://localhost:5301/uploads/netmetric/media/tenant/avatar/original.png");
        result.Value.PublicUrl.Should().NotContain(Path.GetFullPath(".runlogs/media"));
        mediaAssets.Should().ContainSingle();
        mediaAssets[0].OriginalFileName.Should().Be("secret.png");
        mediaAssets[0].SafeFileName.Should().Be("secret.png");
        mediaAssets[0].OriginalFileName.Should().NotContain("..");
        mediaAssets[0].OriginalFileName.Should().NotContain("\\");
    }

    [Fact]
    public async Task UpdateMyPreferences_ShouldRejectInaccessibleDefaultOrganization()
    {
        var now = DateTimeOffset.UtcNow;
        var current = CreateCurrentUser();
        var forbiddenOrg = Guid.NewGuid();
        var preference = UserPreference.CreateDefault(TenantId.From(current.TenantId), UserId.From(current.UserId), now);

        var membership = new Mock<IMembershipReadService>();
        membership
            .Setup(x => x.GetMyOrganizationsAsync(current.TenantId, current.UserId, It.IsAny<CancellationToken>()))
            .ReturnsAsync([new OrganizationMembershipSummaryResponse(Guid.NewGuid(), current.TenantId, "Org", "org", "active", true, now, now, ["owner"])]);

        var handler = new UpdateMyPreferencesCommandHandler(
            MockCurrentUser(current),
            Mock.Of<IClock>(c => c.UtcNow == now),
            MockRepo(preference),
            MockRepo(UserProfile.Create(TenantId.From(current.TenantId), UserId.From(current.UserId), "A", "B", now)),
            membership.Object,
            Mock.Of<IAccountDbContext>(),
            Mock.Of<IConcurrencyTokenWriter>(),
            Mock.Of<IAccountAuditWriter>());

        var result = await handler.Handle(
            new UpdateMyPreferencesCommand(new UpdateUserPreferenceRequest("System", "en-US", "UTC", "yyyy-MM-dd", forbiddenOrg, null)),
            CancellationToken.None);

        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be("forbidden");
    }

    [Fact]
    public void UpdateMyProfileValidator_ShouldRejectAvatarUrlInput()
    {
        var validator = new NetMetric.Account.Application.Profiles.Commands.UpdateMyProfileCommandValidator();

        var avatarUrlUpdate = validator.Validate(new NetMetric.Account.Application.Profiles.Commands.UpdateMyProfileCommand(
            new NetMetric.Account.Contracts.Profiles.UpdateMyProfileRequest(
                "Ada", "Lovelace", null, null, "https://evil.example/avatar.png", null, null, "UTC", "en-US", null)));

        avatarUrlUpdate.IsValid.Should().BeFalse();
    }

    [Fact]
    public void UpdateMyPreferencesValidator_ShouldEnforceOptionGuards()
    {
        var validator = new UpdateMyPreferencesCommandValidator();

        var invalid = validator.Validate(new UpdateMyPreferencesCommand(new UpdateUserPreferenceRequest(
            "Nope", "xx", "Invalid/Tz", "bad", null, null)));

        invalid.IsValid.Should().BeFalse();

        var valid = validator.Validate(new UpdateMyPreferencesCommand(new UpdateUserPreferenceRequest(
            "System", "tr", "UTC", "yyyy-MM-dd", null, null)));

        valid.IsValid.Should().BeTrue();
    }

    private static CurrentUser CreateCurrentUser() =>
        new(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), DateTimeOffset.UtcNow, ["pwd", "mfa"], "corr", "127.0.0.1", "tests");

    private static ICurrentUserAccessor MockCurrentUser(CurrentUser current)
        => Mock.Of<ICurrentUserAccessor>(x => x.GetRequired() == current);

    private static IRepository<IAccountDbContext, TEntity> MockRepo<TEntity>(TEntity entity)
        where TEntity : class
    {
        var list = new List<TEntity> { entity };
        return MockRepoList(list);
    }

    private static IRepository<IAccountDbContext, TEntity> MockRepoList<TEntity>(List<TEntity> list)
        where TEntity : class
    {
        var mock = new Mock<IRepository<IAccountDbContext, TEntity>>();
        mock.SetupGet(x => x.Query).Returns(new TestAsyncEnumerable<TEntity>(list));
        mock.Setup(x => x.FirstOrDefaultAsync(It.IsAny<System.Linq.Expressions.Expression<Func<TEntity, bool>>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((System.Linq.Expressions.Expression<Func<TEntity, bool>> predicate, CancellationToken _) => list.AsQueryable().FirstOrDefault(predicate));
        mock.Setup(x => x.AddAsync(It.IsAny<TEntity>(), It.IsAny<CancellationToken>()))
            .Callback<TEntity, CancellationToken>((e, _) => list.Add(e))
            .Returns(Task.CompletedTask);
        return mock.Object;
    }
}
