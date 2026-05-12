namespace NetMetric.Entities.Abstractions;

public interface IHasRowVersion
{
    byte[] RowVersion { get; set; }
}
