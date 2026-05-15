// <copyright file="CreateQuoteCommandHandler.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using MediatR;
using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.OpportunityManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.OpportunityManagement.Application.Common;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;
using NetMetric.CRM.Sales;
using NetMetric.CurrentUser;
using NetMetric.Exceptions;

namespace NetMetric.CRM.OpportunityManagement.Application.Features.Quotes.Commands.CreateQuote;

public sealed class CreateQuoteCommandHandler(IOpportunityManagementDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<CreateQuoteCommand, QuoteDetailDto>
{
    public async Task<QuoteDetailDto> Handle(CreateQuoteCommand request, CancellationToken cancellationToken)
    {
        var opportunity = await dbContext.Opportunities.FirstOrDefaultAsync(x => x.TenantId == currentUserService.TenantId && x.Id == request.OpportunityId, cancellationToken)
            ?? throw new NotFoundAppException("Opportunity not found.");

        var quote = new Quote
        {
            TenantId = currentUserService.TenantId,
            OpportunityId = request.OpportunityId,
            CustomerId = opportunity.CustomerId,
            QuoteNumber = request.QuoteNumber.Trim(),
            QuoteDate = request.QuoteDate,
            ValidUntil = request.ValidUntil,
            TermsAndConditions = string.IsNullOrWhiteSpace(request.TermsAndConditions) ? null : request.TermsAndConditions.Trim(),
            OwnerUserId = request.OwnerUserId,
            CurrencyCode = request.CurrencyCode,
            ExchangeRate = request.ExchangeRate,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            CreatedBy = currentUserService.UserName,
            UpdatedBy = currentUserService.UserName
        };

        foreach (var item in request.Items)
        {
            var lineBase = item.Quantity * item.UnitPrice;
            var discountTotal = lineBase * (item.DiscountRate / 100m);
            var taxBase = lineBase - discountTotal;
            var taxTotal = taxBase * (item.TaxRate / 100m);

            quote.Items.Add(new QuoteItem
            {
                TenantId = currentUserService.TenantId,
                ProductId = item.ProductId,
                Description = item.Description,
                Quantity = item.Quantity,
                UnitPrice = item.UnitPrice,
                DiscountRate = item.DiscountRate,
                TaxRate = item.TaxRate,
                LineTotal = taxBase + taxTotal,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CreatedBy = currentUserService.UserName,
                UpdatedBy = currentUserService.UserName
            });
        }

        quote.SubTotal = quote.Items.Sum(x => x.Quantity * x.UnitPrice);
        quote.DiscountTotal = quote.Items.Sum(x => (x.Quantity * x.UnitPrice) * (x.DiscountRate / 100m));
        quote.TaxTotal = quote.Items.Sum(x => ((x.Quantity * x.UnitPrice) - ((x.Quantity * x.UnitPrice) * (x.DiscountRate / 100m))) * (x.TaxRate / 100m));
        quote.GrandTotal = quote.Items.Sum(x => x.LineTotal);

        await dbContext.Quotes.AddAsync(quote, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return quote.ToDto();
    }
}
