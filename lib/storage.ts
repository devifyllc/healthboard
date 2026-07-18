/**
 * Rolling per-application check history, persisted to localStorage so the
 * uptime percentage survives page reloads. Scoped per browser/device only —
 * there is no shared backend to aggregate history across viewers.
 */

import { HISTORY_SIZE } from '@/config/constants'
import { Environment, HealthCheckResult, StoredCheckHistory } from './types'

function storageKey(environment: Environment, applicationId: string): string {
  return `healthboard:history:${environment}:${applicationId}`
}

export function loadHistory(environment: Environment, applicationId: string): HealthCheckResult[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(storageKey(environment, applicationId))
    if (!raw) return []

    const parsed = JSON.parse(raw) as StoredCheckHistory
    return parsed.checks ?? []
  } catch {
    return []
  }
}

export function appendHistory(
  environment: Environment,
  applicationId: string,
  result: HealthCheckResult
): HealthCheckResult[] {
  if (typeof window === 'undefined') return []

  const existing = loadHistory(environment, applicationId)
  const updated = [...existing, result].slice(-HISTORY_SIZE)

  const record: StoredCheckHistory = {
    environment,
    applicationId,
    checks: updated
  }

  try {
    window.localStorage.setItem(storageKey(environment, applicationId), JSON.stringify(record))
  } catch {
    // Storage full or unavailable (e.g. private browsing) — history simply won't persist.
  }

  return updated
}

export function calculateUptimePercentage(history: HealthCheckResult[]): number | null {
  if (history.length < 2) return null

  const upCount = history.filter((entry) => entry.status === 'UP').length
  return Math.round((upCount / history.length) * 1000) / 10
}
