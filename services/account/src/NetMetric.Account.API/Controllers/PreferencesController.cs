using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetMetric.Account.Api.Http;
using NetMetric.Account.Application.Abstractions.Security;
using NetMetric.Account.Application.Preferences.Commands;
using NetMetric.Account.Application.Preferences.Queries;
using NetMetric.Account.Contracts.Preferences;

namespace NetMetric.Account.Api.Controllers;

[ApiController]
[Route("api/v1/account/preferences")]
public sealed class PreferencesController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    [Authorize(Policy = AccountPolicies.PreferencesReadOwn)]
    [ProducesResponseType<UserPreferenceResponse>(StatusCodes.Status200OK)]
    public async Task<ActionResult<UserPreferenceResponse>> Get(CancellationToken cancellationToken)
        => (await mediator.Send(new GetMyPreferencesQuery(), cancellationToken)).ToActionResult();

    [HttpPut]
    [Authorize(Policy = AccountPolicies.PreferencesUpdateOwn)]
    [ProducesResponseType<UserPreferenceResponse>(StatusCodes.Status200OK)]
    public async Task<ActionResult<UserPreferenceResponse>> Update(
        [FromBody] UpdateUserPreferenceRequest request,
        CancellationToken cancellationToken)
        => (await mediator.Send(new UpdateMyPreferencesCommand(request), cancellationToken)).ToActionResult();
}
