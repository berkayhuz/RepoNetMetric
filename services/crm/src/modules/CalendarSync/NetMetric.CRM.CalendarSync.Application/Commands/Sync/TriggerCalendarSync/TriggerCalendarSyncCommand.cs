using MediatR;
using NetMetric.CRM.CalendarSync.Contracts.DTOs;

namespace NetMetric.CRM.CalendarSync.Application.Commands.Sync.TriggerCalendarSync;

public sealed record TriggerCalendarSyncCommand(Guid ConnectionId) : IRequest<CalendarSyncRunDto>;
