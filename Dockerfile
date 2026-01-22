# Use the official Node.js image as the base image
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install the dependencies using pnpm
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Build the SvelteKit application
RUN pnpm run build

# Use the official Node.js image as the base image for the runner stage
FROM node:20-alpine AS runner

# Set the environment variable to production
ENV NODE_ENV=production

# Set the port to 3000
ENV PORT=3000

# Copy the built application from the builder stage to the runner stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules

# Set the working directory in the runner container
WORKDIR /app

# Expose port 3000 to the host
EXPOSE 3000

CMD ["node", "build"]