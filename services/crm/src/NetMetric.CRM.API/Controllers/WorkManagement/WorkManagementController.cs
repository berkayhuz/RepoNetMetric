// <copyright file="WorkManagementController.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using System.Text.Json.Serialization;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetMetric.CRM.API.Compatibility;
using NetMetric.CRM.WorkManagement.Application.Commands.Meetings.ScheduleMeeting;
using NetMetric.CRM.WorkManagement.Application.Commands.Tasks.CreateWorkTask;
using NetMetric.CRM.WorkManagement.Application.Queries.GetWorkspace;

namespace NetMetric.CRM.API.Controllers.WorkManagement;

[ApiController]
[Route("api/work-management")]
[Authorize(Policy = AuthorizationPolicies.WorkManagementRead)]
public sealed class WorkManagementController(IMediator mediator) : ControllerBase
{
    [HttpGet("workspace")]
    public async Task<IActionResult> GetWorkspace(CancellationToken cancellationToken) =>
        Ok(await mediator.Send(new GetWorkManagementWorkspaceQuery(), cancellationToken));

    [HttpPost("tasks")]
    [Authorize(Policy = AuthorizationPolicies.WorkManagementManage)]
    public async Task<IActionResult> CreateTask([FromBody] CreateWorkTaskRequest request, CancellationToken cancellationToken) =>
        Ok(await mediator.Send(new CreateWorkTaskCommand(request.Title, request.Description, request.OwnerUserId, request.DueAtUtc, request.Priority), cancellationToken));

    [HttpPost("meetings")]
    [Authorize(Policy = AuthorizationPolicies.WorkManagementManage)]
    public async Task<IActionResult> ScheduleMeeting([FromBody] ScheduleMeetingRequest request, CancellationToken cancellationToken) =>
        Ok(await mediator.Send(new ScheduleMeetingCommand(request.Title, request.StartsAtUtc, request.EndsAtUtc, request.OrganizerEmail, request.AttendeeSummary, request.RequiresExternalSync), cancellationToken));

    public sealed record CreateWorkTaskRequest(string Title, string Description, Guid? OwnerUserId, [property: JsonRequired] DateTime DueAtUtc, [property: JsonRequired] int Priority);

    public sealed record ScheduleMeetingRequest(string Title, [property: JsonRequired] DateTime StartsAtUtc, [property: JsonRequired] DateTime EndsAtUtc, string OrganizerEmail, string AttendeeSummary, [property: JsonRequired] bool RequiresExternalSync);
}
