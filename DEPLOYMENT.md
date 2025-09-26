# Prismahome Deployment Guide

## Overview

This document describes the deployment setup for the Prismahome React application using GitHub Actions to deploy to a DigitalOcean droplet.

## Droplet Structure

Your droplet should have the following structure:

```
/root/prismaprod/
├── client/
│   ├── server/
│   ├── docker-compose.yml
│   └── .env
├── detailer/
│   ├── server/
│   ├── docker-compose.yml
│   └── .env
└── prismahome/
    ├── build/
    ├── package.json
    ├── package-lock.json
    ├── Dockerfile
    └── docker-compose.yml
```

## GitHub Secrets Required

Configure the following secrets in your GitHub repository:

- `HOST`: Your droplet's IP address
- `USERNAME`: SSH username (usually `root`)
- `SSH_KEY`: Your private SSH key for authentication
- `PORT`: SSH port (optional, defaults to 22)

## Workflow Features

The GitHub workflow (`/.github/workflows/deploy.yml`) includes:

1. **Automatic Build**: Builds the React application using `npm run build`
2. **Docker Deployment**: Uses Docker Compose to deploy the application
3. **Zero-Downtime**: Stops old containers before starting new ones
4. **Health Checks**: Verifies the deployment was successful
5. **Cleanup**: Removes old Docker images to save space

## Deployment Process

1. Push to `main` or `master` branch triggers deployment
2. The workflow builds the React app
3. Creates a deployment package with necessary files
4. Connects to your droplet via SSH
5. Stops existing containers
6. Extracts new files to `/root/prismaprod/prismahome/`
7. Builds and starts new Docker containers
8. Verifies the deployment

## Manual Deployment

You can also trigger deployments manually:

1. Go to your GitHub repository
2. Click on "Actions" tab
3. Select "Deploy Prismahome to Droplet"
4. Click "Run workflow"

## Troubleshooting

### Common Issues

1. **SSH Connection Failed**: Check your SSH key and host credentials
2. **Docker Build Failed**: Ensure Docker is installed on your droplet
3. **Port Conflicts**: Make sure port 3000 is available
4. **Network Issues**: Ensure `prisma_shared_net` network exists

### Checking Deployment Status

SSH into your droplet and run:

```bash
cd /root/prismaprod/prismahome
docker compose ps
docker compose logs
```

### Manual Container Management

```bash
# Stop containers
docker compose down

# Start containers
docker compose up -d

# View logs
docker compose logs -f

# Rebuild containers
docker compose up -d --build
```

## Environment Variables

Make sure your `.env` file (if needed) is properly configured on the droplet. The React app doesn't require server-side environment variables, but if you add any, ensure they're set correctly.

## Network Configuration

The application uses the `prisma_shared_net` Docker network. This network should be created before deployment:

```bash
docker network create prisma_shared_net
```

## Monitoring

- Check container health: `docker inspect prismahome`
- View application logs: `docker-compose logs prismahome`
- Test application: `curl http://localhost:3000`
