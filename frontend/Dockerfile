# Estágio 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./
RUN npm install
COPY . .
ARG PLASMIC_AUTH_TOKEN
ENV PLASMIC_AUTH_TOKEN=${PLASMIC_AUTH_TOKEN}
RUN npx plasmic sync --yes
RUN npm run build

# Estágio 2: Runner
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
EXPOSE 3000
CMD ["npm", "start"]