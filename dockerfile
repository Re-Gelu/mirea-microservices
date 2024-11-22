# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY . .

# Install the application dependencies
RUN yarn install

# Build the NestJS application
RUN yarn turbo run build

# Expose the application port
EXPOSE 8000
EXPOSE 8001

# Command to run the application
CMD ["yarn", "start:migrate:prod"]