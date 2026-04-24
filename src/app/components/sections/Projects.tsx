import { motion } from 'motion/react'
import { ExternalLink, Github, GitFork, Sparkles, Star } from 'lucide-react'
import type { ProjectResponse, ProjectStatus } from '../../../lib/types'

function statusColor(status: ProjectStatus) {
  switch (status) {
    case 'done':
      return '#2dd4bf'
    case 'building':
      return '#6b51e0'
    case 'planned':
      return '#fb923c'
    case 'exploring':
      return '#fb923c'
    default:
      return '#757584'
  }
}

interface ProjectCardProps {
  project: ProjectResponse
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const color = statusColor(project.status)
  const featured = project.featured

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`rounded-lg p-5 transition-all duration-200 group relative flex flex-col ${
        featured ? 'md:col-span-2' : ''
      }`}
      style={{
        backgroundColor: featured ? '#16141f' : '#14141c',
        border: `1px solid ${featured ? 'rgba(107,81,224,0.35)' : '#1f1f28'}`,
        boxShadow: featured
          ? '0 0 28px rgba(107,81,224,0.12)'
          : 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#6b51e0'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 0 28px rgba(107,81,224,0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = featured
          ? 'rgba(107,81,224,0.35)'
          : '#1f1f28'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = featured
          ? '0 0 28px rgba(107,81,224,0.12)'
          : 'none'
      }}
    >
      {featured && (
        <div
          className="absolute -top-2.5 left-4 px-2 py-0.5 rounded font-mono uppercase tracking-[0.2em] flex items-center gap-1"
          style={{
            fontSize: '9px',
            backgroundColor: '#6b51e0',
            color: '#ffffff',
            boxShadow: '0 0 12px rgba(107,81,224,0.5)',
          }}
        >
          <Sparkles className="w-2.5 h-2.5" />
          Featured
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <h3
          className="font-mono"
          style={{
            fontSize: featured ? '20px' : '16px',
            color: '#e2e2e8',
            letterSpacing: '-0.01em',
          }}
        >
          {project.name}
        </h3>
        <span
          className="px-2 py-0.5 rounded font-mono uppercase tracking-[0.15em] flex-shrink-0"
          style={{
            fontSize: '9px',
            color,
            border: `1px solid ${color}`,
            backgroundColor: 'rgba(107, 81, 224, 0.06)',
          }}
        >
          [{project.status}]
        </span>
      </div>

      <p
        className="mb-4 flex-1"
        style={{
          color: '#9d9db0',
          fontSize: '13px',
          lineHeight: 1.6,
        }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map((tech) => (
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

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          {project.github_stars > 0 && (
            <span
              className="inline-flex items-center gap-1 font-mono"
              style={{ fontSize: '11px', color: '#757584' }}
            >
              <Star className="w-3 h-3" style={{ color: '#fb923c' }} />
              {project.github_stars.toLocaleString()}
            </span>
          )}
          {project.github_forks > 0 && (
            <span
              className="inline-flex items-center gap-1 font-mono"
              style={{ fontSize: '11px', color: '#757584' }}
            >
              <GitFork className="w-3 h-3" style={{ color: '#6b51e0' }} />
              {project.github_forks.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="w-8 h-8 rounded flex items-center justify-center transition-colors"
              style={{
                backgroundColor: '#0b0b0f',
                border: '1px solid #1f1f28',
                color: '#b8b8c4',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#6b51e0'
                e.currentTarget.style.color = '#e2e2e8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1f1f28'
                e.currentTarget.style.color = '#b8b8c4'
              }}
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {project.details_url && (
            <a
              href={project.details_url}
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
              details
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

interface ProjectsSectionProps {
  projects: ProjectResponse[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const sorted = [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return a.display_order - b.display_order
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sorted.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  )
}
