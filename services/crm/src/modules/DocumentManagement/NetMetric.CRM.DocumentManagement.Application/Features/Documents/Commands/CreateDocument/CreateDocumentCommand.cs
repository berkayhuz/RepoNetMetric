using MediatR;
using NetMetric.CRM.DocumentManagement.Contracts.DTOs;

namespace NetMetric.CRM.DocumentManagement.Application.Features.Documents.Commands.CreateDocument;

public sealed record CreateDocumentCommand(string Name, string ContentType, long SizeBytes) : IRequest<Guid>;
