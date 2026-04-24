import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  MapPin,
  ArrowRight,
  Cpu,
  Zap,
  Activity,
} from 'lucide-react'
import type { ProfileResponse } from '../../../lib/types'
import Avatar3DThree from '../Avatar3DThree'

interface HeroProps {
  profile: ProfileResponse
}

/* Typewriter that cycles through a list of lines. */
function useCyclingTypewriter(
  lines: string[],
  {
    typeSpeedMs = 28,
    pauseMs = 2200,
    startDelay = 400,
  }: { typeSpeedMs?: number; pauseMs?: number; startDelay?: number } = {},
) {
  const [out, setOut] = useState('')
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    if (lines.length === 0) return
    const line = lines[lineIdx % lines.length]
    let i = 0
    setOut('')
    const start = window.setTimeout(() => {
      const tick = window.setInterval(() => {
        i += 1
        setOut(line.slice(0, i))
        if (i >= line.length) {
          window.clearInterval(tick)
          window.setTimeout(
            () => setLineIdx((n) => (n + 1) % lines.length),
            pauseMs,
          )
        }
      }, typeSpeedMs)
      return () => window.clearInterval(tick)
    }, startDelay)
    return () => window.clearTimeout(start)
  }, [lineIdx, lines, pauseMs, typeSpeedMs, startDelay])

  return out
}

/* Thin caret with smooth blink — uses em units so it scales with its container font. */
function BlockCursor({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const width = size === 'lg' ? '0.08em' : size === 'sm' ? '0.12em' : '0.1em'
  const height = size === 'lg' ? '0.9em' : size === 'sm' ? '1em' : '1em'
  const margin = size === 'lg' ? '0.1em' : '0.06em'
  return (
    <span
      aria-hidden
      className="inline-block align-[-0.12em] rounded-[1px]"
      style={{
        width,
        height,
        marginLeft: margin,
        background:
          'linear-gradient(180deg, #a78bfa 0%, #6b51e0 100%)',
        boxShadow: '0 0 14px rgba(139, 109, 245, 0.65)',
        animation: 'v0-cursor-blink 1.05s steps(2, start) infinite',
      }}
    />
  )
}

/* Magnetic hover wrapper — adds subtle pull toward cursor. */
function Magnetic({
  children,
  strength = 14,
}: {
  children: React.ReactNode
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 200, damping: 18 })
  const y = useSpring(my, { stiffness: 200, damping: 18 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const relX = e.clientX - (r.left + r.width / 2)
    const relY = e.clientY - (r.top + r.height / 2)
    mx.set((relX / r.width) * strength)
    my.set((relY / r.height) * strength)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y, display: 'inline-flex' }}
    >
      {children}
    </motion.div>
  )
}

