using NetMetric.CRM.CalendarSync.Contracts.DTOs;
using NetMetric.CRM.CalendarSync.Domain.Enums;
using MediatR;

namespace NetMetric.CRM.CalendarSync.Application.Commands.Connections.UpsertCalendarConnection;

public sealed record UpsertCalendarConnectionCommand(Guid? Id, string Name, CalendarProviderType Provider, string CalendarIdentifier, string SecretReference, CalendarSyncDirection SyncDirection, bool IsActive) : IRequest<CalendarConnectionDto>;
