using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using NetMetric.Auth.Application.Behaviors;

namespace NetMetric.Auth.Application.DependencyInjection;

public static class ApplicationDependencyInjection
{
    public static IServiceCollection AddAuthApplication(this IServiceCollection services)
    {
        services.AddMediatR(configuration => configuration.RegisterServicesFromAssembly(typeof(ApplicationDependencyInjection).Assembly));
        services.AddValidatorsFromAssembly(typeof(ApplicationDependencyInjection).Assembly);
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        return services;
    }
}
