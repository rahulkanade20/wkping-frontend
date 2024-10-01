# Official Node.js image being used as a base image
FROM node:14

#build-time argument
ARG REACT_APP_IP_ADDRESS
ENV REACT_APP_IP_ADDRESS=${REACT_APP_IP_ADDRESS}

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

# Build react app
RUN npm run build

# Install a simple server to serve the built files
RUN npm install -g serve

# Export the port app will run on
EXPOSE 3000

# Command to run the app
ENTRYPOINT ["serve", "-s", "build"]