import { motion } from 'motion/react'
import { Briefcase, MapPin, ExternalLink } from 'lucide-react'
import type { ExperienceResponse } from '../../../lib/types'

interface ExperienceCardProps {
  experience: ExperienceResponse
  index: number
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-lg p-5 transition-all duration-200 group"
      style={{
        backgroundColor: '#14141c',
        border: '1px solid #1f1f28',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#6b51e0'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1f1f28'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: '#6b51e022',
            border: '1px solid #6b51e044',
          }}
        >
          <Briefcase className="w-6 h-6" style={{ color: '#6b51e0' }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <h3
                className="font-mono mb-1"
                style={{
                  fontSize: '16px',
                  color: '#e2e2e8',
                  letterSpacing: '-0.01em',
                }}
              >
                {experience.position}
              </h3>
              {experience.company_url ? (
                <a
                  href={experience.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium inline-flex items-center gap-1.5 hover:underline mb-1"
                  style={{
                    fontSize: '14px',
                    color: '#9d9db0',
                  }}
                >
                  {experience.company}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <p
                  className="font-medium mb-1"
                  style={{
                    fontSize: '14px',
                    color: '#9d9db0',
                  }}
                >
                  {experience.company}
                </p>
              )}
            </div>
            <span
              className="px-2 py-0.5 rounded font-mono uppercase tracking-[0.15em] flex-shrink-0"
              style={{
                fontSize: '9px',
                color: '#757584',
                border: '1px solid #1f1f28',
                backgroundColor: '#0b0b0f',
              }}
            >
              {experience.start_date} - {experience.end_date}
            </span>
          </div>

          {experience.location && (
            <div className="flex items-center gap-1.5 mb-3" style={{ color: '#757584', fontSize: '12px' }}>
              <MapPin className="w-3.5 h-3.5" />
              {experience.location}
            </div>
          )}

          {experience.description_points.length > 0 ? (
            <ul className="mb-4 space-y-1.5" style={{ color: '#9d9db0', fontSize: '13px', lineHeight: 1.6 }}>
              {experience.description_points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: '#6b51e0', marginTop: '0.35em' }}>•</span>
                  <span className="flex-1">{point}</span>
                </li>
              ))}
            </ul>
          ) : experience.description ? (
            <p className="mb-4" style={{ color: '#9d9db0', fontSize: '13px', lineHeight: 1.6 }}>
              {experience.description}
            </p>
          ) : null}

          {experience.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {experience.technologies.map((tech) => (
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
          )}

          {experience.project_urls.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {experience.project_urls.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 h-8 rounded font-mono transition-colors"
                  style={{
                    fontSize: '11px',
                    backgroundColor: '#0b0b0f',
                    border: '1px solid #1f1f28',
                    color: '#e2e2e8',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#6b51e0'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1f1f28'
                  }}
                >
                  <ExternalLink className="w-3 h-3" />
                  project {i + 1}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}

interface ExperienceSectionProps {
  experience: ExperienceResponse[]
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const sorted = [...experience].sort((a, b) => a.display_order - b.display_order)

  return (
    <div className="grid grid-cols-1 gap-4">
      {sorted.map((exp, i) => (
        <ExperienceCard key={exp.id} experience={exp} index={i} />
      ))}
    </div>
  )
}
