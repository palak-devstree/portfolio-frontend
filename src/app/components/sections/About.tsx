import { Compass, Hammer, Sparkles, Terminal } from 'lucide-react'
import { Reveal } from '../Reveal'
import type { ProfileResponse } from '../../../lib/types'

interface AboutSectionProps {
  profile: ProfileResponse
}

export function AboutSection({ profile }: AboutSectionProps) {
  const focusColumns = [
    {
      title: profile.heading_learning || 'Currently Learning',
      items: profile.current_learning,
      icon: <Compass className="w-4 h-4" />,
      accent: '#6b51e0',
    },
    {
      title: profile.heading_building || 'Currently Building',
      items: profile.current_building,
      icon: <Hammer className="w-4 h-4" />,
      accent: '#2dd4bf',
    },
    {
      title: profile.heading_exploring || 'Currently Exploring',
      items: profile.current_exploring,
      icon: <Sparkles className="w-4 h-4" />,
      accent: '#fb923c',
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {/* Summary card — terminal cat */}
      <Reveal className="lg:col-span-3">
        <div
          className="rounded-lg overflow-hidden h-full flex flex-col"
          style={{
            backgroundColor: '#0b0b0f',
            border: '1px solid #1f1f28',
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-2"
            style={{
              backgroundColor: '#111118',
              borderBottom: '1px solid #1f1f28',
            }}
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" style={{ color: '#6b51e0' }} />
              <span
                className="font-mono uppercase tracking-[0.2em]"
                style={{ fontSize: '10px', color: '#757584' }}
              >
                ~/about/summary.md
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#fb923c' }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2dd4bf' }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#6b51e0' }} />
            </div>
          </div>

          <div className="p-5 font-mono flex-1" style={{ fontSize: '13px', lineHeight: 1.7 }}>
            <div style={{ color: '#757584' }}>
              <span style={{ color: '#6b51e0' }}>$</span> cat about.md
            </div>
            <div style={{ color: '#e2e2e8', marginTop: 10 }}>
              # {profile.full_name}
            </div>
            <div style={{ color: '#757584', marginTop: 4 }}>
              _{profile.job_title} · {profile.years_of_experience}+ years_
            </div>

            <div style={{ color: '#b8b8c4', marginTop: 14, whiteSpace: 'pre-wrap' }}>
              {profile.professional_summary}
            </div>

            <div
              style={{ color: '#757584', marginTop: 18 }}
            >
              <span style={{ color: '#6b51e0' }}>$</span> ls skills/
            </div>
            {profile.skills.map((cat) => (
              <div key={cat.category} className="mt-3">
                <div
                  className="font-mono mb-1.5"
                  style={{ fontSize: '10px', color: '#6b51e0', textTransform: 'uppercase', letterSpacing: '0.15em' }}
                >
                  {cat.category}/
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded"
                      style={{
                        fontSize: '11px',
                        backgroundColor: '#14141c',
                        border: '1px solid #1f1f28',
                        color: '#b8b8c4',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Current focus column */}
      <Reveal className="lg:col-span-2" delay={0.1}>
        <div className="space-y-4 h-full flex flex-col">
          {focusColumns.map((col) => (
            <div
              key={col.title}
              className="rounded-lg p-5 flex-1"
              style={{
                backgroundColor: '#14141c',
                border: '1px solid #1f1f28',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: col.accent }}>{col.icon}</span>
                <span
                  className="font-mono uppercase tracking-[0.2em]"
                  style={{ fontSize: '10px', color: '#757584' }}
                >
                  {col.title}
                </span>
              </div>
              <ul className="space-y-1.5">
                {col.items.map((item, i) => (
                  <li
                    key={i}
                    className="font-mono flex gap-2"
                    style={{ fontSize: '12px', color: '#b8b8c4', lineHeight: 1.6 }}
                  >
                    <span style={{ color: col.accent }}>▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
