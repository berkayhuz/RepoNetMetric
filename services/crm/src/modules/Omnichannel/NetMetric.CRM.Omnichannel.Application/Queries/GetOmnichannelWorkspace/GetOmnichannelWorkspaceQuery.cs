using MediatR;
using NetMetric.CRM.Omnichannel.Contracts.DTOs;

namespace NetMetric.CRM.Omnichannel.Application.Queries.GetOmnichannelWorkspace;

public sealed record GetOmnichannelWorkspaceQuery : IRequest<OmnichannelWorkspaceDto>;
