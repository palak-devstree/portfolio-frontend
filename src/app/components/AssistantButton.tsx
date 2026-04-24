import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Sparkles, X, ArrowUp, RefreshCcw, BrainCircuit } from 'lucide-react'
import { chatbotAPI } from '../../lib/api'

interface Message {
  role: 'user' | 'assistant'
  content: string
  ts: number
}

const SUGGESTIONS = [
  'What does your AI stack look like?',
  'Walk me through your inference gateway',
  'How do you evaluate LLM features?',
  'Which projects are you proudest of?',
]

/* Three bouncing dots — used as "thinking" indicator. */
function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: '#8b6df5' }}
          animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </span>
  )
}

export function AssistantButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setSessionId(crypto.randomUUID())
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, loading])

  useEffect(() => {
    if (isOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 120)
      return () => window.clearTimeout(t)
    }
  }, [isOpen])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    setInput('')
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: trimmed, ts: Date.now() },
    ])
    setLoading(true)
    try {
      const res = await chatbotAPI.query(trimmed, sessionId)
      const msg: string =
        (res.data && (res.data.message || res.data.response)) ??
        'Hmm, I did not get a response.'
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: msg, ts: Date.now() },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'My backend connection timed out. Drop Alex a message via the Contact section and he will reply directly.',
          ts: Date.now(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setMessages([])
    setSessionId(crypto.randomUUID())
  }

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 flex items-center justify-center cursor-pointer"
        style={{
          width: 56,
          height: 56,
          borderRadius: 9999,
          background:
            'linear-gradient(135deg, #6b51e0 0%, #8b6df5 50%, #a78bfa 100%)',
          boxShadow:
            '0 0 0 1px rgba(139,109,245,0.5), 0 10px 40px rgba(107,81,224,0.5)',
          zIndex: 9999,
          border: 'none',
        }}
        type="button"
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        {/* Pulse ring */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: '0 0 0 0 rgba(139, 109, 245, 0.6)',
            animation: 'v0-assist-pulse 2.2s ease-out infinite',
          }}
        />
        <style>{`
          @keyframes v0-assist-pulse {
            0%   { box-shadow: 0 0 0 0 rgba(139,109,245,0.45); }
            70%  { box-shadow: 0 0 0 18px rgba(139,109,245,0); }
            100% { box-shadow: 0 0 0 0 rgba(139,109,245,0); }
          }
          @keyframes v0-msg-in {
            from { opacity: 0; transform: translateY(6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative"
            >
              <X className="w-6 h-6" style={{ color: '#ffffff' }} />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative"
            >
              <Sparkles className="w-6 h-6" style={{ color: '#ffffff' }} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 flex flex-col overflow-hidden"
            style={{
              width: 'min(400px, calc(100vw - 32px))',
              height: 'min(560px, calc(100vh - 140px))',
              backgroundColor: '#0d0d14',
              border: '1px solid #1f1f28',
              borderRadius: 14,
              boxShadow:
                '0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(139,109,245,0.08), 0 0 40px rgba(107,81,224,0.12)',
              zIndex: 9998,
            }}
          >
            {/* Header */}
            <div
              className="relative flex items-center justify-between px-4 py-3"
              style={{
                borderBottom: '1px solid #1f1f28',
                background:
                  'linear-gradient(180deg, rgba(107,81,224,0.08), transparent)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="relative flex items-center justify-center rounded-md"
                  style={{
                    width: 34,
                    height: 34,
                    background:
                      'linear-gradient(135deg, rgba(107,81,224,0.25), rgba(139,109,245,0.12))',
                    border: '1px solid rgba(139,109,245,0.35)',
                  }}
                >
                  <BrainCircuit
                    className="w-4 h-4"
                    style={{ color: '#a78bfa' }}
                  />
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: '#2dd4bf',
                      boxShadow: '0 0 0 2px #0d0d14',
                    }}
                  />
                </div>
                <div className="leading-tight">
                  <div
                    className="font-mono"
                    style={{ fontSize: 13, color: '#e2e2e8' }}
                  >
                    alex.ai
                  </div>
                  <div
                    className="font-mono"
                    style={{ fontSize: 10, color: '#757584' }}
                  >
                    portfolio concierge · online
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={reset}
                    type="button"
                    aria-label="Reset conversation"
                    className="p-1.5 rounded cursor-pointer transition-colors"
                    style={{ color: '#757584' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#e2e2e8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#757584')}
                  >
                    <RefreshCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  aria-label="Close assistant"
                  className="p-1.5 rounded cursor-pointer transition-colors"
                  style={{ color: '#757584' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#e2e2e8')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#757584')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.length === 0 && !loading ? (
                <div className="flex flex-col gap-5">
                  {/* Greeting card */}
                  <div
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: '#14141c',
                      border: '1px solid #1f1f28',
                    }}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <Sparkles
                        className="w-4 h-4 mt-0.5"
                        style={{ color: '#a78bfa' }}
                      />
                      <div
                        className="font-mono"
                        style={{ fontSize: 13, color: '#e2e2e8' }}
                      >
                        Hi, I&apos;m Alex&apos;s AI concierge.
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: '#9d9db0',
                        lineHeight: 1.55,
                      }}
                    >
                      Ask me about projects, system designs, the AI stack, or how
                      Alex thinks about shipping ML systems to production.
                    </p>
                  </div>

                  <div>
                    <div
                      className="font-mono uppercase tracking-[0.2em] mb-2"
                      style={{ fontSize: 10, color: '#4a4a58' }}
                    >
                      Try asking
                    </div>
                    <div className="flex flex-col gap-2">
                      {SUGGESTIONS.map((s, i) => (
                        <motion.button
                          key={s}
                          onClick={() => send(s)}
                          disabled={loading}
                          type="button"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * i, duration: 0.25 }}
                          className="text-left px-3 py-2 rounded font-mono cursor-pointer transition-all disabled:opacity-50"
                          style={{
                            fontSize: 12.5,
                            backgroundColor: '#14141c',
                            border: '1px solid #1f1f28',
                            color: '#c9c7d9',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                              'rgba(139,109,245,0.5)'
                            e.currentTarget.style.color = '#e2e2e8'
                            e.currentTarget.style.boxShadow =
                              '0 0 14px rgba(107,81,224,0.18)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#1f1f28'
                            e.currentTarget.style.color = '#c9c7d9'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          <span style={{ color: '#8b6df5' }}>› </span>
                          {s}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {messages.map((m, i) => (
                    <div
                      key={`${m.ts}-${i}`}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      style={{ animation: 'v0-msg-in 0.25s ease-out' }}
                    >
                      <div
                        className="font-mono whitespace-pre-wrap"
                        style={{
                          maxWidth: '85%',
                          padding: '8px 12px',
                          borderRadius: 10,
                          fontSize: 13,
                          lineHeight: 1.5,
                          background:
                            m.role === 'user'
                              ? 'linear-gradient(135deg, #6b51e0, #7c5df0)'
                              : '#14141c',
                          color: m.role === 'user' ? '#ffffff' : '#e2e2e8',
                          border:
                            m.role === 'user'
                              ? '1px solid rgba(139,109,245,0.5)'
                              : '1px solid #1f1f28',
                          boxShadow:
                            m.role === 'user'
                              ? '0 6px 20px rgba(107,81,224,0.25)'
                              : 'none',
                        }}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div
                        className="flex items-center gap-2 px-3 py-2 rounded-lg"
                        style={{
                          backgroundColor: '#14141c',
                          border: '1px solid #1f1f28',
                        }}
                      >
                        <TypingDots />
                        <span
                          className="font-mono"
                          style={{ fontSize: 11, color: '#757584' }}
                        >
                          thinking
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Composer */}
            <div
              className="p-3"
              style={{ borderTop: '1px solid #1f1f28' }}
            >
              <div
                className="flex items-end gap-2 rounded-lg p-2 transition-all"
                style={{
                  backgroundColor: '#14141c',
                  border: '1px solid #1f1f28',
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  disabled={loading}
                  rows={1}
                  placeholder="Ask about the stack, projects, or hiring…"
                  className="flex-1 resize-none bg-transparent outline-none font-mono"
                  style={{
                    color: '#e2e2e8',
                    fontSize: 13,
                    maxHeight: 120,
                    minHeight: 22,
                    lineHeight: 1.45,
                  }}
                  onFocus={(e) =>
                    ((e.currentTarget.parentElement as HTMLElement).style.borderColor =
                      'rgba(139,109,245,0.55)')
                  }
                  onBlur={(e) =>
                    ((e.currentTarget.parentElement as HTMLElement).style.borderColor =
                      '#1f1f28')
                  }
                />
                <button
                  onClick={() => send(input)}
                  disabled={loading || !input.trim()}
                  type="button"
                  aria-label="Send message"
                  className="flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background:
                      'linear-gradient(135deg, #6b51e0, #8b6df5)',
                    color: '#ffffff',
                    boxShadow: '0 4px 14px rgba(107,81,224,0.35)',
                    border: 'none',
                  }}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
              <div
                className="flex items-center justify-between mt-2 px-1 font-mono"
                style={{ fontSize: 10, color: '#4a4a58' }}
              >
                <span>Enter to send · Shift + Enter for newline</span>
                <span className="inline-flex items-center gap-1">
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: '#2dd4bf' }}
                  />
                  responses grounded in the portfolio
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
