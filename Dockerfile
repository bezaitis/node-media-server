# Use an official Node.js runtime as a parent image
FROM node:18

# Install FFmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if present)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the RTMP port
EXPOSE 80

# Command to start the Node Media Server
CMD ["npm", "start"]

