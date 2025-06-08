# Use an official Node.js image
FROM node:20

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
