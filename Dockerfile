# Stage 1: Build
FROM node:16.15.0-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Stage 2: Production
FROM node:16.15.0-alpine

# Set working directory
WORKDIR /app

# Install nodemon globally
RUN npm install -g node

# Copy only necessary files from the builder stage
COPY --from=builder /app /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8081

# Expose the port the app runs on
EXPOSE 8081

# Start the application
CMD ["node", "app.js"]