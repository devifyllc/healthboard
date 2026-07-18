/**
 * Core type definitions for the Healthboard application.
 */

/** Supported deployment environments. */
export type Environment = 'dev' | 'stage' | 'uat' | 'preprod' | 'prod'

/** Raw outcome of a single health check request. */
export type HealthCheckStatus = 'UP' | 'DOWN' | 'CHECKING'

/** Status shown in the UI, including a derived DEGRADED state for slow-but-successful checks. */
export type DisplayStatus = 'UP' | 'DEGRADED' | 'DOWN' | 'CHECKING'

/** A single application monitored within an environment. */
export interface Application {
  /** Unique identifier within the environment. */
  id: string

  /** Display name shown in the UI. */
  name: string

  /** Base URL of the application. */
  url: string

  /**
   * Optional health endpoint path (appended to url).
   * If not provided, the base URL is used for health checks.
   * @example '/health', '/deckPlans.do?shipCode=CB'
   */
  healthEndpoint?: string

  /** Optional deployment region label, shown on the card footer when present. */
  region?: string
}

/** Full configuration for a single environment. */
export interface EnvironmentConfig {
  /** Environment identifier. */
  name: Environment

  /** Display label for the environment section header. */
  label: string

  /** Applications monitored within this environment. */
  applications: Application[]

  /** Health check timeout in seconds. Defaults to DEFAULT_CHECK_TIMEOUT_SECONDS. */
  checkTimeout?: number
}

/** Result of a single executed health check. */
export interface HealthCheckResult {
  applicationId: string
  timestamp: number
  statusCode: number | null
  responseTime: number
  status: HealthCheckStatus
  error?: string
}

/** Current monitoring state for a single application. */
export interface HealthState {
  status: DisplayStatus
  responseTime: number | null
  statusCode: number | null
  uptimePercentage: number | null
  lastChecked: number | null
  error?: string
}

/** Rolling history of check results persisted to localStorage. */
export interface StoredCheckHistory {
  environment: Environment
  applicationId: string
  checks: HealthCheckResult[]
}

/** Aggregated online/degraded/offline counts, used for summary badges. */
export interface HealthSummary {
  total: number
  online: number
  degraded: number
  offline: number
}
