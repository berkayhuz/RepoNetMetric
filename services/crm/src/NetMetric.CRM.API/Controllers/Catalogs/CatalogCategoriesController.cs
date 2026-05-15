// <copyright file="CatalogCategoriesController.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetMetric.CRM.API.Compatibility;
using NetMetric.CRM.ProductCatalog.Application.Features.CatalogItems;

namespace NetMetric.CRM.API.Controllers.Catalogs;

[ApiController]
[Route("api/catalog/categories")]
[Authorize(Policy = AuthorizationPolicies.CatalogProductsManage)]
public sealed class CatalogCategoriesController(IMediator mediator) : ControllerBase
{
    [HttpPost("{categoryId:guid}/image")]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<object>> UploadImage(Guid categoryId, IFormFile? file, CancellationToken cancellationToken = default)
    {
        if (file is null || file.Length == 0) return BadRequest("Image file is required.");
        await using var stream = file.OpenReadStream();
        var url = await mediator.Send(new UploadCategoryImageCommand(categoryId, file.FileName, file.ContentType ?? "application/octet-stream", stream, file.Length), cancellationToken);
        return Ok(new { publicUrl = url });
    }

    [HttpDelete("{categoryId:guid}/image")]
    public async Task<IActionResult> RemoveImage(Guid categoryId, CancellationToken cancellationToken = default)
    {
        await mediator.Send(new RemoveCategoryImageCommand(categoryId), cancellationToken);
        return NoContent();
    }
}
