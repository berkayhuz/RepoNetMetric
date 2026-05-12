using NetMetric.CRM.CustomerManagement.Application.Features.Search.Queries.SearchCustomerManagement;
using FluentValidation;

namespace NetMetric.CRM.CustomerManagement.Application.Validators;

public sealed class SearchCustomerManagementQueryValidator : AbstractValidator<SearchCustomerManagementQuery>
{
    public SearchCustomerManagementQueryValidator()
    {
        RuleFor(x => x.PageNumber).GreaterThan(0);
        RuleFor(x => x.PageSize).InclusiveBetween(1, 100);
        RuleFor(x => x.Term).MaximumLength(200);
    }
}
