# Estágio 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copia os arquivos de manifesto de pacotes
COPY package.json yarn.lock* package-lock.json* ./

# Instala as dependências
RUN npm install

# Copia todo o resto do código do projeto
COPY . .

# REMOVIDO: A forma insegura de passar o token
# ARG PLASMIC_AUTH_TOKEN
# ENV PLASMIC_AUTH_TOKEN=${PLASMIC_AUTH_TOKEN}

# ALTERADO: Usando --mount=type=secret para injetar o token de forma segura
# O segredo 'plasmic_token' será montado em /run/secrets/plasmic_token
# E o valor será lido e passado como variável de ambiente APENAS para este comando.
RUN --mount=type=secret,id=plasmic_token \
    PLASMIC_AUTH_TOKEN=$(cat /run/secrets/plasmic_token) npx plasmic sync --yes

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