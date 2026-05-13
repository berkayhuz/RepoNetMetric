using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Notes.Commands.SetNotePinned;

public sealed class SetNotePinnedCommand : IRequest<Unit>
{
    public Guid NoteId { get; init; }
    public bool IsPinned { get; init; }
}
