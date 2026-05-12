using FluentValidation;
using MediatR;
using NetMetric.Account.Application.Abstractions.Audit;
using NetMetric.Account.Application.Abstractions.Persistence;
using NetMetric.Account.Application.Abstractions.Security;
using NetMetric.Account.Application.Common;
using NetMetric.Account.Application.Profiles.Queries;
using NetMetric.Account.Contracts.Profiles;
using NetMetric.Account.Domain.Common;
using NetMetric.Account.Domain.Profiles;
using NetMetric.Clock;
using NetMetric.Localization;

namespace NetMetric.Account.Application.Profiles.Commands;

public sealed record UpdateMyProfileCommand(UpdateMyProfileRequest Request) : IRequest<Result<MyProfileResponse>>;

public sealed class UpdateMyProfileCommandValidator : AbstractValidator<UpdateMyProfileCommand>
{
    public UpdateMyProfileCommandValidator()
    {
        RuleFor(x => x.Request.FirstName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Request.LastName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Request.PhoneNumber).MaximumLength(32);
        RuleFor(x => x.Request.AvatarUrl).MaximumLength(2048);
        RuleFor(x => x.Request.JobTitle).MaximumLength(120);
        RuleFor(x => x.Request.Department).MaximumLength(120);
        RuleFor(x => x.Request.TimeZone).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Request.TimeZone)
            .Must(TimeZoneNormalizer.IsValid)
            .WithMessage("Time zone must be a valid system time zone identifier.");
        RuleFor(x => x.Request.Culture)
            .NotEmpty()
            .MaximumLength(20)
            .Must(NetMetricCultures.IsSupportedCulture)
            .WithMessage($"Culture must be one of: {string.Join(", ", NetMetricCultures.SupportedCultureNames)}.");
    }
}

public sealed class UpdateMyProfileCommandHandler(
    ICurrentUserAccessor currentUserAccessor,
    IClock clock,
    IRepository<IAccountDbContext, UserProfile> profiles,
    IAccountDbContext dbContext,
    IConcurrencyTokenWriter concurrencyTokenWriter,
    IAccountAuditWriter auditWriter)
    : IRequestHandler<UpdateMyProfileCommand, Result<MyProfileResponse>>
{
    public async Task<Result<MyProfileResponse>> Handle(UpdateMyProfileCommand command, CancellationToken cancellationToken)
    {
        var currentUser = currentUserAccessor.GetRequired();
        var tenantId = TenantId.From(currentUser.TenantId);
        var userId = UserId.From(currentUser.UserId);

        var profile = await profiles.FirstOrDefaultAsync(x => x.TenantId == tenantId && x.UserId == userId, cancellationToken);

        if (profile is null)
        {
            profile = UserProfile.Create(tenantId, userId, command.Request.FirstName, command.Request.LastName, clock.UtcNow, command.Request.Culture);
            await profiles.AddAsync(profile, cancellationToken);
        }

        var version = VersionEncoding.TryDecode(command.Request.Version);
        if (version is not null)
        {
            concurrencyTokenWriter.SetOriginalVersion(profile, version);
        }

        var effectiveTimeZone = TimeZoneNormalizer.NormalizeOrDefault(command.Request.TimeZone);
        profile.Update(
            command.Request.FirstName,
            command.Request.LastName,
            command.Request.PhoneNumber,
            command.Request.AvatarUrl,
            command.Request.JobTitle,
            command.Request.Department,
            effectiveTimeZone,
            command.Request.Culture,
            clock.UtcNow);

        await dbContext.SaveChangesAsync(cancellationToken);

        await auditWriter.WriteAsync(
            new AccountAuditWriteRequest(
                currentUser.TenantId,
                currentUser.UserId,
                AccountAuditEventTypes.ProfileUpdated,
                "Information",
                currentUser.CorrelationId,
                currentUser.IpAddress,
                currentUser.UserAgent,
                null),
            cancellationToken);

        return Result<MyProfileResponse>.Success(ProfileMapper.ToResponse(profile));
    }
}
