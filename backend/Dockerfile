# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Expose port
EXPOSE 4000

# Start the server
CMD ["node", "index.js"]
