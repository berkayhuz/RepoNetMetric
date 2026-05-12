using Microsoft.EntityFrameworkCore;

namespace NetMetric.Persistence.EntityFrameworkCore;

public static class ModelBuilderExtensions
{
    public static ModelBuilder ApplyDefaultDecimalPrecision(this ModelBuilder modelBuilder, int precision = 18, int scale = 2)
    {
        foreach (var property in modelBuilder.Model.GetEntityTypes().SelectMany(x => x.GetProperties()))
        {
            var clrType = Nullable.GetUnderlyingType(property.ClrType) ?? property.ClrType;

            if (clrType != typeof(decimal))
            {
                continue;
            }

            property.SetPrecision(precision);
            property.SetScale(scale);
        }

        return modelBuilder;
    }
}
