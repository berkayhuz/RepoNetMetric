namespace NetMetric.Auth.Domain.Abstractions;

public interface IHasRowVersion
{
    byte[] RowVersion { get; set; }
}