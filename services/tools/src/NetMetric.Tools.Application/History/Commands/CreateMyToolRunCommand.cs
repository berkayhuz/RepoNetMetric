using MediatR;
using Microsoft.EntityFrameworkCore;
using NetMetric.Tools.Application.Abstractions.Persistence;
using NetMetric.Tools.Application.Abstractions.Security;
using NetMetric.Tools.Application.Abstractions.Storage;
using NetMetric.Tools.Application.Common;
using NetMetric.Tools.Contracts.History;
using NetMetric.Tools.Domain.Entities;
using NetMetric.Tools.Domain.ValueObjects;

namespace NetMetric.Tools.Application.History.Commands;

public sealed record CreateMyToolRunCommand(
    CreateToolRunRequest Request,
    Stream ArtifactStream,
    long ArtifactLength) : IRequest<CreateToolRunResponse>;

public sealed class CreateMyToolRunCommandHandler(
    IToolsDbContext dbContext,
    ICurrentUserAccessor currentUserAccessor,
    IToolArtifactStorage artifactStorage) : IRequestHandler<CreateMyToolRunCommand, CreateToolRunResponse>
{
    public async Task<CreateToolRunResponse> Handle(CreateMyToolRunCommand request, CancellationToken cancellationToken)
    {
        var user = currentUserAccessor.GetRequired();
        var slug = new ToolSlug(request.Request.ToolSlug);

        var tool = await dbContext.ToolDefinitions.FirstOrDefaultAsync(x => x.Slug == slug.Value, cancellationToken)
            ?? throw new InvalidOperationException("Tool definition not found.");

        ArtifactRules.EnsureSaveAllowed(tool, request.Request.ArtifactMimeType, request.ArtifactLength);

        var safeName = SafeFileName.Normalize(request.Request.ArtifactFileName);
        var storageKey = new StorageKey($"tools/{user.UserId:D}/{DateTimeOffset.UtcNow:yyyy/MM/dd}/{Guid.NewGuid():N}-{safeName}");

        var checksum = await ArtifactRules.ComputeSha256Async(request.ArtifactStream, cancellationToken);

        var run = new ToolRun(OwnerUserId.From(user.UserId), slug, request.Request.InputSummaryJson);
        var artifact = new ToolArtifact(
            run.Id,
            OwnerUserId.From(user.UserId),
            new MimeType(request.Request.ArtifactMimeType),
            new FileSizeBytes(request.ArtifactLength),
            storageKey,
            safeName,
            checksum);

        await artifactStorage.PutAsync(new ToolArtifactWriteRequest(storageKey.Value, artifact.MimeType, request.ArtifactStream, cancellationToken));

        await dbContext.ToolRuns.AddAsync(run, cancellationToken);
        await dbContext.ToolArtifacts.AddAsync(artifact, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new CreateToolRunResponse(run.Id, artifact.Id, run.CreatedAtUtc);
    }
}
