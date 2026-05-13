# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS build
WORKDIR /workspace

RUN corepack enable

COPY . .

ARG NEXT_PUBLIC_APP_NAME=NetMetric\ Account
ARG NEXT_PUBLIC_APP_ORIGIN=https://account.netmetric.net
ARG NEXT_PUBLIC_ACCOUNT_URL=https://account.netmetric.net
ARG NEXT_PUBLIC_AUTH_URL=https://auth.netmetric.net
ARG NEXT_PUBLIC_API_BASE_URL=https://api.netmetric.net

ENV NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}
ENV NEXT_PUBLIC_APP_ORIGIN=${NEXT_PUBLIC_APP_ORIGIN}
ENV NEXT_PUBLIC_ACCOUNT_URL=${NEXT_PUBLIC_ACCOUNT_URL}
ENV NEXT_PUBLIC_AUTH_URL=${NEXT_PUBLIC_AUTH_URL}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

RUN pnpm install --frozen-lockfile
RUN pnpm --filter account-web build

FROM node:22-alpine AS runtime
WORKDIR /workspace

RUN corepack enable \
    && addgroup -S netmetric \
    && adduser -S netmetric -G netmetric

COPY --from=build /workspace /workspace

ENV NODE_ENV=production
EXPOSE 7004

USER netmetric

CMD ["pnpm", "--filter", "account-web", "start"]
