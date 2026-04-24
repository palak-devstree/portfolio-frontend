import { motion } from 'motion/react'
import { Network } from 'lucide-react'
import type { ComplexityLevel, SystemDesignResponse } from '../../../lib/types'

function complexityColor(level: ComplexityLevel): string {
  switch (level) {
    case 'beginner':
      return '#2dd4bf'
    case 'intermediate':
      return '#6b51e0'
    case 'advanced':
      return '#fb923c'
    default:
      return '#757584'
  }
}

interface SystemDesignsSectionProps {
  designs: SystemDesignResponse[]
}

export function SystemDesignsSection({ designs }: SystemDesignsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {designs.map((design, i) => {
        const color = complexityColor(design.complexity_level)
        return (
          <motion.article
            key={design.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{
              duration: 0.5,
              delay: Math.min(i * 0.06, 0.4),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-lg p-5 transition-all duration-200 flex flex-col"
            style={{
              backgroundColor: '#14141c',
              border: '1px solid #1f1f28',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#6b51e0'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow =
                '0 0 24px rgba(107,81,224,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1f1f28'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3
                className="font-mono"
                style={{
                  fontSize: '17px',
                  color: '#e2e2e8',
                  letterSpacing: '-0.01em',
                }}
              >
                {design.title}
              </h3>
              <span
                className="px-2 py-0.5 rounded font-mono uppercase tracking-[0.15em] flex-shrink-0"
                style={{
                  fontSize: '9px',
                  color,
                  border: `1px solid ${color}`,
                  backgroundColor: 'rgba(107,81,224,0.06)',
                }}
              >
                {design.complexity_level}
              </span>
            </div>

            <p
              className="mb-4"
              style={{
                color: '#9d9db0',
                fontSize: '13px',
                lineHeight: 1.6,
              }}
            >
              {design.description}
            </p>

            {/* Diagram or placeholder */}
            <div
              className="mb-4 rounded overflow-hidden flex items-center justify-center"
              style={{
                height: '140px',
                backgroundColor: '#0b0b0f',
                border: '1px solid #1f1f28',
              }}
            >
              {design.diagram_url ? (
                <img
                  src={design.diagram_url}
                  alt={`${design.title} architecture diagram`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <Network
                    className="w-10 h-10 mx-auto mb-1.5"
                    style={{ color: '#6b51e0', opacity: 0.45 }}
                  />
                  <span
                    className="font-mono"
                    style={{ fontSize: '10px', color: '#4a4a58' }}
                  >
                    /diagram placeholder
                  </span>
                </div>
              )}
            </div>

            <div className="mb-3">
              <div
                className="font-mono uppercase tracking-[0.18em] mb-2"
                style={{ fontSize: '10px', color: '#757584' }}
              >
                Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {design.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded font-mono"
                    style={{
                      fontSize: '10px',
                      backgroundColor: '#0b0b0f',
                      border: '1px solid #1f1f28',
                      color: '#9d9db0',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div
                className="font-mono uppercase tracking-[0.18em] mb-2"
                style={{ fontSize: '10px', color: '#757584' }}
              >
                Key Points
              </div>
              <ul className="space-y-1">
                {design.notes.map((note, j) => (
                  <li
                    key={j}
                    className="font-mono flex gap-2"
                    style={{
                      fontSize: '12px',
                      color: '#9d9db0',
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: '#6b51e0' }}>▸</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}
