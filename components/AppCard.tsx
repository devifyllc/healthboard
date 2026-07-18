import { Application, HealthState } from '@/lib/types'
import { StatusPill } from './StatusPill'

const BORDER_BY_STATUS: Record<HealthState['status'], string> = {
  UP: 'border-l-emerald-500',
  DEGRADED: 'border-l-amber-500',
  DOWN: 'border-l-red-500',
  CHECKING: 'border-l-sky-500'
}

const BAR_BY_STATUS: Record<HealthState['status'], string> = {
  UP: 'bg-emerald-500',
  DEGRADED: 'bg-amber-500',
  DOWN: 'bg-red-500',
  CHECKING: 'bg-sky-500'
}

function barWidthPercent(status: HealthState['status'], uptimePercentage: number | null): number {
  if (uptimePercentage !== null) return Math.max(uptimePercentage, 2)
  return status === 'DOWN' ? 0 : 100
}

export function AppCard({ application, state }: { application: Application; state: HealthState }) {
  const widthPercent = barWidthPercent(state.status, state.uptimePercentage)

  return (
    <div
      className={`bg-white border-l-4 ${BORDER_BY_STATUS[state.status]} border-y border-r border-slate-200 hover:shadow-sm transition-shadow`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-slate-900 leading-tight">{application.name}</h3>
            <span className="text-[10px] text-slate-400 font-mono-brand">{application.id}</span>
          </div>
          <StatusPill status={state.status} />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-xs text-slate-500">Response Time</span>
            <span className="font-mono-brand text-sm text-slate-700">
              {state.responseTime !== null ? `${state.responseTime}ms` : '--'}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1 rounded overflow-hidden">
            <div
              className={`h-full rounded ${BAR_BY_STATUS[state.status]}`}
              style={{ width: `${widthPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Uptime</span>
            <span className="text-slate-900 font-semibold">
              {state.uptimePercentage !== null ? `${state.uptimePercentage}%` : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 px-4 py-2 flex justify-between items-center border-t border-slate-200">
        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
          {application.region ?? ' '}
        </span>
        <a
          href={application.url}
          target="_blank"
          rel="noreferrer"
          className="text-slate-500 hover:text-slate-900 hover:bg-slate-200 p-1 rounded transition-colors"
          title="Open application"
        >
          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
        </a>
      </div>
    </div>
  )
}
