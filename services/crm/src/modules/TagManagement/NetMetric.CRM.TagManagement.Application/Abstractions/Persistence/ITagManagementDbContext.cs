using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.TagManagement.Domain.Entities.ClassificationSchemes;
using NetMetric.CRM.TagManagement.Domain.Entities.SmartLabelRules;
using NetMetric.CRM.TagManagement.Domain.Entities.TagAssignments;
using NetMetric.CRM.TagManagement.Domain.Entities.TagDefinitions;
using NetMetric.CRM.TagManagement.Domain.Entities.TagGroups;
using NetMetric.Repository;

namespace NetMetric.CRM.TagManagement.Application.Abstractions.Persistence;

public interface ITagManagementDbContext : IUnitOfWork
{
    DbSet<TagDefinition> TagDefinitions { get; }
    DbSet<TagGroup> TagGroups { get; }
    DbSet<TagAssignment> TagAssignments { get; }
    DbSet<SmartLabelRule> SmartLabelRules { get; }
    DbSet<ClassificationScheme> ClassificationSchemes { get; }
}
