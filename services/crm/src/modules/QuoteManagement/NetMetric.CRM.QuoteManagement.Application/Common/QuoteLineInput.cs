using System;
using System.Collections.Generic;
using System.Text;

namespace NetMetric.CRM.QuoteManagement.Application.Common;

public sealed record QuoteLineInput(Guid ProductId, string? Description, int Quantity, decimal UnitPrice, decimal DiscountRate, decimal TaxRate);
