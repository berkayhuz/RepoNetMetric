using NetMetric.CRM.DocumentManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.DocumentManagement.Domain.Entities.DocumentRecords;
using MediatR;

namespace NetMetric.CRM.DocumentManagement.Application.Features.Approvals.Commands.SubmitDocumentReview;

public sealed class SubmitDocumentReviewCommandHandler : IRequestHandler<SubmitDocumentReviewCommand, Guid>
{
    private readonly IDocumentManagementDbContext _dbContext;

    public SubmitDocumentReviewCommandHandler(IDocumentManagementDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Guid> Handle(SubmitDocumentReviewCommand request, CancellationToken cancellationToken)
    {
        var entity = DocumentRecord.Create(request.ReviewType, "document-review", request.DocumentId);
        await _dbContext.DocumentRecords.AddAsync(entity, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return entity.Id;
    }
}
