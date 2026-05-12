using NetMetric.CRM.Types;

namespace NetMetric.CRM.QuoteManagement.Contracts.DTOs;

public sealed record QuoteStatusHistoryDto(Guid Id, QuoteStatusType? OldStatus, QuoteStatusType NewStatus, DateTime ChangedAt, Guid? ChangedByUserId, string? Note);
