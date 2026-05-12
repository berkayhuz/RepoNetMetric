using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using NetMetric.Account.Application.Abstractions.Security;
using NetMetric.Account.Application.Common;

namespace NetMetric.Account.Application.DependencyInjection;

public static class AccountApplicationServiceCollectionExtensions
{
    public static IServiceCollection AddAccountApplication(this IServiceCollection services)
    {
        services.AddMediatR(configuration => configuration.RegisterServicesFromAssembly(typeof(IAccountApplicationMarker).Assembly));
        services.AddValidatorsFromAssembly(typeof(IAccountApplicationMarker).Assembly);
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        services.AddScoped<IReauthenticationService, ReauthenticationService>();

        return services;
    }
}
