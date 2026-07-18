import { DisplayStatus } from '@/lib/types'

const STYLES: Record<DisplayStatus, { pill: string; dot: string; label: string; pulse?: boolean }> = {
  UP: { pill: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500', label: 'ONLINE', pulse: true },
  DEGRADED: { pill: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500', label: 'DEGRADED', pulse: true },
  DOWN: { pill: 'bg-red-50 text-red-700', dot: 'bg-red-500', label: 'OFFLINE' },
  CHECKING: { pill: 'bg-sky-50 text-sky-700', dot: 'bg-sky-500', label: 'CHECKING...', pulse: true }
}

export function StatusPill({ status }: { status: DisplayStatus }) {
  const style = STYLES[status]

  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-bold tracking-wide ${style.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot} ${style.pulse ? 'status-pulse' : ''}`} />
      {style.label}
    </div>
  )
}
