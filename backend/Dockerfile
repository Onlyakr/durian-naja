FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock* ./

RUN bun install

COPY prisma ./prisma

RUN bunx prisma generate

COPY . .

EXPOSE 8080

# Wait for DB, run migrations, seed, then start app
CMD ["sh", "-c", "sleep 3 && bunx --bun prisma migrate deploy && bunx --bun prisma db seed && bun run src/index.ts"]