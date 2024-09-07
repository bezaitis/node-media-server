# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install FFmpeg
RUN apk add --no-cache ffmpeg

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if present)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create media and www directories
RUN mkdir -p /app/media /app/www

# Expose the RTMP port and HTTP port
EXPOSE 80

# Command to start the Node Media Server
CMD ["npm", "start"]

