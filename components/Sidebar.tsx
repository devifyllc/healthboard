import { EnvironmentConfig } from '@/lib/types'

const ENV_ICON: Record<EnvironmentConfig['name'], string> = {
  dev: 'code',
  stage: 'science',
  uat: 'gesture',
  preprod: 'factory',
  prod: 'rocket_launch'
}

export function Sidebar({ environments }: { environments: EnvironmentConfig[] }) {
  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col z-40 bg-slate-900 w-60">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-sky-400 flex items-center justify-center text-slate-900">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            hub
          </span>
        </div>
        <div>
          <h2 className="text-white font-semibold text-sm">Healthboard</h2>
          <p className="text-slate-400 text-[10px] uppercase tracking-wide">Health Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-1">
        {environments.map((env) => (
          <a
            key={env.name}
            href={`#${env.name}`}
            className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">{ENV_ICON[env.name]}</span>
            <span className="text-xs font-semibold uppercase tracking-wide">{env.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}
