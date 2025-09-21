# Prisma Valet - Car Valeting Company Website

A modern, responsive static website for Prisma Valet car valeting services. Built with React, featuring smooth animations, beautiful car detailing imagery, and a clean, professional design.

## Features

- **Modern Design**: Clean, professional layout with light color scheme
- **Responsive**: Optimized for desktop, tablet, and mobile devices
- **Animations**: Smooth scroll animations using Framer Motion
- **Car Detailing Process**: Visual showcase of our 5-step detailing process
- **Problem & Solution**: Clear explanation of how Prisma Valet solves car care challenges
- **App Download**: Non-functional download buttons for iOS and Android apps
- **Docker Ready**: Containerized deployment with Docker and Docker Compose

## Technology Stack

- React 19.1.1
- Framer Motion (animations)
- Styled Components (CSS-in-JS)
- React Icons
- Docker & Docker Compose

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Production with Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

The website will be available at [http://localhost:3000](http://localhost:3000).

### Docker Network

The application uses the `prisma_shared_net` network as specified, allowing it to communicate with other services in the Prisma ecosystem.

## Project Structure

```
prismahome/
├── public/                 # Static assets
├── src/
│   ├── App.js             # Main application component
│   ├── App.css            # Application styles
│   ├── index.js           # Application entry point
│   └── index.css          # Global styles
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose configuration
└── package.json           # Dependencies and scripts
```

## Sections

1. **Hero Section**: Company introduction with compelling imagery
2. **Problem Statement**: Challenges in traditional car care
3. **Solution**: How Prisma Valet addresses these challenges
4. **Process**: 5-step car detailing process with images
5. **Download**: App store download buttons
6. **Footer**: Company information

## Customization

The website uses a light color scheme with:

- Primary: #3498db (blue)
- Secondary: #2c3e50 (dark blue-gray)
- Accent: #e74c3c (red for problems)
- Background: #f8f9fa (light gray)

Colors can be easily modified in the styled components within `App.js`.

## Deployment

The application is optimized for static hosting and can be deployed to:

- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting service

For containerized deployment, use the provided Docker configuration.

## Future Enhancements

- Functional app download links
- Contact form integration
- Customer testimonials section
- Service pricing information
- Online booking system integration
