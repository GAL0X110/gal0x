# ─────────────────────────────────────────────────────────────
#  GALOX — سایت شخصی محمدامین شاکر
#  ساخت ایمیج:   docker build -t galox .
#  اجرا:         docker run -d -p 3000:3000 -v galox-db:/app/db --name galox galox
# ─────────────────────────────────────────────────────────────

# ─── مرحله ۱: نصب وابستگی‌ها ───
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
COPY prisma ./prisma
RUN bun install --frozen-lockfile

# ─── مرحله ۲: بیلد پروژه ───
FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=file:../db/custom.db
# ساخت دیتابیس خالی با ساختار جداول (فقط برای بیلد)
RUN mkdir -p db && bunx prisma db push --skip-generate
RUN bun run build

# ─── مرحله ۳: ایمیج نهایی سبک ───
FROM node:22-slim AS runner
WORKDIR /app
# openssl برای موتور Prisma لازم است
RUN apt-get update -y \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV DATABASE_URL=file:/app/db/custom.db

# خروجی standalone از مرحله بیلد
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# دیتابیس SQLite (برای ماندگاری، این پوشه را volume کنید)
COPY --from=builder /app/db ./db

RUN groupadd -g 1001 nodejs \
    && useradd -u 1001 -g nodejs -m nextjs \
    && chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
