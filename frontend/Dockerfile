# Estágio 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./
RUN npm install
COPY . .

# Segredo via Docker BuildKit (--mount=secret)
RUN --mount=type=secret,id=plasmic_token \
    --mount=type=secret,id=plasmic_user \
    PLASMIC_AUTH_TOKEN=$(cat /run/secrets/plasmic_token) \
    PLASMIC_AUTH_USER=$(cat /run/secrets/plasmic_user) \
    npx plasmic sync --yes --projects aZkp6uWdCVjDxZx2r6uaCh

# Constrói a aplicação Next.js para produção
RUN npm run build


# Estágio 2: Runner - Nenhuma alteração aqui, continua seguro
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
EXPOSE 3000
CMD ["npm", "start"]