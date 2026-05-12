# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY Directory.Build.props Directory.Build.targets Directory.Packages.props global.json ./
COPY src/BuildingBlocks/NetMetric.Shared/NetMetric.Shared.csproj src/BuildingBlocks/NetMetric.Shared/
COPY src/Services/Account/NetMetric.Account.Domain/NetMetric.Account.Domain.csproj src/Services/Account/NetMetric.Account.Domain/
COPY src/Services/Account/NetMetric.Account.Contracts/NetMetric.Account.Contracts.csproj src/Services/Account/NetMetric.Account.Contracts/
COPY src/Services/Account/NetMetric.Account.Application/NetMetric.Account.Application.csproj src/Services/Account/NetMetric.Account.Application/
COPY src/Services/Account/NetMetric.Account.Persistence/NetMetric.Account.Persistence.csproj src/Services/Account/NetMetric.Account.Persistence/
COPY src/Services/Account/NetMetric.Account.Infrastructure/NetMetric.Account.Infrastructure.csproj src/Services/Account/NetMetric.Account.Infrastructure/
COPY src/Services/Account/NetMetric.Account.Api/NetMetric.Account.Api.csproj src/Services/Account/NetMetric.Account.Api/

RUN dotnet restore src/Services/Account/NetMetric.Account.Api/NetMetric.Account.Api.csproj

COPY src/BuildingBlocks/NetMetric.Shared src/BuildingBlocks/NetMetric.Shared
COPY src/Services/Account src/Services/Account
RUN dotnet publish src/Services/Account/NetMetric.Account.Api/NetMetric.Account.Api.csproj \
    -c Release \
    -o /app/publish \
    --no-restore \
    -p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /app/publish .
USER $APP_UID

HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD dotnet NetMetric.Account.Api.dll --healthcheck || exit 1

ENTRYPOINT ["dotnet", "NetMetric.Account.Api.dll"]
