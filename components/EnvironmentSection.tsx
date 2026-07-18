import { EnvironmentConfig, HealthState } from '@/lib/types'
import { AppCard } from './AppCard'

const ENV_ICON: Record<EnvironmentConfig['name'], string> = {
  dev: 'code',
  stage: 'science',
  uat: 'gesture',
  preprod: 'factory',
  prod: 'rocket_launch'
}

export function EnvironmentSection({
  environment,
  states
}: {
  environment: EnvironmentConfig
  states: Record<string, HealthState>
}) {
  const offline = environment.applications.filter(
    (app) => states[`${environment.name}:${app.id}`]?.status === 'DOWN'
  ).length

  return (
    <section id={environment.name} className="mb-10 scroll-mt-20">
      <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-slate-500">{ENV_ICON[environment.name]}</span>
          <h2 className="text-base font-semibold text-slate-900">{environment.label}</h2>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded border border-slate-200">
            {environment.applications.length} APPS
          </span>
          {offline > 0 && (
            <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-bold rounded border border-red-200">
              {offline} OFFLINE
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {environment.applications.map((app) => (
          <AppCard
            key={app.id}
            application={app}
            state={
              states[`${environment.name}:${app.id}`] ?? {
                status: 'CHECKING',
                responseTime: null,
                statusCode: null,
                uptimePercentage: null,
                lastChecked: null
              }
            }
          />
        ))}
      </div>
    </section>
  )
}
