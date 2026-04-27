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

interface HeroProps {
  profile: ProfileResponse
}

/* Stream a string one character at a time, then hold with cursor blinking. */
function useStreamText(text: string, { speedMs = 18, startDelay = 300 } = {}) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const timeout = window.setTimeout(() => {
      const interval = window.setInterval(() => {
        i += 1
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          window.clearInterval(interval)
          setDone(true)
        }
      }, speedMs)
      return () => window.clearInterval(interval)
    }, startDelay)
    return () => window.clearTimeout(timeout)
  }, [text, speedMs, startDelay])

  return { displayed, done }
}

/* Blinking cursor — only shown while streaming or after done */
function StreamCursor() {
  return (
    <>
      <style>{`
        @keyframes stream-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1.1em',
          marginLeft: '3px',
          verticalAlign: 'text-bottom',
          background: 'linear-gradient(180deg, #a78bfa 0%, #6b51e0 100%)',
          boxShadow: '0 0 8px rgba(139, 109, 245, 0.7)',
          borderRadius: '1px',
          animation: 'stream-blink 1s steps(2, start) infinite',
        }}
      />
    </>
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
  const { displayed, done } = useStreamText(profile.tagline, { speedMs: 18, startDelay: 350 })

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

  const flatSkills = profile.skills.flatMap((cat) => cat.skills)
  const marqueeStack = [...flatSkills, ...flatSkills]

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={onMouse}
      className="relative overflow-hidden"
    >
      {/* Keyframes (injected once via style tag) */}
      <style>{`
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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16">
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
              {profile.hero_badge || 'AI · Backend · Infra'}
            </span>
          </div>

          <div
            className="hidden sm:inline-flex items-center gap-2 font-mono"
            style={{ fontSize: '11px', color: '#757584' }}
          >
            <span>{profile.hero_cluster_label || 'inference.cluster.us-west-2'}</span>
            <span style={{ color: '#4a4a58' }}>·</span>
            <span style={{ color: '#2dd4bf' }}>healthy</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-mono"
          style={{
            fontSize: 'clamp(40px, 7vw, 78px)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            color: '#e2e2e8',
            marginBottom: '6px',
          }}
        >
          <span
            style={{
              backgroundImage:
                'linear-gradient(180deg, #ffffff 0%, #c9c7d9 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {profile.full_name}
          </span>
        </motion.h1>

        {/* Role line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-mono mb-6 flex items-center gap-3 flex-wrap"
          style={{ fontSize: '15px', color: '#9d9db0' }}
        >
          <span style={{ color: '#8b6df5' }}>&gt;</span>
          <span>{profile.job_title}</span>
          <span style={{ color: '#4a4a58' }}>·</span>
          <span>{profile.years_of_experience}+ yrs in production</span>
          {profile.location && (
            <>
              <span style={{ color: '#4a4a58' }}>·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" style={{ color: '#8b6df5' }} />
                {profile.location}
              </span>
            </>
          )}
        </motion.div>

        {/* Streaming tagline */}
        <p
          className="max-w-3xl mb-8 leading-relaxed"
          style={{ fontSize: '18px', color: '#b8b8c4' }}
        >
          {displayed}
          <StreamCursor />
        </p>

        {/* Live AI metrics strip — the "engineer" vibe */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 max-w-3xl"
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

        {/* Stack marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="relative"
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
