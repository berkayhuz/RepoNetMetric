using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.Notes;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Notes.Commands.UpdateNote;

public sealed record UpdateNoteCommand : IRequest<NoteDto>
{
    public Guid NoteId { get; init; }
    public required string Title { get; init; }
    public required string Content { get; init; }
    public bool IsPinned { get; init; }
}
