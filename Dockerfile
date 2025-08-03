# 1. Base Stage: Installs dependencies for the entire monorepo
FROM node:22-alpine AS base
WORKDIR /app

# Copy all package.json files and the lock file to give npm full workspace context
COPY package.json package-lock.json* ./
COPY apps/store-app/package.json ./apps/store-app/
COPY apps/cart-app/package.json ./apps/cart-app/
COPY packages/ui/package.json ./packages/ui/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# Install all monorepo dependencies
RUN npm install

# 2. Builder Stage: Builds a specific application
FROM node:22-alpine AS builder
WORKDIR /app

# Copy dependencies from the base stage
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Build the specified app (e.g., "store-app" or "cart-app")
ARG APP_NAME
RUN npx next build apps/${APP_NAME}

# 3. Runner Stage: Creates the final, small image
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ARG APP_NAME

# Copy the standalone output from the builder stage
COPY --from=builder /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=builder /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

CMD ["node", "server.js"]