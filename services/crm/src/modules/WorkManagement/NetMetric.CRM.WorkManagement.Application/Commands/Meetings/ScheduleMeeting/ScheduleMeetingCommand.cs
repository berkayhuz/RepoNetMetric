using MediatR;
using NetMetric.CRM.WorkManagement.Contracts.DTOs;

namespace NetMetric.CRM.WorkManagement.Application.Commands.Meetings.ScheduleMeeting;

public sealed record ScheduleMeetingCommand(string Title, DateTime StartsAtUtc, DateTime EndsAtUtc, string OrganizerEmail, string AttendeeSummary, bool RequiresExternalSync) : IRequest<MeetingScheduleDto>;
