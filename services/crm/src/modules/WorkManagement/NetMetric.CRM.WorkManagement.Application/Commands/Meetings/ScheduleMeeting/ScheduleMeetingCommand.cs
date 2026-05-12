using NetMetric.CRM.WorkManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.WorkManagement.Application.Commands.Meetings.ScheduleMeeting;

public sealed record ScheduleMeetingCommand(string Title, DateTime StartsAtUtc, DateTime EndsAtUtc, string OrganizerEmail, string AttendeeSummary, bool RequiresExternalSync) : IRequest<MeetingScheduleDto>;
