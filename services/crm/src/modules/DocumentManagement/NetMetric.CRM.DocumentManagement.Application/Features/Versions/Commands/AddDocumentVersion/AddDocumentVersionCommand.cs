using MediatR;
using NetMetric.CRM.DocumentManagement.Contracts.DTOs;

namespace NetMetric.CRM.DocumentManagement.Application.Features.Versions.Commands.AddDocumentVersion;

public sealed record AddDocumentVersionCommand(Guid DocumentId, string FileName, string StorageKey) : IRequest<Guid>;
