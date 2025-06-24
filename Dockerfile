# Use official Node.js 16 image
FROM node:lts

# Set working directory
WORKDIR /usr/src/app

# Install vim (and clean up to keep image small)
RUN apt-get update && \
    apt-get install -y vim && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
    
# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the ports used by the app
EXPOSE 8080 4040

# Start the application
CMD ["node", "index.js"]