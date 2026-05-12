using MediatR;
using Microsoft.EntityFrameworkCore;
using NetMetric.Clock;
using NetMetric.CRM.KnowledgeBaseManagement.Application.Abstractions.Persistence;
using NetMetric.Exceptions;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Commands.Articles.PublishKnowledgeBaseArticle;

public sealed class PublishKnowledgeBaseArticleCommandHandler(IKnowledgeBaseManagementDbContext dbContext, IClock clock) : IRequestHandler<PublishKnowledgeBaseArticleCommand>
{
    public async Task Handle(PublishKnowledgeBaseArticleCommand request, CancellationToken cancellationToken)
    {
        var entity = await dbContext.Articles.FirstOrDefaultAsync(x => x.Id == request.ArticleId, cancellationToken)
            ?? throw new NotFoundAppException("Knowledge base article not found.");
        entity.Publish(clock.UtcDateTime);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
