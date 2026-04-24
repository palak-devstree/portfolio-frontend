import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FlaskConical, ChevronDown } from 'lucide-react'
import type { LabExperimentResponse, LabStatus } from '../../../lib/types'

function statusColor(status: LabStatus): string {
  switch (status) {
    case 'completed':
      return '#2dd4bf'
    case 'testing':
      return '#6b51e0'
    case 'experimenting':
      return '#fb923c'
    default:
      return '#757584'
  }
}

interface LabCardProps {
  experiment: LabExperimentResponse
  index: number
}

function LabCard({ experiment, index }: LabCardProps) {
  const [open, setOpen] = useState(false)
  const color = statusColor(experiment.status)
  const hasFindings = Boolean(experiment.findings)

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-lg p-5 transition-all duration-200"
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
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4" style={{ color: '#6b51e0' }} />
          <h3
            className="font-mono"
            style={{
              fontSize: '15px',
              color: '#e2e2e8',
              letterSpacing: '-0.01em',
            }}
          >
            {experiment.title}
          </h3>
        </div>
        <span
          className="px-2 py-0.5 rounded font-mono uppercase tracking-[0.15em] flex-shrink-0"
          style={{
            fontSize: '9px',
            color,
            border: `1px solid ${color}`,
            backgroundColor: 'rgba(107,81,224,0.06)',
          }}
        >
          [{experiment.status}]
        </span>
      </div>

      <p
        className="mb-4"
        style={{ color: '#9d9db0', fontSize: '13px', lineHeight: 1.6 }}
      >
        {experiment.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {experiment.stack.map((tech) => (
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

      {hasFindings && (
        <>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-3 py-2 rounded font-mono transition-colors"
            style={{
              fontSize: '11px',
              backgroundColor: '#0b0b0f',
              border: '1px solid #1f1f28',
              color: '#e2e2e8',
            }}
            aria-expanded={open}
          >
            <span className="uppercase tracking-[0.18em]">
              {open ? '// hide results' : '// show results'}
            </span>
            <ChevronDown
              className="w-3.5 h-3.5 transition-transform"
              style={{
                color: '#6b51e0',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="findings"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  className="mt-2 rounded p-3 font-mono"
                  style={{
                    fontSize: '12px',
                    backgroundColor: '#0b0b0f',
                    border: '1px solid #1f1f28',
                    color: '#b8b8c4',
                    lineHeight: 1.6,
                  }}
                >
                  <div
                    className="mb-1.5 uppercase tracking-[0.18em]"
                    style={{ color: '#2dd4bf', fontSize: '10px' }}
                  >
                    ── findings
                  </div>
                  {experiment.findings}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.article>
  )
}

interface LabSectionProps {
  experiments: LabExperimentResponse[]
}

export function LabSection({ experiments }: LabSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {experiments.map((exp, i) => (
        <LabCard key={exp.id} experiment={exp} index={i} />
      ))}
    </div>
  )
}
