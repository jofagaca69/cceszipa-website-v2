# Stage 1: Build
FROM node:22-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm config set ignore-scripts false
RUN pnpm config set unsafe-perm true
RUN pnpm install --frozen-lockfile --ignore-scripts=false

# Instalar sharp manualmente para que compile sus binarios nativos
RUN pnpm add sharp --ignore-scripts=false

COPY . .

RUN pnpm run build

# Stage 2: Production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]