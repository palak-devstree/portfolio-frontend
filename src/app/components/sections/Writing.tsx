import { motion } from 'motion/react'
import { Clock, Eye, ArrowUpRight } from 'lucide-react'
import type { BlogPostResponse } from '../../../lib/types'

function formatDate(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

interface WritingSectionProps {
  posts: BlogPostResponse[]
}

export function WritingSection({ posts }: WritingSectionProps) {
  const published = posts.filter((p) => p.is_published)

  if (published.length === 0) {
    return (
      <div
        className="rounded-lg p-8 text-center font-mono"
        style={{
          backgroundColor: '#14141c',
          border: '1px solid #1f1f28',
          color: '#757584',
          fontSize: '13px',
        }}
      >
        // no published posts yet
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {published.map((post, i) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{
            duration: 0.5,
            delay: Math.min(i * 0.06, 0.4),
            ease: [0.22, 1, 0.36, 1],
          }}
          className="rounded-lg p-5 cursor-pointer transition-all duration-200 group"
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
          <div
            className="flex items-center gap-3 mb-3 font-mono"
            style={{ fontSize: '11px', color: '#757584' }}
          >
            <span>{formatDate(post.published_date)}</span>
            <span style={{ color: '#4a4a58' }}>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.read_time_minutes} min read
            </span>
            {post.views_count > 0 && (
              <>
                <span style={{ color: '#4a4a58' }}>·</span>
                <span className="inline-flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {post.views_count.toLocaleString()}
                </span>
              </>
            )}
          </div>

          <div className="flex items-start justify-between gap-3 mb-2">
            <h3
              className="font-mono"
              style={{
                fontSize: '17px',
                color: '#e2e2e8',
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}
            >
              {post.title}
            </h3>
            <ArrowUpRight
              className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: '#6b51e0' }}
            />
          </div>

          <p
            className="mb-4 leading-relaxed"
            style={{ fontSize: '13px', color: '#9d9db0' }}
          >
            {post.preview}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded font-mono"
                style={{
                  fontSize: '10px',
                  backgroundColor: '#0b0b0f',
                  border: '1px solid #1f1f28',
                  color: '#6b51e0',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  )
}
