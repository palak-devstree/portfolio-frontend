interface SectionHeaderProps {
  index: string
  title: string
  subtitle?: string
}

export function SectionHeader({ index, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span
          className="font-mono uppercase tracking-[0.2em]"
          style={{ fontSize: '11px', color: '#6b51e0' }}
        >
          {index}
        </span>
        <div
          className="h-px flex-1"
          style={{
            background:
              'linear-gradient(90deg, rgba(107,81,224,0.4), rgba(107,81,224,0.05) 60%, transparent)',
          }}
        />
      </div>
      <div className="flex items-baseline gap-3 flex-wrap">
        <h2
          className="font-mono uppercase"
          style={{
            fontSize: '28px',
            color: '#e2e2e8',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <span
            className="font-mono"
            style={{ fontSize: '13px', color: '#757584' }}
          >
            // {subtitle}
          </span>
        )}
      </div>
    </div>
  )
}
