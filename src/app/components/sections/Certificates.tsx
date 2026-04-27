import { motion } from 'motion/react'
import { Award, ExternalLink, Calendar } from 'lucide-react'
import type { CertificateResponse } from '../../../lib/types'

interface CertificateCardProps {
  certificate: CertificateResponse
  index: number
}

function CertificateCard({ certificate, index }: CertificateCardProps) {
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
        {certificate.image_url ? (
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{
              backgroundColor: '#0b0b0f',
              border: '1px solid #1f1f28',
            }}
          >
            <img
              src={certificate.image_url}
              alt={certificate.title}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: '#6b51e022',
              border: '1px solid #6b51e044',
            }}
          >
            <Award className="w-8 h-8" style={{ color: '#6b51e0' }} />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3
            className="font-mono mb-1"
            style={{
              fontSize: '16px',
              color: '#e2e2e8',
              letterSpacing: '-0.01em',
            }}
          >
            {certificate.title}
          </h3>
          <p
            className="font-medium mb-2"
            style={{
              fontSize: '14px',
              color: '#9d9db0',
            }}
          >
            {certificate.issuer}
          </p>

          {certificate.description && (
            <p
              className="mb-3"
              style={{
                color: '#9d9db0',
                fontSize: '13px',
                lineHeight: 1.6,
              }}
            >
              {certificate.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 mb-3" style={{ fontSize: '12px', color: '#757584' }}>
            {certificate.issue_date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Issued: {certificate.issue_date}
              </div>
            )}
            {certificate.expiry_date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Expires: {certificate.expiry_date}
              </div>
            )}
            {certificate.credential_id && (
              <span
                className="px-2 py-0.5 rounded font-mono"
                style={{
                  fontSize: '10px',
                  backgroundColor: '#0b0b0f',
                  border: '1px solid #1f1f28',
                  color: '#757584',
                }}
              >
                ID: {certificate.credential_id}
              </span>
            )}
          </div>

          {certificate.credential_url && (
            <a
              href={certificate.credential_url}
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
              verify credential
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

interface CertificatesSectionProps {
  certificates: CertificateResponse[]
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const sorted = [...certificates].sort((a, b) => a.display_order - b.display_order)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sorted.map((cert, i) => (
        <CertificateCard key={cert.id} certificate={cert} index={i} />
      ))}
    </div>
  )
}
