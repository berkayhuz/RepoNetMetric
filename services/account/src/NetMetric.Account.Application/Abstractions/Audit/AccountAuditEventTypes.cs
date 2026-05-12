namespace NetMetric.Account.Application.Abstractions.Audit;

public static class AccountAuditEventTypes
{
    public const string ProfileUpdated = "profile.updated";
    public const string PreferencesUpdated = "preferences.updated";
    public const string NotificationPreferencesUpdated = "notification_preferences.updated";
    public const string SessionRevoked = "session.revoked";
    public const string OtherSessionsRevoked = "sessions.other_revoked";
    public const string PasswordChanged = "security.password_changed";
    public const string MfaSetupStarted = "security.mfa_setup_started";
    public const string MfaEnabled = "security.mfa_enabled";
    public const string MfaDisabled = "security.mfa_disabled";
    public const string RecoveryCodesRegenerated = "security.recovery_codes_regenerated";
    public const string TrustedDeviceRevoked = "security.trusted_device_revoked";
    public const string EmailChangeRequested = "security.email_change_requested";
    public const string EmailChanged = "security.email_changed";
    public const string ConsentAccepted = "consent.accepted";
    public const string InvitationCreated = "invitation.created";
    public const string InvitationResent = "invitation.resent";
    public const string InvitationRevoked = "invitation.revoked";
    public const string RoleChanged = "member.role_changed";
    public const string AuditRead = "audit.read";
}
