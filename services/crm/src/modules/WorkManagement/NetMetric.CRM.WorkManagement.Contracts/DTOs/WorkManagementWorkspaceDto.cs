namespace NetMetric.CRM.WorkManagement.Contracts.DTOs;

public sealed record WorkManagementWorkspaceDto(IReadOnlyList<WorkTaskDto> Tasks, IReadOnlyList<MeetingScheduleDto> Meetings, int OpenTaskCount, int UpcomingMeetingCount);
