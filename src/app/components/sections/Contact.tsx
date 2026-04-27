import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  AlertCircle,
  CheckCircle2,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from 'lucide-react'
import { contactAPI } from '../../../lib/api'
import type { ProfileResponse } from '../../../lib/types'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'

interface ContactSectionProps {
  profile: ProfileResponse
}

export function ContactSection({ profile }: ContactSectionProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')
    try {
      await contactAPI.send(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      const msg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Failed to send message. Please try again.'
      setErrorMessage(msg)
    }
  }

  const contactLinks: { Icon: typeof Mail; label: string; value: string; href?: string }[] = []
  if (profile.email)
    contactLinks.push({
      Icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    })
  if (profile.phone)
    contactLinks.push({
      Icon: Phone,
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s+/g, '')}`,
    })
  if (profile.location)
    contactLinks.push({ Icon: MapPin, label: 'Location', value: profile.location })

  const socialLinks: { Icon: typeof Github; label: string; href: string }[] = []
  if (profile.github_url)
    socialLinks.push({ Icon: Github, label: 'GitHub', href: profile.github_url })
  if (profile.linkedin_url)
    socialLinks.push({
      Icon: Linkedin,
      label: 'LinkedIn',
      href: profile.linkedin_url,
    })
  if (profile.twitter_url)
    socialLinks.push({
      Icon: Twitter,
      label: 'Twitter',
      href: profile.twitter_url,
    })
  if (profile.website_url)
    socialLinks.push({ Icon: Globe, label: 'Website', href: profile.website_url })

  const inputStyle: React.CSSProperties = {
    fontSize: '13px',
    backgroundColor: '#0b0b0f',
    border: '1px solid #1f1f28',
    color: '#e2e2e8',
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {/* Left: contact info */}
      <div className="lg:col-span-2 space-y-4">
        <div
          className="rounded-lg p-6"
          style={{
            backgroundColor: '#14141c',
            border: '1px solid #1f1f28',
          }}
        >
          <div
            className="font-mono uppercase tracking-[0.2em] mb-4"
            style={{ fontSize: '10px', color: '#757584' }}
          >
            ── reach me
          </div>

          <div className="space-y-3 mb-6">
            {contactLinks.map(({ Icon, label, value, href }) => {
              const content = (
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: '#0b0b0f',
                      border: '1px solid #1f1f28',
                      color: '#6b51e0',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="font-mono uppercase tracking-[0.18em]"
                      style={{ fontSize: '9px', color: '#757584' }}
                    >
                      {label}
                    </div>
                    <div
                      className="font-mono truncate"
                      style={{ fontSize: '13px', color: '#e2e2e8' }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              )
              return href ? (
                <a
                  key={label}
                  href={href}
                  className="block rounded transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0b0b0f'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                  style={{ padding: '6px', margin: '-6px' }}
                >
                  {content}
                </a>
              ) : (
                <div key={label} style={{ padding: '6px', margin: '-6px' }}>
                  {content}
                </div>
              )
            })}
          </div>

          {socialLinks.length > 0 && (
            <>
              <div
                className="font-mono uppercase tracking-[0.2em] mb-3"
                style={{ fontSize: '10px', color: '#757584' }}
              >
                ── elsewhere
              </div>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded flex items-center justify-center transition-all"
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
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Signal card */}
        <div
          className="rounded-lg p-5 font-mono"
          style={{
            backgroundColor: '#14141c',
            border: '1px solid #1f1f28',
            fontSize: '12px',
            color: '#9d9db0',
            lineHeight: 1.7,
          }}
        >
          <div style={{ color: '#6b51e0' }}>// signal</div>
          <div className="mt-1">
            Best for full-stack backend roles, AI infrastructure collaborations,
            and deep-dive technical reviews.
          </div>
        </div>
      </div>

      {/* Right: form */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-3 rounded-lg p-6 space-y-4 relative overflow-hidden"
        style={{
          backgroundColor: '#14141c',
          border: '1px solid #1f1f28',
        }}
      >
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(107,81,224,0.5), transparent)',
          }}
        />

        <div
          className="font-mono uppercase tracking-[0.2em]"
          style={{ fontSize: '10px', color: '#757584' }}
        >
          ── POST /api/v1/contact
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contact-name"
              className="font-mono uppercase tracking-[0.18em] block mb-1.5"
              style={{ fontSize: '10px', color: '#757584' }}
            >
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              maxLength={255}
              value={form.name}
              onChange={handleChange}
              disabled={status === 'sending'}
              placeholder="ada.lovelace"
              className="w-full px-3 py-2.5 rounded font-mono outline-none transition-all"
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#6b51e0'
                e.currentTarget.style.boxShadow =
                  '0 0 0 3px rgba(107,81,224,0.15)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#1f1f28'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="font-mono uppercase tracking-[0.18em] block mb-1.5"
              style={{ fontSize: '10px', color: '#757584' }}
            >
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              disabled={status === 'sending'}
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 rounded font-mono outline-none transition-all"
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#6b51e0'
                e.currentTarget.style.boxShadow =
                  '0 0 0 3px rgba(107,81,224,0.15)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#1f1f28'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="font-mono uppercase tracking-[0.18em] block mb-1.5"
            style={{ fontSize: '10px', color: '#757584' }}
          >
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            maxLength={500}
            value={form.subject}
            onChange={handleChange}
            disabled={status === 'sending'}
            placeholder="Let's build something"
            className="w-full px-3 py-2.5 rounded font-mono outline-none transition-all"
            style={inputStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#6b51e0'
              e.currentTarget.style.boxShadow =
                '0 0 0 3px rgba(107,81,224,0.15)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#1f1f28'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="font-mono uppercase tracking-[0.18em] block mb-1.5"
            style={{ fontSize: '10px', color: '#757584' }}
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={6}
            value={form.message}
            onChange={handleChange}
            disabled={status === 'sending'}
            placeholder="What are you building? What's broken? I'll reply within a few days."
            className="w-full px-3 py-2.5 rounded font-mono outline-none resize-y transition-all"
            style={{ ...inputStyle, lineHeight: 1.6 }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#6b51e0'
              e.currentTarget.style.boxShadow =
                '0 0 0 3px rgba(107,81,224,0.15)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#1f1f28'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
          <div
            className="mt-1.5 font-mono text-right"
            style={{ fontSize: '10px', color: '#4a4a58' }}
          >
            {form.message.length} / 5000
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="inline-flex items-center gap-2 font-mono"
                style={{ fontSize: '12px', color: '#2dd4bf' }}
              >
                <CheckCircle2 className="w-4 h-4" />
                Message sent. I&apos;ll get back to you soon.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="inline-flex items-center gap-2 font-mono"
                style={{ fontSize: '12px', color: '#fb923c' }}
              >
                <AlertCircle className="w-4 h-4" />
                {errorMessage || 'Something went wrong. Please try again.'}
              </motion.div>
            )}
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono"
                style={{ fontSize: '11px', color: '#4a4a58' }}
              >
                // {profile.contact_response_note || 'responses usually within 72h'}
              </motion.div>
            )}
            {status === 'sending' && (
              <motion.div
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono"
                style={{ fontSize: '12px', color: '#6b51e0' }}
              >
                sending message...
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              fontSize: '13px',
              backgroundColor: '#6b51e0',
              color: '#ffffff',
              boxShadow: '0 0 20px rgba(107,81,224,0.35)',
            }}
          >
            <Send className="w-4 h-4" />
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  )
}
