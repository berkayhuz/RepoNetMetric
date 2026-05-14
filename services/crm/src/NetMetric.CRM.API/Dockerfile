FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore src/Services/CRM/NetMetric.CRM.API/NetMetric.CRM.API.csproj --locked-mode
RUN dotnet publish src/Services/CRM/NetMetric.CRM.API/NetMetric.CRM.API.csproj \
    -c Release \
    -o /app/publish \
    --no-restore \
    -p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8080
ENV DOTNET_EnableDiagnostics=0
EXPOSE 8080
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /var/lib/netmetric-crm/dataprotection-keys \
    && chown -R $APP_UID:$APP_UID /var/lib/netmetric-crm
COPY --from=build /app/publish .
USER $APP_UID
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD curl --fail http://127.0.0.1:8080/health/live || exit 1
ENTRYPOINT ["dotnet", "NetMetric.CRM.API.dll"]
