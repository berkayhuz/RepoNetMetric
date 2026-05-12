using MediatR;
using NetMetric.CRM.CustomerManagement.Application.Features.Customer360;
using NetMetric.CRM.CustomerManagement.Domain.Entities.CustomerOperations;

namespace NetMetric.CRM.CustomerManagement.Application.Features.CustomerOperations;

public sealed record GetAccountHierarchyQuery(Guid CustomerId) : IRequest<CustomerAccountHierarchyDto>;
public sealed record AddAccountHierarchyNodeCommand(Guid CompanyId, Guid? ParentCompanyId, CustomerRelationshipType RelationshipType, int DisplayOrder, bool IsPrimary) : IRequest<Guid>;
public sealed record MoveAccountHierarchyNodeCommand(Guid NodeId, Guid? NewParentCompanyId, string Reason) : IRequest<Guid>;
public sealed record RemoveAccountHierarchyNodeCommand(Guid NodeId) : IRequest;
public sealed record RemoveCustomerStakeholderCommand(Guid StakeholderId) : IRequest;
