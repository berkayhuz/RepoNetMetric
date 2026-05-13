using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.Notes;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Notes.Commands.CreateNote;

public sealed class CreateNoteCommand : IRequest<NoteDto>
{
    public required string EntityName { get; init; }
    public required Guid EntityId { get; init; }
    public required string Title { get; init; }
    public required string Content { get; init; }
    public bool IsPinned { get; init; }
}
