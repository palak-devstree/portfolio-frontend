import { Activity, Code, Eye, FileText, FlaskConical, Layers } from 'lucide-react'
import type { ReactNode } from 'react'
import { useCountUp } from '../../../lib/useCountUp'
import type { DashboardResponse, ProfileResponse } from '../../../lib/types'

interface StatCardProps {
  label: string
  target: number
  decimals?: number
  suffix?: string
  icon: ReactNode
}

function StatCard({ label, target, decimals = 0, suffix = '', icon }: StatCardProps) {
  const [value, setRef] = useCountUp(target, 1400, decimals)

  return (
    <div
      ref={setRef}
      className="rounded-lg p-5 transition-all duration-200 group"
      style={{
        backgroundColor: '#14141c',
        border: '1px solid #1f1f28',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#6b51e0'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 0 24px rgba(107,81,224,0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1f1f28'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="font-mono uppercase tracking-[0.18em]"
          style={{ fontSize: '10px', color: '#757584' }}
        >
          {label}
        </span>
        <div style={{ color: '#6b51e0' }}>{icon}</div>
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: '36px',
          color: '#e2e2e8',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {value}
        {suffix && (
          <span style={{ color: '#6b51e0', fontSize: '22px', marginLeft: 2 }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

interface StatsProps {
  dashboard: DashboardResponse
  profile: ProfileResponse
}

export function Stats({ dashboard, profile }: StatsProps) {
  const items = [
    {
      label: 'Years Shipped',
      target: profile.years_of_experience,
      suffix: '+',
      icon: <Activity className="w-4 h-4" />,
    },
    {
      label: 'Projects',
      target: dashboard.projects_count,
      icon: <Code className="w-4 h-4" />,
    },
    {
      label: 'System Designs',
      target: dashboard.system_designs_count,
      icon: <Layers className="w-4 h-4" />,
    },
    {
      label: 'Blog Posts',
      target: dashboard.blog_posts_count,
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: 'Experiments',
      target: dashboard.lab_experiments_count,
      icon: <FlaskConical className="w-4 h-4" />,
    },
    {
      label: 'Total Views',
      target: dashboard.total_views,
      icon: <Eye className="w-4 h-4" />,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  )
}
