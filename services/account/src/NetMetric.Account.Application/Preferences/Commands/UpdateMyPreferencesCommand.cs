// <copyright file="UpdateMyPreferencesCommand.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NetMetric.Account.Application.Abstractions.Audit;
using NetMetric.Account.Application.Abstractions.Membership;
using NetMetric.Account.Application.Abstractions.Persistence;
using NetMetric.Account.Application.Abstractions.Security;
using NetMetric.Account.Application.Common;
using NetMetric.Account.Application.Preferences.Queries;
using NetMetric.Account.Contracts.Preferences;
using NetMetric.Account.Domain.Common;
using NetMetric.Account.Domain.Preferences;
using NetMetric.Account.Domain.Profiles;
using NetMetric.Clock;
using NetMetric.Localization;

namespace NetMetric.Account.Application.Preferences.Commands;

public sealed record UpdateMyPreferencesCommand(UpdateUserPreferenceRequest Request) : IRequest<Result<UserPreferenceResponse>>;

public sealed class UpdateMyPreferencesCommandValidator : AbstractValidator<UpdateMyPreferencesCommand>
{
    public UpdateMyPreferencesCommandValidator()
    {
        RuleFor(x => x.Request.Theme).Must(value => Enum.TryParse<ThemePreference>(value, true, out _));
        RuleFor(x => x.Request.Language)
            .NotEmpty()
            .MaximumLength(20)
            .Must(NetMetricCultures.IsSupportedCulture)
            .WithMessage("Language must be a valid BCP-47 culture tag (example: en, en-US, tr, zh-CN).");
        RuleFor(x => x.Request.TimeZone).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Request.TimeZone)
            .Must(TimeZoneNormalizer.IsValid)
            .WithMessage("Time zone must be a valid system time zone identifier.");
        RuleFor(x => x.Request.DateFormat).NotEmpty().MaximumLength(40);
        RuleFor(x => x.Request.DateFormat)
            .Must(value => AccountOptionsCatalog.GetDateFormats().Any(x => string.Equals(x.Value, value, StringComparison.Ordinal)))
            .WithMessage("Date format must be one of the supported formats.");
    }
}

public sealed class UpdateMyPreferencesCommandHandler(
    ICurrentUserAccessor currentUserAccessor,
    IClock clock,
    IRepository<IAccountDbContext, UserPreference> preferences,
    IRepository<IAccountDbContext, UserProfile> profiles,
    IMembershipReadService membershipReadService,
    IAccountDbContext dbContext,
    IConcurrencyTokenWriter concurrencyTokenWriter,
    IAccountAuditWriter auditWriter)
    : IRequestHandler<UpdateMyPreferencesCommand, Result<UserPreferenceResponse>>
{
    public async Task<Result<UserPreferenceResponse>> Handle(UpdateMyPreferencesCommand command, CancellationToken cancellationToken)
    {
        var currentUser = currentUserAccessor.GetRequired();
        var tenantId = TenantId.From(currentUser.TenantId);
        var userId = UserId.From(currentUser.UserId);

        var preference = await preferences.Query
            .FirstOrDefaultAsync(x => x.TenantId == tenantId && x.UserId == userId, cancellationToken);

        if (preference is null)
        {
            preference = UserPreference.CreateDefault(tenantId, userId, clock.UtcNow);
            await preferences.AddAsync(preference, cancellationToken);
        }
        else
        {
            var version = VersionEncoding.TryDecode(command.Request.Version);
            if (version is not null)
            {
                concurrencyTokenWriter.SetOriginalVersion(preference, version);
            }
        }

        var theme = Enum.Parse<ThemePreference>(command.Request.Theme, true);
        var culture = NetMetricCultures.NormalizeOrDefault(command.Request.Language);
        var effectiveTimeZone = TimeZoneNormalizer.NormalizeOrDefault(command.Request.TimeZone);
        var requestedDefaultOrganizationId = command.Request.DefaultOrganizationId;
        if (requestedDefaultOrganizationId.HasValue)
        {
            var organizations = await membershipReadService.GetMyOrganizationsAsync(currentUser.TenantId, currentUser.UserId, cancellationToken);
            var isAuthorized = organizations.Any(x => x.OrganizationId == requestedDefaultOrganizationId.Value);
            if (!isAuthorized)
            {
                return Result<UserPreferenceResponse>.Failure(Error.Forbidden());
            }
        }
        preference.Update(
            theme,
            culture,
            effectiveTimeZone,
            command.Request.DateFormat,
            requestedDefaultOrganizationId,
            clock.UtcNow);

        var profile = await profiles.FirstOrDefaultAsync(x => x.TenantId == tenantId && x.UserId == userId, cancellationToken);
        if (profile is null)
        {
            profile = UserProfile.Create(tenantId, userId, "New", "Member", clock.UtcNow, culture);
            await profiles.AddAsync(profile, cancellationToken);
        }

        if (profile is not null)
        {
            profile.Update(
                profile.FirstName,
                profile.LastName,
                profile.PhoneNumber,
                profile.JobTitle,
                profile.Department,
                effectiveTimeZone,
                culture,
                clock.UtcNow);
        }

        await dbContext.SaveChangesAsync(cancellationToken);

        await auditWriter.WriteAsync(
            new AccountAuditWriteRequest(
                currentUser.TenantId,
                currentUser.UserId,
                AccountAuditEventTypes.PreferencesUpdated,
                "Information",
                currentUser.CorrelationId,
                currentUser.IpAddress,
                currentUser.UserAgent,
                null),
            cancellationToken);

        return Result<UserPreferenceResponse>.Success(PreferenceMapper.ToResponse(preference));
    }
}
