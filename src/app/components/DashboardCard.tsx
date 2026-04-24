interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  trend?: string;
}

export function DashboardCard({ title, value, icon, subtitle, trend }: DashboardCardProps) {
  return (
    <div
      className="rounded-lg p-4 transition-all duration-200 group relative overflow-hidden"
      style={{
        backgroundColor: '#14141c',
        borderWidth: '1px',
        borderColor: '#1f1f28',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#6b51e0';
        e.currentTarget.style.boxShadow = '0 0 20px rgba(107, 81, 224, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1f1f28';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono uppercase tracking-wider" style={{ fontSize: '11px', color: '#757584' }}>
          {title}
        </span>
        {icon && <div style={{ color: '#6b51e0' }}>{icon}</div>}
      </div>
      
      <div className="mb-1" style={{ fontSize: '28px', color: '#e2e2e8' }}>
        {value}
      </div>
      
      {subtitle && (
        <div className="font-mono" style={{ fontSize: '12px', color: '#757584' }}>
          {subtitle}
        </div>
      )}
      
      {trend && (
        <div className="mt-2 font-mono" style={{ fontSize: '11px', color: '#6b51e0' }}>
          {trend}
        </div>
      )}
    </div>
  );
}
