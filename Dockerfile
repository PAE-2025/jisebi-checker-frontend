# Use an official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies first (to leverage Docker caching)
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the entire project (excluding .dockerignore contents)
COPY . .

# Set environment variables dynamically at runtime
RUN echo "NEXT_PUBLIC_AUTH_SERVICE=$NEXT_PUBLIC_AUTH_SERVICE" >> /app/.env && \
    echo "NEXT_PUBLIC_DOCUMENT_PROCESSING_SERVICE=$NEXT_PUBLIC_DOCUMENT_PROCESSING_SERVICE" >> /app/.env

# Build the Next.js project
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Use an entrypoint script to set environment variables properly
RUN echo '#!/bin/sh' > /app/init.sh && \
    echo 'echo "NEXT_PUBLIC_AUTH_SERVICE=$NEXT_PUBLIC_AUTH_SERVICE" >> /app/.env' >> /app/init.sh && \
    echo 'echo "NEXT_PUBLIC_DOCUMENT_PROCESSING_SERVICE=$NEXT_PUBLIC_DOCUMENT_PROCESSING_SERVICE" >> /app/.env' >> /app/init.sh && \
    chmod +x /app/init.sh

# Start the Next.js server with the entrypoint script
CMD ["/bin/sh", "/app/init.sh", "&&", "npm", "start"]

