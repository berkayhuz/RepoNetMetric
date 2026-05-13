namespace NetMetric.CRM.QuoteManagement.Contracts.DTOs;

public sealed record QuoteWorkspaceDto(QuoteDetailDto Quote, bool CanEdit, bool CanSubmit, bool CanApprove, bool CanReject, bool CanSend, bool CanAccept, bool CanDecline, bool CanExpire);
