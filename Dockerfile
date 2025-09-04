# Multi-stage build for React Native app
FROM node:18-alpine AS base

# Install dependencies
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    jq

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production=false

# Copy source code
COPY . .

# Build stage for different platforms
FROM base AS android-build
RUN npm run build:android

FROM base AS ios-build
RUN npm run build:ios

FROM base AS windows-build
RUN npm run build:windows

FROM base AS linux-build
RUN npm run build:linux

FROM base AS macos-build
RUN npm run build:macos

# Production stage
FROM node:18-alpine AS production

# Install runtime dependencies
RUN apk add --no-cache \
    dumb-init \
    curl

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=base --chown=nextjs:nodejs /app/dist ./dist
COPY --from=base --chown=nextjs:nodejs /app/public ./public
COPY --from=base --chown=nextjs:nodejs /app/package*.json ./

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Start application
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
