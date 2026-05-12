using FluentValidation;
using NetMetric.CRM.CustomerManagement.Application.Queries.Customers;

namespace NetMetric.CRM.CustomerManagement.Application.Validators;

public sealed class GetCustomersQueryValidator : AbstractValidator<GetCustomersQuery>
{
    private static readonly string[] AllowedSortFields = ["name", "email", "createdAt", "isVip", "company"];
    private static readonly string[] AllowedSortDirections = ["asc", "desc"];

    public GetCustomersQueryValidator()
    {
        RuleFor(x => x.Page).GreaterThan(0);
        RuleFor(x => x.PageSize).InclusiveBetween(1, 200);
        RuleFor(x => x.Search).MaximumLength(200);
        RuleFor(x => x.SortBy)
            .Must(x => string.IsNullOrWhiteSpace(x) || AllowedSortFields.Contains(x, StringComparer.OrdinalIgnoreCase))
            .WithMessage("Unsupported customer sort field.");
        RuleFor(x => x.SortDirection)
            .Must(x => string.IsNullOrWhiteSpace(x) || AllowedSortDirections.Contains(x, StringComparer.OrdinalIgnoreCase))
            .WithMessage("Sort direction must be asc or desc.");
    }
}
