import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  MapPin,
  ArrowRight,
  Download,
} from 'lucide-react'
import type { ProfileResponse } from '../../../lib/types'

interface HeroProps {
  profile: ProfileResponse
}

function useTypewriter(text: string, speedMs = 28, startDelay = 300) {
  const [out, setOut] = useState('')
  useEffect(() => {
    setOut('')
    let i = 0
    const startTimer = window.setTimeout(() => {
      const interval = window.setInterval(() => {
        i += 1
        setOut(text.slice(0, i))
        if (i >= text.length) window.clearInterval(interval)
      }, speedMs)
      return () => window.clearInterval(interval)
    }, startDelay)
    return () => window.clearTimeout(startTimer)
  }, [text, speedMs, startDelay])
  return out
}

export function Hero({ profile }: HeroProps) {
  const typedTagline = useTypewriter(profile.tagline, 20, 900)

  const socials: { href: string; label: string; Icon: typeof Github }[] = []
  if (profile.github_url) socials.push({ href: profile.github_url, label: 'GitHub', Icon: Github })
  if (profile.linkedin_url) socials.push({ href: profile.linkedin_url, label: 'LinkedIn', Icon: Linkedin })
  if (profile.twitter_url) socials.push({ href: profile.twitter_url, label: 'Twitter', Icon: Twitter })
  if (profile.website_url) socials.push({ href: profile.website_url, label: 'Website', Icon: Globe })

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: 'calc(100vh - 56px)' }}
    >
      {/* Radial spotlight */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(107, 81, 224, 0.22), transparent 70%)',
        }}
      />
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(107, 81, 224, 0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Status line */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-8"
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#2dd4bf' }}
          />
          <span
            className="font-mono uppercase"
            style={{
              fontSize: '11px',
              color: '#757584',
              letterSpacing: '0.22em',
            }}
          >
            System online // accepting interesting problems
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono"
          style={{
            fontSize: 'clamp(40px, 7vw, 76px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#e2e2e8',
            marginBottom: '8px',
          }}
        >
          {profile.full_name}
          <span
            className="inline-block align-[0.15em] ml-2 w-[0.45em] h-[0.9em] animate-pulse"
            style={{ backgroundColor: '#6b51e0' }}
            aria-hidden
          />
        </motion.h1>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="font-mono mb-8 flex items-center gap-3 flex-wrap"
          style={{ fontSize: '15px', color: '#9d9db0' }}
        >
          <span style={{ color: '#6b51e0' }}>&gt;</span>
          <span>{profile.job_title}</span>
          <span style={{ color: '#4a4a58' }}>·</span>
          <span>{profile.years_of_experience}+ yrs experience</span>
          {profile.location && (
            <>
              <span style={{ color: '#4a4a58' }}>·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" style={{ color: '#6b51e0' }} />
                {profile.location}
              </span>
            </>
          )}
        </motion.div>

        {/* Tagline (typewriter) */}
        <p
          className="max-w-3xl mb-10 leading-relaxed"
          style={{ fontSize: '18px', color: '#b8b8c4' }}
        >
          {typedTagline}
          <span
            className="inline-block w-[2px] h-[1.1em] align-[-0.15em] ml-1 animate-pulse"
            style={{ backgroundColor: '#6b51e0' }}
            aria-hidden
          />
        </p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex items-center gap-3 flex-wrap mb-10"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded font-mono transition-all"
            style={{
              fontSize: '13px',
              backgroundColor: '#6b51e0',
              color: '#ffffff',
              boxShadow: '0 0 24px rgba(107, 81, 224, 0.4)',
            }}
          >
            View Projects
            <ArrowRight className="w-4 h-4" />
          </a>

          {profile.resume_url && (
            <a
              href={profile.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded font-mono transition-all"
              style={{
                fontSize: '13px',
                backgroundColor: '#14141c',
                border: '1px solid #1f1f28',
                color: '#e2e2e8',
              }}
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          )}

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded font-mono transition-all"
            style={{
              fontSize: '13px',
              backgroundColor: 'transparent',
              border: '1px solid #1f1f28',
              color: '#e2e2e8',
            }}
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>
        </motion.div>

        {/* Socials */}
        {socials.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex items-center gap-2 mb-14"
          >
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
          </motion.div>
        )}

        {/* Tech stack strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <div
            className="font-mono uppercase tracking-[0.25em] mb-3"
            style={{ fontSize: '10px', color: '#4a4a58' }}
          >
            ── stack in rotation
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.slice(0, 14).map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded font-mono"
                style={{
                  fontSize: '11px',
                  backgroundColor: '#14141c',
                  border: '1px solid #1f1f28',
                  color: '#b8b8c4',
                }}
              >
                --{skill.toLowerCase().replace(/\s+/g, '-')}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
