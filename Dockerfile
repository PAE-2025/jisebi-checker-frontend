# Use an official Node.js image
FROM node:20

# Echo the variable into a .env file
RUN echo "NEXT_PUBLIC_AUTH_SERVICE=$NEXT_PUBLIC_AUTH_SERVICE" > /app/.env && \
    echo "NEXT_PUBLIC_DOCUMENT_PROCESSING_SERVICE=$NEXT_PUBLIC_DOCUMENT_PROCESSING_SERVICE" >> /app/.env \

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build Next.js
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
