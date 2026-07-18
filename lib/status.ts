import { DEGRADED_RESPONSE_TIME_MS } from '@/config/constants'
import { DisplayStatus, HealthCheckResult } from './types'

/**
 * Maps a raw check result to the status shown in the UI, introducing a
 * DEGRADED tier for successful checks that were unusually slow.
 */
export function deriveDisplayStatus(result: Pick<HealthCheckResult, 'status' | 'responseTime'>): DisplayStatus {
  if (result.status === 'DOWN') return 'DOWN'
  if (result.responseTime >= DEGRADED_RESPONSE_TIME_MS) return 'DEGRADED'
  return 'UP'
}
