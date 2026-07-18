/**
 * Environment configuration.
 *
 * Configure your environments and applications to monitor below.
 * This app renders every environment on a single page.
 */

import { EnvironmentConfig } from '@/lib/types'

/**
 * Example configuration - replace with your own applications and environments.
 * Add your application URLs and health endpoints below.
 */
export const environments: EnvironmentConfig[] = [
  {
    name: 'dev',
    label: 'Development',
    applications: [
      {
        id: 'api-dev',
        name: 'API Service',
        url: 'https://api-dev.example.com',
        healthEndpoint: '/health'
      },
      {
        id: 'web-dev',
        name: 'Web Application',
        url: 'https://web-dev.example.com'
      }
    ]
  },
  {
    name: 'stage',
    label: 'Staging',
    applications: [
      {
        id: 'api-stage',
        name: 'API Service',
        url: 'https://api-stage.example.com',
        healthEndpoint: '/health'
      },
      {
        id: 'web-stage',
        name: 'Web Application',
        url: 'https://web-stage.example.com'
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
        healthEndpoint: '/health'
      },
      {
        id: 'web-prod',
        name: 'Web Application',
        url: 'https://www.example.com'
      }
    ]
  }
]
