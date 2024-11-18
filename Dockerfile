# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install system dependencies required by Playwright
RUN apt-get update && apt-get install -y \
    libnss3 \
    libxss1 \
    libasound2 \
    libx11-xcb1 \
    libxrandr2 \
    libgtk-3-0 \
    libgbm1 \
    libpangocairo-1.0-0 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxkbcommon0 \
    libwayland-client0 \
    libwayland-server0 \
    libatspi2.0-0 \
    libxinerama1 \
    libfontconfig1 \
    libharfbuzz0b \
    libfreetype6 \
	xvfb \
	xauth \
    && rm -rf /var/lib/apt/lists/*

# Install Playwright and required browsers
RUN npm install playwright

# Install all Playwright-supported browsers
RUN npx playwright install --with-deps

# Install TypeScript globally
RUN npm install -g typescript

# Install Faker.js for mock data
RUN npm install faker

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .