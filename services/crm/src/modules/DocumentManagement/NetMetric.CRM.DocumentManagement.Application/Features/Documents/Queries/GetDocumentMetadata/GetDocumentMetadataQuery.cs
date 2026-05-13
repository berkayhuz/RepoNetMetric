using MediatR;
using NetMetric.CRM.DocumentManagement.Contracts.DTOs;

namespace NetMetric.CRM.DocumentManagement.Application.Features.Documents.Queries.GetDocumentMetadata;

public sealed record GetDocumentMetadataQuery(Guid DocumentId) : IRequest<DocumentMetadataDto>;
