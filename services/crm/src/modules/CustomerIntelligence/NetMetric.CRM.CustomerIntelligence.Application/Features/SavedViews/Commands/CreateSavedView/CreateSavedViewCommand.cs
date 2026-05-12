using MediatR;
using NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.SavedViews.Commands.CreateSavedView;

public sealed record CreateSavedViewCommand(string Name, string Scope, string FilterJson) : IRequest<Guid>;
