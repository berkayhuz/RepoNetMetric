using MediatR;
using Microsoft.AspNetCore.Mvc;
using NetMetric.Tools.Application.Catalog.Queries;
using NetMetric.Tools.Contracts.Catalog;

namespace NetMetric.Tools.API.Controllers;

[ApiController]
[Route("api/v1/tools/catalog")]
public sealed class ToolsCatalogController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType<ToolCatalogResponse>(StatusCodes.Status200OK)]
    public async Task<ActionResult<ToolCatalogResponse>> GetCatalog([FromQuery] string? category, [FromQuery] string? q, CancellationToken cancellationToken)
        => Ok(await mediator.Send(new GetToolsCatalogQuery(category, q), cancellationToken));

    [HttpGet("{slug}")]
    [ProducesResponseType<ToolDetailResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ToolDetailResponse>> GetDetail([FromRoute] string slug, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new GetToolDetailQuery(slug), cancellationToken);
        return response is null ? NotFound() : Ok(response);
    }
}
