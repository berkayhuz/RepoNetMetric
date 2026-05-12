using MediatR;
using NetMetric.CRM.DocumentManagement.Contracts.DTOs;

namespace NetMetric.CRM.DocumentManagement.Application.Features.Approvals.Commands.SubmitDocumentReview;

public sealed record SubmitDocumentReviewCommand(Guid DocumentId, string ReviewType) : IRequest<Guid>;