/* Live AI metrics — values drift to feel "live" without real data. */
function useLiveMetric(
  base: number,
  amplitude: number,
  intervalMs = 1600,
  decimals = 0,
) {
  const [v, setV] = useState(base)
  useEffect(() => {
    const id = window.setInterval(() => {
      const delta = (Math.random() * 2 - 1) * amplitude
      setV(Math.max(0, base + delta))
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [base, amplitude, intervalMs])
  return decimals === 0 ? Math.round(v) : Number(v.toFixed(decimals))
}

function LiveMetric({
  label,
  value,
  unit,
  Icon,
}: {
  label: string
  value: number | string
  unit?: string
  Icon: typeof Cpu
}) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded"
      style={{
        backgroundColor: '#0f0f17',
        border: '1px solid #1f1f28',
      }}
    >
      <Icon className="w-3.5 h-3.5" style={{ color: '#8b6df5' }} />
      <div className="flex flex-col leading-tight">
        <span
          className="font-mono uppercase tracking-[0.18em]"
          style={{ fontSize: '9px', color: '#757584' }}
        >
          {label}
        </span>
        <span
          className="font-mono"
          style={{ fontSize: '13px', color: '#e2e2e8' }}
        >
          {value}
          {unit && (
            <span style={{ color: '#757584', marginLeft: '3px' }}>{unit}</span>
          )}
        </span>
      </div>
    </div>
  )
}

/* Animated gradient orb. */
function Orb({
  className,
  color,
  size = 420,
  delay = 0,
}: {
  className?: string
  color: string
  size?: number
  delay?: number
}) {
  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full pointer-events-none blur-3xl ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        background: color,
        mixBlendMode: 'screen',
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.55, 0.8, 0.55],
        x: [0, 20, -10, 0],
        y: [0, -15, 10, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

export function Hero({ profile }: HeroProps) {
  const taglines = [
    profile.tagline,
    'Serving LLMs at scale — continuous batching, paged attention, quantized weights.',
    'Hybrid retrieval over vector + keyword. Evals that actually track product quality.',
    'From whiteboard sketch to 3AM pager — I ship the whole pipeline.',
  ]
  const typed = useCyclingTypewriter(taglines, {
    typeSpeedMs: 22,
    pauseMs: 2600,
    startDelay: 600,
  })

  // Live-feeling metrics
  const tokensPerSec = useLiveMetric(1820, 260)
  const p95 = useLiveMetric(74, 9)
  const qps = useLiveMetric(312, 40)
  const gpu = useLiveMetric(58, 12)

  // Mouse-parallax for the grid
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const gridX = useTransform(mx, [0, 1], [-8, 8])
  const gridY = useTransform(my, [0, 1], [-8, 8])
  const heroRef = useRef<HTMLElement>(null)
  const onMouse = (e: React.MouseEvent<HTMLElement>) => {
    const r = heroRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  const socials: { href: string; label: string; Icon: typeof Github }[] = []
  if (profile.github_url)
    socials.push({ href: profile.github_url, label: 'GitHub', Icon: Github })
  if (profile.linkedin_url)
    socials.push({ href: profile.linkedin_url, label: 'LinkedIn', Icon: Linkedin })
  if (profile.twitter_url)
    socials.push({ href: profile.twitter_url, label: 'Twitter', Icon: Twitter })
  if (profile.website_url)
    socials.push({ href: profile.website_url, label: 'Website', Icon: Globe })

  const marqueeStack = [...profile.skills, ...profile.skills]

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={onMouse}
      className="relative overflow-hidden"
    >
      {/* Keyframes (injected once via style tag) */}
      <style>{`
        @keyframes v0-cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes v0-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes v0-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>

      {/* Gradient orbs */}
      <Orb
        className="-top-32 -left-20"
        color="radial-gradient(circle, rgba(107,81,224,0.55), transparent 60%)"
        size={520}
      />
      <Orb
        className="top-20 right-0"
        color="radial-gradient(circle, rgba(45,212,191,0.35), transparent 60%)"
        size={420}
        delay={3}
      />
      <Orb
        className="bottom-0 left-1/3"
        color="radial-gradient(circle, rgba(236,72,153,0.22), transparent 60%)"
        size={460}
        delay={6}
      />

      {/* Dot grid with mouse parallax */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(139, 109, 245, 0.28) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 75% 65% at 50% 35%, black, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 65% at 50% 35%, black, transparent 78%)',
          x: gridX,
          y: gridY,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16">
        {/* Top rail: role badge + live inference indicator */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between gap-3 flex-wrap mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: 'rgba(107,81,224,0.08)',
              border: '1px solid rgba(107,81,224,0.28)',
            }}
          >
            <span
              className="relative flex w-2 h-2"
              aria-hidden
            >
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: '#8b6df5', opacity: 0.7 }}
              />
              <span
                className="relative w-2 h-2 rounded-full"
                style={{ backgroundColor: '#8b6df5' }}
              />
            </span>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: '10px',
                color: '#b8b8c4',
                letterSpacing: '0.22em',
              }}
            >
              AI · Backend · Infra
            </span>
          </div>

          <div
            className="hidden sm:inline-flex items-center gap-2 font-mono"
            style={{ fontSize: '11px', color: '#757584' }}
          >
            <span>inference.cluster.us-west-2</span>
            <span style={{ color: '#4a4a58' }}>·</span>
            <span style={{ color: '#2dd4bf' }}>healthy</span>
          </div>
        </motion.div>

        {/* Main Content: Profile Card Left, Details Right */}
        <div className="grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
          {/* Left Column: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative order-2 lg:order-1 lg:sticky lg:top-24"
          >
            {/* Ambient purple glow under the card */}
            <div
              aria-hidden
              className="absolute inset-x-4 -bottom-4 h-8 rounded-full blur-2xl pointer-events-none"
              style={{ background: 'rgba(107,81,224,0.55)' }}
            />
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                background:
                  'linear-gradient(160deg, #1a1328 0%, #130f22 55%, #0f0b1a 100%)',
                border: '1px solid rgba(139,109,245,0.28)',
                boxShadow:
                  '0 20px 60px -20px rgba(107,81,224,0.55), 0 0 0 1px rgba(139,109,245,0.06) inset',
              }}
            >
              {/* Subtle dotted texture inside card */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-[0.35]"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(139,109,245,0.18) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                  maskImage:
                    'radial-gradient(ellipse 80% 55% at 50% 30%, black, transparent 75%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 80% 55% at 50% 30%, black, transparent 75%)',
                }}
              />
              {/* Status chip */}
              <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2 py-1 rounded-full"
                style={{
                  backgroundColor: 'rgba(15,15,23,0.7)',
                  border: '1px solid rgba(45,212,191,0.25)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <span className="relative flex w-1.5 h-1.5">
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ backgroundColor: '#2dd4bf', opacity: 0.7 }}
                  />
                  <span
                    className="relative w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: '#2dd4bf' }}
                  />
                </span>
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: '9px',
                    color: '#2dd4bf',
                    letterSpacing: '0.2em',
                  }}
                >
                  online
                </span>
              </div>

              {/* 3D Avatar */}
              <div className="relative px-4 pt-4">
                <Avatar3DThree />
              </div>

              {/* Name + title + location */}
              <div className="relative px-5 pb-5 pt-1 text-center">
                <h1
                  className="font-mono"
                  style={{
                    fontSize: 'clamp(24px, 2.2vw, 32px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    marginBottom: '6px',
                    backgroundImage:
                      'linear-gradient(180deg, #ffffff 0%, #c9c7d9 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {profile.full_name}
                </h1>
                <p
                  className="font-mono"
                  style={{
                    fontSize: '13px',
                    color: '#b8b8c4',
                    marginBottom: profile.location ? '10px' : 0,
                  }}
                >
                  {profile.job_title}
                </p>
                {profile.location && (
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(107,81,224,0.12)',
                      border: '1px solid rgba(139,109,245,0.25)',
                    }}
                  >
                    <MapPin className="w-3 h-3" style={{ color: '#8b6df5' }} />
                    <span
                      className="font-mono"
                      style={{ fontSize: '11px', color: '#d1cfe2' }}
                    >
                      {profile.location}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Details */}
          <div className="order-1 lg:order-2">
            {/* Role line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-mono mb-4 flex items-center gap-3 flex-wrap"
              style={{ fontSize: '14px', color: '#9d9db0' }}
            >
              <span style={{ color: '#8b6df5' }}>&gt;</span>
              <span>{profile.job_title}</span>
              <span style={{ color: '#4a4a58' }}>·</span>
              <span>{profile.years_of_experience}+ yrs in production</span>
            </motion.div>

            {/* Hero headline */}
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-mono mb-4"
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#e2e2e8',
              }}
            >
              Building{' '}
              <span
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #8b6df5 0%, #2dd4bf 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                AI systems
              </span>{' '}
              that ship.
            </motion.h2>

            {/* Typewriter tagline */}
            <p
              className="mb-8 leading-relaxed min-h-[3.2em]"
              style={{ fontSize: '16px', color: '#b8b8c4' }}
            >
              {typed}
              <BlockCursor size="md" />
            </p>

            {/* Live AI metrics strip — the "engineer" vibe */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-2 gap-2 mb-8"
            >
              <LiveMetric
                label="Tokens / sec"
                value={tokensPerSec.toLocaleString()}
                Icon={Zap}
              />
              <LiveMetric label="p95 latency" value={p95} unit="ms" Icon={Activity} />
              <LiveMetric label="Queries / sec" value={qps} Icon={Activity} />
              <LiveMetric label="GPU util" value={gpu} unit="%" Icon={Cpu} />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex items-center gap-3 flex-wrap mb-8"
            >
              <Magnetic>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault()
                    document
                      .getElementById('projects')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded font-mono overflow-hidden group"
                  style={{
                    fontSize: '13px',
                    backgroundColor: '#6b51e0',
                    color: '#ffffff',
                    boxShadow: '0 0 28px rgba(107, 81, 224, 0.45)',
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background:
                        'linear-gradient(120deg, transparent, rgba(255,255,255,0.22), transparent)',
                    }}
                  />
                  <span className="relative">View Projects</span>
                  <ArrowRight className="w-4 h-4 relative transition-transform group-hover:translate-x-0.5" />
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    document
                      .getElementById('contact')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded font-mono transition-colors"
                  style={{
                    fontSize: '13px',
                    backgroundColor: 'transparent',
                    border: '1px solid #2a2a36',
                    color: '#e2e2e8',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = '#6b51e0')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = '#2a2a36')
                  }
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </Magnetic>

              {socials.length > 0 && (
                <div className="flex items-center gap-1.5 ml-1">
                  {socials.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: '#14141c',
                        border: '1px solid #1f1f28',
                        color: '#b8b8c4',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#6b51e0'
                        e.currentTarget.style.color = '#e2e2e8'
                        e.currentTarget.style.boxShadow =
                          '0 0 14px rgba(107, 81, 224, 0.3)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#1f1f28'
                        e.currentTarget.style.color = '#b8b8c4'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Stack marquee - Full Width Below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="relative mt-12"
        >
          <div
            className="font-mono uppercase tracking-[0.25em] mb-3"
            style={{ fontSize: '10px', color: '#4a4a58' }}
          >
            ── stack in rotation
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage:
                'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
            }}
          >
            <div
              className="flex gap-2 whitespace-nowrap w-max"
              style={{ animation: 'v0-marquee 38s linear infinite' }}
            >
              {marqueeStack.map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="inline-flex items-center px-2.5 py-1 rounded font-mono"
                  style={{
                    fontSize: '11px',
                    backgroundColor: '#14141c',
                    border: '1px solid #1f1f28',
                    color: '#b8b8c4',
                  }}
                >
                  <span style={{ color: '#6b51e0', marginRight: 4 }}>·</span>
                  {skill.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
