using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Notes.Commands.DeleteNote;

public sealed class DeleteNoteCommand : IRequest<Unit>
{
    public Guid NoteId { get; init; }
}
