# HealthBoard

**Version 0.1.0**

A lightweight, client-side application health monitoring dashboard for tracking service availability across multiple environments. Monitor applications in real-time with health checks, uptime tracking, and status visualization—all running entirely in the browser with no backend required.

## Purpose

HealthBoard provides DevOps and engineering teams with a simple, self-hosted solution to monitor the health and availability of web applications across different environments (Dev, Stage, UAT, Preprod, Production). Built as a static Next.js application, it performs client-side health checks and displays real-time status information with historical uptime tracking.

**Key Features:**
- 🚀 **Zero Backend** - Runs entirely in the browser as a static site
- 🔄 **Real-time Monitoring** - Automatic health checks with configurable intervals
- 📊 **Uptime Tracking** - Historical data stored locally in browser
- 🎨 **Modern UI** - Clean, responsive interface built with React and Tailwind CSS
- 🐳 **Docker Ready** - Easy deployment with Docker and nginx
- ⚡ **Fast & Lightweight** - Static export with minimal dependencies

## License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for full terms.

Copyright 2024–2025 Devify LLC

## Requirements

- **Node.js** 18.x or higher (recommended: 22.x)
- **npm** 9.x or higher
- **Docker** (optional, for containerized deployment)

### Dependencies

- **Next.js** 15.1.0+
- **React** 19.0.0+
- **TypeScript** 5.7.2+
- **Tailwind CSS** 4.0.0+

## Configuration

### Environment Configuration

The application is configured through the `config/environments.ts` file, which defines the environments and applications to monitor.

#### Structure

```typescript
import { EnvironmentConfig } from '@/lib/types'

export const environments: EnvironmentConfig[] = [
  {
    name: 'dev',           // Environment identifier
    label: 'Dev',          // Display name
    applications: [
      {
        id: 'app-dev',                    // Unique application ID
        name: 'My Application',           // Display name
        url: 'https://dev.example.com',   // Application URL
        healthEndpoint: '/health'         // Optional: custom health check path
      }
    ]
  }
]
```

#### Configuration Fields

- **`name`**: Environment identifier (used internally)
- **`label`**: Display name shown in the UI
- **`applications`**: Array of applications to monitor in this environment
  - **`id`**: Unique identifier for the application
  - **`name`**: Display name for the application
  - **`url`**: Base URL of the application to monitor
  - **`healthEndpoint`** (optional): Custom path for health checks (defaults to the base URL)

#### Example Configuration

```typescript
export const environments: EnvironmentConfig[] = [
  {
    name: 'dev',
    label: 'Development',
    applications: [
      {
        id: 'api-dev',
        name: 'API Service',
        url: 'https://api-dev.example.com',
        healthEndpoint: '/api/health'
      },
      {
        id: 'web-dev',
        name: 'Web Application',
        url: 'https://web-dev.example.com'
      }
    ]
  },
  {
    name: 'prod',
    label: 'Production',
    applications: [
      {
        id: 'api-prod',
        name: 'API Service',
        url: 'https://api.example.com',
        healthEndpoint: '/api/health'
      },
      {
        id: 'web-prod',
        name: 'Web Application',
        url: 'https://www.example.com'
      }
    ]
  }
]
```

#### CORS Considerations

Since HealthBoard runs in the browser, the monitored applications must allow CORS requests from the HealthBoard origin. If an application blocks CORS, you have these options:

1. Configure the application to allow the HealthBoard origin in `Access-Control-Allow-Origin`
2. Use a proxy server to bypass CORS restrictions
3. Exclude the application from monitoring

## Running the Project

### Development Mode

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3111](http://localhost:3111)

The development server includes hot-reload, so changes to the code will automatically refresh the browser.

### Production Build

1. **Build the static site:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

   Or serve the `out/` directory with any static file server.

### Type Checking

Run TypeScript type checking without building:
```bash
npm run type-check
```

### Linting

Check code quality with ESLint:
```bash
npm run lint
```

## Running with Docker

HealthBoard includes Docker support for easy deployment with nginx.

### Build and Run with Docker Compose

1. **Build and start the container:**
   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   Navigate to [http://localhost:8080](http://localhost:8080)

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

### Build Docker Image Manually

1. **Build the image:**
   ```bash
   docker build -t healthboard:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 8080:80 --name healthboard healthboard:latest
   ```

3. **Stop and remove the container:**
   ```bash
   docker stop healthboard
   docker rm healthboard
   ```

### Docker Configuration

The Docker setup uses a multi-stage build:
- **Stage 1**: Builds the Next.js static export
- **Stage 2**: Serves the static files with nginx

The nginx configuration (`nginx.conf`) is optimized for serving the static site with proper caching headers.

## Project Structure

```
healthboard/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── AppCard.tsx        # Application status card
│   ├── EnvironmentSection.tsx  # Environment grouping
│   ├── Header.tsx         # Page header
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── StatusPill.tsx     # Status indicator
│   ├── SummaryBar.tsx     # Summary statistics
│   └── index.ts           # Component exports
├── config/                # Configuration files
│   ├── constants.ts       # App constants
│   └── environments.ts    # Environment definitions
├── hooks/                 # React hooks
│   └── useHealthMonitor.ts  # Health monitoring logic
├── lib/                   # Utility libraries
│   ├── health-checker.ts  # Health check implementation
│   ├── status.ts          # Status utilities
│   ├── storage.ts         # Local storage management
│   └── types.ts           # TypeScript types
├── Dockerfile             # Docker build configuration
├── docker-compose.yml     # Docker Compose setup
├── nginx.conf             # nginx configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and test thoroughly
4. Run type checking: `npm run type-check`
5. Run linting: `npm run lint`
6. Commit your changes with clear messages
7. Push to your fork and submit a pull request

## Support

For issues, questions, or feature requests, please open an issue on the GitHub repository.

---

Built with ❤️ by [Devify LLC](https://github.com/devifyllc)
