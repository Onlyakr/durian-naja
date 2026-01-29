FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock* ./
COPY prisma ./prisma

RUN bun install
RUN bunx prisma generate

COPY . .

EXPOSE 8080

CMD ["bun", "run", "src/index.ts"]
