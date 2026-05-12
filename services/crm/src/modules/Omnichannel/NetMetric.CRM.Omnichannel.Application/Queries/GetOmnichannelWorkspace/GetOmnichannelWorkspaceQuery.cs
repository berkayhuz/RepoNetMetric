using NetMetric.CRM.Omnichannel.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.Omnichannel.Application.Queries.GetOmnichannelWorkspace;

public sealed record GetOmnichannelWorkspaceQuery : IRequest<OmnichannelWorkspaceDto>;
