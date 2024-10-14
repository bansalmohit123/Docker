# Node.js App with MongoDB, Redis, and Nginx (Dockerized)
This project demonstrates a Dockerized Node.js application that connects to a MongoDB database and Redis for session storage, with Nginx as a reverse proxy. The app is designed to run in different environments (development and production) using Docker Compose for seamless service orchestration.

# Prerequisites
Before you can run the project, ensure you have the following installed on your machine:

Docker
Docker Compose

# Project Structure
Dockerfile: Defines the Node.js app container
docker-compose.yml: Defines production services (Node.js, MongoDB, Redis, and Nginx)
docker-compose-dev.yml: Defines development services with live-reloading for the Node.js app
index.js: Main Node.js application that connects to MongoDB and Redis, and serves routes for users and posts

# Services
Node.js App: The core application built with Express.js
MongoDB: Database service
Redis: In-memory data store for session management
Nginx: Reverse proxy to forward requests to the Node.js app
Environment Variables
To run this project, you need to set up the following environment variables in a .env file:

MONGO_USER
MONGO_PASSWORD
MONGO_IP
MONGO_PORT
SESSION_SECRET
REDIS_URL
REDIS_PORT


# Getting Started
1. Clone the repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
```

2. Build and start the services
For production:

```bash

docker-compose up --build
```
For development:

```bash

docker-compose -f docker-compose-dev.yml up --build
```
3. Access the application
App: http://localhost:3000
MongoDB: MongoDB instance is connected at mongodb://<MONGO_USER>:<MONGO_PASSWORD>@mongo:27017
Nginx: Nginx is serving the app at http://localhost:3000
5. Stopping the services
To stop the running services, press CTRL + C or run:

```bash

docker-compose down
```
This command stops and removes the containers defined in the docker-compose.yml or docker-compose-dev.yml.

Development Workflow
During development, the app is set up for hot-reloading using the following:

Mounting the local code to the Docker container using volumes.
Using npm run dev to enable live reloading in development.
To run in development mode:

```bash

docker-compose -f docker-compose-dev.yml up
```

# Nginx Configuration
The Nginx service is configured using the nginx/default.conf file, which sets up reverse proxying for the Node.js app. The configuration listens on port 80 and forwards traffic to the Node.js app running on port 3000 inside the container.

nginx
```
server {
    listen 80
    
    location / {
        proxy_pass http://node-app:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
