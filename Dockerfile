# Official Node.js image being used as a base image
FROM node:14

#Setting up the working directory
WORKDIR /app

# Copying package.json
COPY package.json ./

# Copying package-lcok.json
COPY package-lock.json ./

# install all dependencies
RUN npm install

# Copy rest of application code
COPY . .

# Install dotrnv-cli to load .env during the build
RUN npm install dotenv-cli 

# Build react app with env variables from .env
RUN dotenv -e .env npm run build

# Install a simple server to serve the built files
RUN npm install -g serve

# Export the port app will run on
EXPOSE 3000

# Command to run the app
ENTRYPOINT ["serve", "-s", "build"]