# Dockerfile

# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Make the application's port available to the outside world
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
