# Use an official Node.js runtime as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port on which the app will run (default for React is 3000)
EXPOSE 5006

# Command to run the application
CMD ["npm", "run", "dev"]
