/**
 * Executes health checks directly from the browser (there is no server
 * component in this app — it's a static export served from S3). Targets
 * must allow cross-origin requests; otherwise the check surfaces as DOWN
 * with a CORS error, which is still meaningful signal to the viewer.
 */

import { Application, HealthCheckResult } from './types'

export interface ExecuteHealthCheckOptions {
  application: Application
  timeoutMs: number
}

export async function executeHealthCheck({
  application,
  timeoutMs
}: ExecuteHealthCheckOptions): Promise<HealthCheckResult> {
  const targetUrl = application.healthEndpoint
    ? `${application.url}${application.healthEndpoint}`
    : application.url

  const startedAt = performance.now()
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store',
      mode: 'cors'
    })

    const responseTime = Math.round(performance.now() - startedAt)
    const success = response.status >= 200 && response.status < 300

    return {
      applicationId: application.id,
      timestamp: Date.now(),
      statusCode: response.status,
      responseTime,
      status: success ? 'UP' : 'DOWN',
      error: success ? undefined : `HTTP ${response.status}`
    }
  } catch (error) {
    const responseTime = Math.round(performance.now() - startedAt)
    let message = 'Unknown error'

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        message = 'Request timeout'
      } else if (error.message.includes('Failed to fetch')) {
        message = 'Network or CORS error'
      } else {
        message = error.message
      }
    }

    return {
      applicationId: application.id,
      timestamp: Date.now(),
      statusCode: null,
      responseTime,
      status: 'DOWN',
      error: message
    }
  } finally {
    clearTimeout(timeoutId)
  }
}
