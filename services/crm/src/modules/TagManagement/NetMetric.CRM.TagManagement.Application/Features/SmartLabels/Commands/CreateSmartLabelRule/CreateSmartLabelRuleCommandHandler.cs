using MediatR;
using NetMetric.CRM.TagManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.TagManagement.Domain.Entities.TagDefinitions;

namespace NetMetric.CRM.TagManagement.Application.Features.SmartLabels.Commands.CreateSmartLabelRule;

public sealed class CreateSmartLabelRuleCommandHandler : IRequestHandler<CreateSmartLabelRuleCommand, Guid>
{
    private readonly ITagManagementDbContext _dbContext;

    public CreateSmartLabelRuleCommandHandler(ITagManagementDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Guid> Handle(CreateSmartLabelRuleCommand request, CancellationToken cancellationToken)
    {
        var entity = TagDefinition.Create("CreateSmartLabelRule");
        await _dbContext.TagDefinitions.AddAsync(entity, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return entity.Id;
    }
}
