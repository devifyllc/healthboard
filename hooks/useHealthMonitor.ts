'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_CHECK_INTERVAL_SECONDS, DEFAULT_CHECK_TIMEOUT_SECONDS } from '@/config/constants'
import { executeHealthCheck } from '@/lib/health-checker'
import { appendHistory, calculateUptimePercentage, loadHistory } from '@/lib/storage'
import { deriveDisplayStatus } from '@/lib/status'
import { EnvironmentConfig, HealthState } from '@/lib/types'

function stateKey(environment: string, applicationId: string): string {
  return `${environment}:${applicationId}`
}

function initialState(): HealthState {
  return {
    status: 'CHECKING',
    responseTime: null,
    statusCode: null,
    uptimePercentage: null,
    lastChecked: null
  }
}

/**
 * Polls every application across every configured environment on a shared
 * interval, tracking current status plus a localStorage-backed uptime %.
 */
export function useHealthMonitor(environments: EnvironmentConfig[], intervalSeconds = DEFAULT_CHECK_INTERVAL_SECONDS) {
  const [states, setStates] = useState<Record<string, HealthState>>(() => {
    const initial: Record<string, HealthState> = {}
    for (const env of environments) {
      for (const app of env.applications) {
        initial[stateKey(env.name, app.id)] = initialState()
      }
    }
    return initial
  })
  const [lastRefreshedAt, setLastRefreshedAt] = useState<number | null>(null)
  const runningRef = useRef(false)

  const runAllChecks = useCallback(async () => {
    if (runningRef.current) return
    runningRef.current = true

    for (const env of environments) {
      const timeoutMs = (env.checkTimeout ?? DEFAULT_CHECK_TIMEOUT_SECONDS) * 1000

      for (const app of env.applications) {
        const key = stateKey(env.name, app.id)
        setStates((prev) => ({
          ...prev,
          [key]: { ...prev[key], status: 'CHECKING' }
        }))

        const result = await executeHealthCheck({ application: app, timeoutMs })
        const history = appendHistory(env.name, app.id, result)

        setStates((prev) => ({
          ...prev,
          [key]: {
            status: deriveDisplayStatus(result),
            responseTime: result.responseTime,
            statusCode: result.statusCode,
            uptimePercentage: calculateUptimePercentage(history),
            lastChecked: result.timestamp,
            error: result.error
          }
        }))
      }
    }

    setLastRefreshedAt(Date.now())
    runningRef.current = false
  }, [environments])

  // Uptime history lives in localStorage, which isn't available during SSR.
  // Loading it here (post-mount) rather than in the initial state keeps the
  // first client render identical to the server render, avoiding a hydration
  // mismatch on the progress bar width.
  useEffect(() => {
    setStates((prev) => {
      const next = { ...prev }
      for (const env of environments) {
        for (const app of env.applications) {
          const key = stateKey(env.name, app.id)
          const history = loadHistory(env.name, app.id)
          next[key] = { ...next[key], uptimePercentage: calculateUptimePercentage(history) }
        }
      }
      return next
    })

    runAllChecks()
    const id = setInterval(runAllChecks, intervalSeconds * 1000)
    return () => clearInterval(id)
  }, [runAllChecks, intervalSeconds, environments])

  return { states, lastRefreshedAt, refreshAll: runAllChecks }
}
