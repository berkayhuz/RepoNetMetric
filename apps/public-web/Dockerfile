# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS build
WORKDIR /workspace

RUN corepack enable

COPY . .

ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_AUTH_URL
ARG NEXT_PUBLIC_ACCOUNT_URL
ARG NEXT_PUBLIC_CRM_URL
ARG NEXT_PUBLIC_TOOLS_URL
ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_AUTH_URL=${NEXT_PUBLIC_AUTH_URL}
ENV NEXT_PUBLIC_ACCOUNT_URL=${NEXT_PUBLIC_ACCOUNT_URL}
ENV NEXT_PUBLIC_CRM_URL=${NEXT_PUBLIC_CRM_URL}
ENV NEXT_PUBLIC_TOOLS_URL=${NEXT_PUBLIC_TOOLS_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN pnpm install --frozen-lockfile
RUN pnpm --filter public-web build

FROM node:22-alpine AS runtime
WORKDIR /workspace

RUN corepack enable \
    && addgroup -S netmetric \
    && adduser -S netmetric -G netmetric

COPY --from=build /workspace /workspace

ENV NODE_ENV=production
EXPOSE 7003

USER netmetric

CMD ["pnpm", "--filter", "public-web", "start"]
