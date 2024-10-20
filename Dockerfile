# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies (this layer will be cached if package.json or package-lock.json hasn't changed)
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Set the environment variable
ENV REACT_APP_API_BASE_URL=https://plus-appointment.com

# Build the app
RUN npm run build

# Serve the app using a lightweight HTTP server
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Run the server
CMD ["serve", "-s", "build"]
