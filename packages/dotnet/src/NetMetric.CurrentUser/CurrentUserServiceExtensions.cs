namespace NetMetric.CurrentUser;

public static class CurrentUserServiceExtensions
{
    public static Guid EnsureAuthenticated(this ICurrentUserService currentUserService)
        => currentUserService.UserId == Guid.Empty
            ? throw new UnauthorizedAccessException("An authenticated user is required.")
            : currentUserService.UserId;

    public static bool IsAuthenticated(this ICurrentUserService currentUserService)
        => currentUserService.UserId != Guid.Empty;

    public static Guid EnsureTenant(this ICurrentUserService currentUserService)
        => currentUserService.TenantId == Guid.Empty
            ? throw new UnauthorizedAccessException("An authenticated tenant context is required.")
            : currentUserService.TenantId;
}
