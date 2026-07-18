'use client'

import { EnvironmentSection, Header, Sidebar, SummaryBar } from '@/components'
import { environments } from '@/config/environments'
import { useHealthMonitor } from '@/hooks/useHealthMonitor'
import { HealthSummary } from '@/lib/types'

function summarize(states: ReturnType<typeof useHealthMonitor>['states']): HealthSummary {
  const values = Object.values(states)
  return {
    total: values.length,
    online: values.filter((s) => s.status === 'UP').length,
    degraded: values.filter((s) => s.status === 'DEGRADED').length,
    offline: values.filter((s) => s.status === 'DOWN').length
  }
}

export default function DashboardPage() {
  const { states, lastRefreshedAt, refreshAll } = useHealthMonitor(environments)
  const summary = summarize(states)

  return (
    <div>
      <Sidebar environments={environments} />
      <div className="ml-60 min-h-screen flex flex-col">
        <Header lastRefreshedAt={lastRefreshedAt} onRefresh={refreshAll} />
        <main className="flex-1 p-6 max-w-[1400px]">
          <SummaryBar summary={summary} />
          {environments.map((env) => (
            <EnvironmentSection key={env.name} environment={env} states={states} />
          ))}
        </main>
      </div>
    </div>
  )
}
