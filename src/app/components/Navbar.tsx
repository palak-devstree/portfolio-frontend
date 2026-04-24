import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Terminal } from 'lucide-react'

export interface NavItem {
  id: string
  label: string
}

interface NavbarProps {
  items: NavItem[]
  brandName?: string
  resumeUrl?: string
}

export function Navbar({ items, brandName = 'portfolio.ops', resumeUrl }: NavbarProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    if (items.length === 0) return

    const sectionEls = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (sectionEls.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the entry whose top is closest to just under the nav.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      },
    )

    sectionEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    }
  }

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        backgroundColor: 'rgba(11, 11, 15, 0.72)',
        borderBottom: '1px solid #1f1f28',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <a
            href={`#${items[0]?.id ?? ''}`}
            onClick={(e) => items[0] && handleClick(e, items[0].id)}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{
                backgroundColor: '#14141c',
                border: '1px solid #1f1f28',
              }}
            >
              <Terminal className="w-4 h-4" style={{ color: '#6b51e0' }} />
            </div>
            <span
              className="font-mono"
              style={{ color: '#e2e2e8', fontSize: '14px' }}
            >
              {brandName}
            </span>
          </a>

          {/* Section links */}
          <div className="hidden md:flex items-center gap-1 relative">
            {items.map((item) => {
              const isActive = activeId === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className="relative px-3 py-2 rounded font-mono transition-colors"
                  style={{
                    fontSize: '12px',
                    color: isActive ? '#e2e2e8' : '#757584',
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded"
                      style={{
                        backgroundColor: 'rgba(107, 81, 224, 0.12)',
                        border: '1px solid rgba(107, 81, 224, 0.35)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 uppercase tracking-wider">
                    {item.label}
                  </span>
                </a>
              )
            })}
          </div>

          {/* Resume CTA (desktop) */}
          <div className="flex items-center gap-2">
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded font-mono transition-all"
                style={{
                  fontSize: '12px',
                  backgroundColor: '#6b51e0',
                  color: '#ffffff',
                  boxShadow: '0 0 16px rgba(107, 81, 224, 0.35)',
                }}
              >
                ./resume
              </a>
            )}
            <div
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded"
              style={{
                backgroundColor: '#14141c',
                border: '1px solid #1f1f28',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: '#2dd4bf' }}
              />
              <span
                className="font-mono uppercase"
                style={{ fontSize: '10px', color: '#757584', letterSpacing: '0.15em' }}
              >
                online
              </span>
            </div>
          </div>
        </div>

        {/* Mobile section links */}
        <div className="md:hidden overflow-x-auto pb-2 -mt-2">
          <div className="flex items-center gap-1 min-w-max">
            {items.map((item) => {
              const isActive = activeId === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className="px-2.5 py-1.5 rounded font-mono uppercase tracking-wider"
                  style={{
                    fontSize: '11px',
                    color: isActive ? '#e2e2e8' : '#757584',
                    backgroundColor: isActive ? 'rgba(107,81,224,0.12)' : 'transparent',
                    border: isActive
                      ? '1px solid rgba(107,81,224,0.35)'
                      : '1px solid transparent',
                  }}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
