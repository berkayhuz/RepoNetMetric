using FluentValidation;
using NetMetric.CRM.KnowledgeBaseManagement.Application.Commands.Articles.UpdateKnowledgeBaseArticle;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Validators;

public sealed class UpdateKnowledgeBaseArticleCommandValidator : AbstractValidator<UpdateKnowledgeBaseArticleCommand>
{
    public UpdateKnowledgeBaseArticleCommandValidator()
    {
        RuleFor(x => x.ArticleId).NotEmpty();
        RuleFor(x => x.CategoryId).NotEmpty();
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Summary).MaximumLength(1000);
        RuleFor(x => x.Content).NotEmpty();
    }
}
