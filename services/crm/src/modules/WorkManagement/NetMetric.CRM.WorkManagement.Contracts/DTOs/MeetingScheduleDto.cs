namespace NetMetric.CRM.WorkManagement.Contracts.DTOs;

public sealed record MeetingScheduleDto(Guid Id, string Title, DateTime StartsAtUtc, DateTime EndsAtUtc, string OrganizerEmail, bool RequiresExternalSync);
