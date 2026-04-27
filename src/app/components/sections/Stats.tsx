import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import {
  Activity,
  BrainCircuit,
  Eye,
  FileText,
  FlaskConical,
  Layers,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useCountUp } from '../../../lib/useCountUp'
import type { DashboardResponse, ProfileResponse } from '../../../lib/types'

interface StatCardProps {
  label: string
  target: number
  suffix?: string
  icon: ReactNode
  delay?: number
}

/* Fakes a live signal bar: random segments pulse. */
function Signal() {
  const [ticks, setTicks] = useState<number[]>(() =>
    Array.from({ length: 12 }, () => Math.random()),
  )
  useEffect(() => {
    const id = window.setInterval(() => {
      setTicks((prev) =>
        prev.map((v) => Math.max(0.15, Math.min(1, v + (Math.random() - 0.5) * 0.5))),
      )
    }, 600)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="flex items-end gap-[2px] h-3 mt-3">
      {ticks.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all duration-500"
          style={{
            height: `${Math.max(18, v * 100)}%`,
            backgroundColor: `rgba(139, 109, 245, ${0.25 + v * 0.55})`,
          }}
        />
      ))}
    </div>
  )
}

function StatCard({ label, target, suffix = '', icon, delay = 0 }: StatCardProps) {
  const [value, setRef] = useCountUp(target, 1400, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay }}
      ref={setRef as unknown as React.Ref<HTMLDivElement>}
      className="relative rounded-lg p-5 transition-all duration-200 group overflow-hidden"
      style={{
        backgroundColor: '#14141c',
        border: '1px solid #1f1f28',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#6b51e0'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 0 24px rgba(107,81,224,0.18)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1f1f28'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Top-right corner accent */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(107,81,224,0.28), transparent 70%)',
        }}
      />

      <div className="flex items-center justify-between mb-4 relative">
        <span
          className="font-mono uppercase tracking-[0.18em]"
          style={{ fontSize: '10px', color: '#757584' }}
        >
          {label}
        </span>
        <div style={{ color: '#8b6df5' }}>{icon}</div>
      </div>
      <div
        className="font-mono relative"
        style={{
          fontSize: '36px',
          color: '#e2e2e8',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {value}
        {suffix && (
          <span style={{ color: '#8b6df5', fontSize: '22px', marginLeft: 2 }}>
            {suffix}
          </span>
        )}
      </div>
      <Signal />
    </motion.div>
  )
}

interface StatsProps {
  dashboard: DashboardResponse
  profile: ProfileResponse
}

export function Stats({ dashboard, profile }: StatsProps) {
  const items = [
    {
      label: 'Years in prod',
      target: profile.years_of_experience,
      suffix: '+',
      icon: <Activity className="w-4 h-4" />,
    },
  ]

  // Only show stats for enabled sections
  if (profile.show_projects) {
    items.push({
      label: 'Projects',
      target: dashboard.projects_count,
      icon: <BrainCircuit className="w-4 h-4" />,
    })
  }

  if (profile.show_system_designs) {
    items.push({
      label: 'Architectures',
      target: dashboard.system_designs_count,
      icon: <Layers className="w-4 h-4" />,
    })
  }

  if (profile.show_blog) {
    items.push({
      label: 'Writeups',
      target: dashboard.blog_posts_count,
      icon: <FileText className="w-4 h-4" />,
    })
  }

  if (profile.show_lab) {
    items.push({
      label: 'Experiments',
      target: dashboard.lab_experiments_count,
      icon: <FlaskConical className="w-4 h-4" />,
    })
  }

  items.push({
    label: 'Views tracked',
    target: dashboard.total_views,
    icon: <Eye className="w-4 h-4" />,
  })

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {items.map((item, i) => (
        <StatCard key={item.label} {...item} delay={i * 0.06} />
      ))}
    </div>
  )
}
