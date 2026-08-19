# Base image with pnpm installed
FROM node:26.7.0-slim AS base
WORKDIR /app
COPY package.json ./
RUN npm install --global "$(node -p "require('./package.json').packageManager")"

# ----------------------
# 1. Install dependencies
# ----------------------
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ----------------------
# 2. Build the app
# ----------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ----------------------
# 3. Production runner
# ----------------------
FROM node:26.7.0-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only the build output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/scripts/migrate.mjs ./scripts/migrate.mjs
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

#official node:26.7.0-slim image already includes:
 #
 #  uid=1000(node) gid=1000(node)
USER node
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
CMD ["node", "-e", "const p=process.env.NITRO_PORT??process.env.PORT??3000;fetch(`http://127.0.0.1:${p}/health`).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

# ----------------------
# Pass build-time vars to runtime
# ----------------------
ARG HACKER_NEWS_ALGOLIA_API
ARG HACKER_NEWS_API
ENV HACKER_NEWS_ALGOLIA_API=${HACKER_NEWS_ALGOLIA_API}
ENV HACKER_NEWS_API=${HACKER_NEWS_API}

# ----------------------
# Expose and run
# ----------------------
EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", ".output/server/index.mjs"]
