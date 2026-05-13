namespace NetMetric.CRM.CustomerManagement.Application.Common;

public static class EntityNames
{
    public const string Company = "company";
    public const string Contact = "contact";
    public const string Customer = "customer";

    public static bool IsSupported(string entityName)
        => string.Equals(entityName, Company, StringComparison.OrdinalIgnoreCase)
           || string.Equals(entityName, Contact, StringComparison.OrdinalIgnoreCase)
           || string.Equals(entityName, Customer, StringComparison.OrdinalIgnoreCase);
}
