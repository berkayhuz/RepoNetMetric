using NetMetric.Auth.Domain.Abstractions;

namespace NetMetric.Auth.Domain.Common;

public abstract class EntityBase : ITenantEntity, ISoftDeletable, IAuditable, IHasRowVersion
{
    public Guid Id { get; protected set; } = Guid.NewGuid();
    public Guid TenantId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
    public string? DeletedBy { get; set; }
    public byte[] RowVersion { get; set; } = [];
    public bool IsActive { get; protected set; } = true;
    public void SetActive(bool isActive) => IsActive = isActive;
    public void Deactivate() => SetActive(false);
    public void Activate() => SetActive(true);
}
