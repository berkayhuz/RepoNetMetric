// <copyright file="WorkspaceCommandHandlerTests.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using System.Net;
using FluentAssertions;
using Moq;
using NetMetric.Auth.Application.Abstractions;
using NetMetric.Auth.Application.Exceptions;
using NetMetric.Auth.Application.Features.Commands;
using NetMetric.Auth.Application.Features.Handlers;
using NetMetric.Auth.Domain.Entities;
using NetMetric.Auth.TestKit.Builders;
using NetMetric.Auth.TestKit.Fakes;

namespace NetMetric.Auth.Application.UnitTests.Handlers;

public sealed class WorkspaceCommandHandlerTests
{
    [Fact]
    public async Task SwitchWorkspace_When_UserIsInactive_Should_Deny_Without_Issuing_Session()
    {
        var tenantId = Guid.NewGuid();
        var user = AuthTestDataBuilder.User()
            .WithTenant(tenantId)
            .AsInactive()
            .Build();
        var fixture = new Fixture();
        fixture.Tenants.Setup(repository => repository.GetByIdAsync(tenantId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(AuthTestDataBuilder.Tenant(tenantId));
        fixture.Users.Setup(repository => repository.GetActiveByIdAsync(tenantId, user.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);

        var sut = fixture.CreateSut();

        var action = async () => await sut.Handle(CreateCommand(tenantId, user.Id), CancellationToken.None);

        var exception = await action.Should().ThrowAsync<AuthApplicationException>();
        exception.Which.StatusCode.Should().Be((int)HttpStatusCode.Forbidden);
        exception.Which.ErrorCode.Should().Be("workspace_membership_forbidden");
        fixture.RefreshTokenService.Verify(service => service.Generate(), Times.Never);
        fixture.SessionRepository.Verify(repository => repository.AddAsync(It.IsAny<UserSession>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task SwitchWorkspace_When_TenantIsInactive_Should_Deny_Without_Issuing_Session()
    {
        var tenantId = Guid.NewGuid();
        var userId = Guid.NewGuid();
        var fixture = new Fixture();
        fixture.Tenants.Setup(repository => repository.GetByIdAsync(tenantId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(AuthTestDataBuilder.Tenant(tenantId, isActive: false));

        var sut = fixture.CreateSut();

        var action = async () => await sut.Handle(CreateCommand(tenantId, userId), CancellationToken.None);

        var exception = await action.Should().ThrowAsync<AuthApplicationException>();
        exception.Which.StatusCode.Should().Be((int)HttpStatusCode.NotFound);
        exception.Which.ErrorCode.Should().Be("workspace_not_found");
        fixture.RefreshTokenService.Verify(service => service.Generate(), Times.Never);
        fixture.SessionRepository.Verify(repository => repository.AddAsync(It.IsAny<UserSession>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task SwitchWorkspace_When_MembershipIsInactive_Should_Deny_Without_Issuing_Session()
    {
        var tenantId = Guid.NewGuid();
        var user = AuthTestDataBuilder.User()
            .WithTenant(tenantId)
            .Build();
        var fixture = new Fixture();
        fixture.Tenants.Setup(repository => repository.GetByIdAsync(tenantId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(AuthTestDataBuilder.Tenant(tenantId));
        fixture.Users.Setup(repository => repository.GetActiveByIdAsync(tenantId, user.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        fixture.Users.Setup(repository => repository.GetMembershipAsync(tenantId, user.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(AuthTestDataBuilder.Membership(tenantId, user.Id, isActive: false));

        var sut = fixture.CreateSut();

        var action = async () => await sut.Handle(CreateCommand(tenantId, user.Id), CancellationToken.None);

        var exception = await action.Should().ThrowAsync<AuthApplicationException>();
        exception.Which.StatusCode.Should().Be((int)HttpStatusCode.Forbidden);
        exception.Which.ErrorCode.Should().Be("workspace_membership_forbidden");
        fixture.RefreshTokenService.Verify(service => service.Generate(), Times.Never);
        fixture.SessionRepository.Verify(repository => repository.AddAsync(It.IsAny<UserSession>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task SwitchWorkspace_When_MembershipIsMissing_Should_Deny_Without_Issuing_Session()
    {
        var tenantId = Guid.NewGuid();
        var user = AuthTestDataBuilder.User()
            .WithTenant(tenantId)
            .Build();
        var fixture = new Fixture();
        fixture.Tenants.Setup(repository => repository.GetByIdAsync(tenantId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(AuthTestDataBuilder.Tenant(tenantId));
        fixture.Users.Setup(repository => repository.GetActiveByIdAsync(tenantId, user.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        fixture.Users.Setup(repository => repository.GetMembershipAsync(tenantId, user.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync((UserTenantMembership?)null);

        var sut = fixture.CreateSut();

        var action = async () => await sut.Handle(CreateCommand(tenantId, user.Id), CancellationToken.None);

        var exception = await action.Should().ThrowAsync<AuthApplicationException>();
        exception.Which.StatusCode.Should().Be((int)HttpStatusCode.Forbidden);
        exception.Which.ErrorCode.Should().Be("workspace_membership_forbidden");
        fixture.RefreshTokenService.Verify(service => service.Generate(), Times.Never);
        fixture.SessionRepository.Verify(repository => repository.AddAsync(It.IsAny<UserSession>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    private static SwitchWorkspaceCommand CreateCommand(Guid targetTenantId, Guid userId) =>
        new(Guid.NewGuid(), targetTenantId, userId, "127.0.0.1", "unit-test", "corr", "trace");

    private sealed class Fixture
    {
        private readonly FakeClock _clock = new(new DateTime(2026, 1, 8, 0, 0, 0, DateTimeKind.Utc));

        public Mock<ITenantRepository> Tenants { get; } = new();
        public Mock<IUserRepository> Users { get; } = new();
        public Mock<IUserSessionRepository> SessionRepository { get; } = new();
        public Mock<IAuthUnitOfWork> UnitOfWork { get; } = new();
        public Mock<IAuthAuditTrail> AuditTrail { get; } = new();
        public Mock<IAccessTokenFactory> AccessTokenFactory { get; } = new();
        public Mock<IRefreshTokenService> RefreshTokenService { get; } = new();
        public Mock<IAuthSessionService> AuthSessionService { get; } = new();
        public Mock<IUserSessionStateValidator> UserSessionStateValidator { get; } = new();

        public SwitchWorkspaceCommandHandler CreateSut() =>
            new(
                Tenants.Object,
                Users.Object,
                SessionRepository.Object,
                UnitOfWork.Object,
                AuditTrail.Object,
                AccessTokenFactory.Object,
                RefreshTokenService.Object,
                AuthSessionService.Object,
                UserSessionStateValidator.Object,
                _clock);
    }
}
