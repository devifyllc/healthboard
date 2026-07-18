'use client'

function formatTimestamp(timestamp: number | null): string {
  if (!timestamp) return 'Never'
  return new Date(timestamp).toLocaleTimeString()
}

export function Header({
  lastRefreshedAt,
  onRefresh
}: {
  lastRefreshedAt: number | null
  onRefresh: () => void
}) {
  return (
    <header className="h-14 flex justify-between items-center w-full px-6 bg-white border-b border-slate-200 sticky top-0 z-30">
      <h1 className="text-lg font-bold text-slate-900">Health Dashboard</h1>
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span>Last refreshed: {formatTimestamp(lastRefreshedAt)}</span>
        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded font-semibold hover:bg-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">refresh</span>
          Refresh Now
        </button>
      </div>
    </header>
  )
}
