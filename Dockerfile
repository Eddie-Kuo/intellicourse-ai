FROM node:20-slim AS base

FROM base AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# ARG WEBHOOK_SECRET
# ARG YOUTUBE_API
# ARG OPENAI_API_KEY
# ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL
# ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL
# ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# ARG CLERK_SECRET_KEY
# ARG DATABASE_AUTH_TOKEN
# ARG DATABASE_URL

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

ARG HOSTNAME

CMD node server.js