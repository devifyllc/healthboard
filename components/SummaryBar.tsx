import { HealthSummary } from '@/lib/types'

export function SummaryBar({ summary }: { summary: HealthSummary }) {
  const cards = [
    {
      icon: 'check_circle',
      iconClass: 'bg-emerald-50 text-emerald-600',
      value: `${summary.online} Online`,
      caption: 'Responding successfully'
    },
    {
      icon: 'warning',
      iconClass: 'bg-amber-50 text-amber-600',
      value: `${summary.degraded} Degraded`,
      caption: 'High response latency detected'
    },
    {
      icon: 'error',
      iconClass: 'bg-red-50 text-red-600',
      value: `${summary.offline} Offline`,
      caption: 'Failed or unreachable'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {cards.map((card) => (
        <div key={card.value} className="bg-white border border-slate-200 p-4 flex items-center gap-4">
          <div className={`w-10 h-10 rounded flex items-center justify-center ${card.iconClass}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              {card.icon}
            </span>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">{card.value}</div>
            <div className="text-xs text-slate-500">{card.caption}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
