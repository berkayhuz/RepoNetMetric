// <copyright file="AuthCommandValidatorTests.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using FluentAssertions;
using Microsoft.Extensions.Options;
using Moq;
using NetMetric.Auth.Application.Abstractions;
using NetMetric.Auth.Application.Features.Commands;
using NetMetric.Auth.Application.Options;
using NetMetric.Auth.Application.Validators;
using OptionsFactory = Microsoft.Extensions.Options.Options;

namespace NetMetric.Auth.Application.UnitTests.Security;

public sealed class AuthCommandValidatorTests
{
    [Fact]
    public void CreateWorkspaceCommandValidator_When_NameIsInvalid_Should_Reject()
    {
        var validator = new CreateWorkspaceCommandValidator();
        var command = new CreateWorkspaceCommand(Guid.NewGuid(), Guid.NewGuid(), " ", null, null, null, null, null);

        var result = validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(error => error.PropertyName == nameof(CreateWorkspaceCommand.Name));
    }

    [Fact]
    public void SwitchWorkspaceCommandValidator_When_TargetTenantIdIsEmpty_Should_Reject()
    {
        var validator = new SwitchWorkspaceCommandValidator();
        var command = new SwitchWorkspaceCommand(Guid.NewGuid(), Guid.Empty, Guid.NewGuid(), null, null, null, null);

        var result = validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(error => error.PropertyName == nameof(SwitchWorkspaceCommand.TargetTenantId));
    }

    [Fact]
    public void UpdateTenantMemberRolesCommandValidator_When_RolesAreEmpty_Should_Reject()
    {
        var validator = new UpdateTenantMemberRolesCommandValidator();
        var command = new UpdateTenantMemberRolesCommand(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), [], null, null, null, null);

        var result = validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(error => error.PropertyName == nameof(UpdateTenantMemberRolesCommand.Roles));
    }

    [Fact]
    public void UpdateTenantMemberRolesCommandValidator_When_RoleValueIsBlank_Should_Reject()
    {
        var validator = new UpdateTenantMemberRolesCommandValidator();
        var command = new UpdateTenantMemberRolesCommand(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), ["tenant-user", " "], null, null, null, null);

        var result = validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(error => error.PropertyName == "Roles[1]");
    }

    [Fact]
    public void RevokeSessionCommandValidator_When_SessionIdIsEmpty_Should_Reject()
    {
        var validator = new RevokeSessionCommandValidator();
        var command = new RevokeSessionCommand(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), Guid.Empty, "alice@example.com", null, null, null, null);

        var result = validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(error => error.PropertyName == nameof(RevokeSessionCommand.SessionId));
    }

    [Fact]
    public void RevokeOtherSessionsCommandValidator_When_EmailIsInvalid_Should_Reject()
    {
        var validator = new RevokeOtherSessionsCommandValidator();
        var command = new RevokeOtherSessionsCommand(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), "not-an-email", null, null, null, null);

        var result = validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(error => error.PropertyName == nameof(RevokeOtherSessionsCommand.Email));
    }

    [Fact]
    public void ChangeEmailCommandValidator_When_CurrentEmailIsInvalid_Should_Reject()
    {
        var validator = new ChangeEmailCommandValidator();
        var command = new ChangeEmailCommand(Guid.NewGuid(), Guid.NewGuid(), "new@example.com", "not-an-email", null, null, null, null, null);

        var result = validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(error => error.PropertyName == nameof(ChangeEmailCommand.CurrentEmail));
    }

    [Fact]
    public void ResetPasswordCommandValidator_When_TokenIsMissing_Should_Reject()
    {
        var validator = new ResetPasswordCommandValidator(OptionsFactory.Create(new PasswordPolicyOptions()));
        var command = new ResetPasswordCommand(Guid.NewGuid(), Guid.NewGuid(), string.Empty, "Str0ng!Pass123", null, null, null, null);

        var result = validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(error => error.PropertyName == nameof(ResetPasswordCommand.Token));
    }

    [Fact]
    public async Task RegisterCommandValidator_When_NormalizedEmailAlreadyExists_Should_Reject()
    {
        var users = new Mock<IUserRepository>();
        users
            .Setup(repository => repository.ExistsByEmailAsync("ADA@EXAMPLE.COM", It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);
        var validator = new RegisterCommandValidator(OptionsFactory.Create(new PasswordPolicyOptions()), users.Object);

        var result = await validator.ValidateAsync(new RegisterCommand(
            "Acme",
            "ada",
            "  Ada@Example.com  ",
            "Str0ng!Pass123",
            "Ada",
            "Lovelace",
            "en-US",
            null,
            null));

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(error =>
            error.PropertyName == nameof(RegisterCommand.Email) &&
            error.ErrorMessage == "Registration could not be completed with the supplied identity.");
    }

    [Fact]
    public async Task RegisterCommandValidator_When_EmailDiffersOnlyByCase_Should_QueryCaseInsensitiveKey()
    {
        var users = new Mock<IUserRepository>();
        users
            .Setup(repository => repository.ExistsByEmailAsync("GRACE@EXAMPLE.COM", It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);
        var validator = new RegisterCommandValidator(OptionsFactory.Create(new PasswordPolicyOptions()), users.Object);

        var result = await validator.ValidateAsync(new RegisterCommand(
            "Acme",
            "grace",
            "Grace@Example.com",
            "Str0ng!Pass123",
            "Grace",
            "Hopper",
            "en-US",
            null,
            null));

        result.IsValid.Should().BeTrue();
        users.Verify(repository => repository.ExistsByEmailAsync("GRACE@EXAMPLE.COM", It.IsAny<CancellationToken>()), Times.Once);
    }
}
