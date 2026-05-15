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
