import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  name: string;
  description: string;
  stack: string[];
  status: 'building' | 'planned' | 'done';
  github?: string;
  details?: string;
}

export function ProjectCard({ name, description, stack, status, github, details }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return '#2dd4bf';
      case 'building':
        return '#6b51e0';
      case 'planned':
        return '#fb923c';
      default:
        return '#757584';
    }
  };

  return (
    <div
      className="rounded-lg p-5 transition-all duration-200 group"
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
        <h3 style={{ color: '#e2e2e8' }}>{name}</h3>
        <span
          className="px-2 py-1 rounded font-mono uppercase tracking-wider"
          style={{
            fontSize: '10px',
            backgroundColor: 'rgba(107, 81, 224, 0.1)',
            color: getStatusColor(status),
            borderWidth: '1px',
            borderColor: getStatusColor(status),
          }}
        >
          {status}
        </span>
      </div>

      <p className="mb-4" style={{ color: '#757584', fontSize: '14px', lineHeight: '1.6' }}>
        {description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {stack.map((tech, i) => (
          <span
            key={i}
            className="px-2 py-1 rounded font-mono"
            style={{
              backgroundColor: '#0b0b0f',
              borderWidth: '1px',
              borderColor: '#1f1f28',
              color: '#757584',
              fontSize: '11px',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        {github && (
          <button
            className="flex items-center gap-2 px-3 py-2 rounded transition-all duration-200 font-mono"
            style={{
              backgroundColor: '#1a1a24',
              borderWidth: '1px',
              borderColor: '#1f1f28',
              color: '#e2e2e8',
              fontSize: '12px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#6b51e0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1f1f28';
            }}
          >
            <Github className="w-4 h-4" />
            github
          </button>
        )}
        {details && (
          <button
            className="flex items-center gap-2 px-3 py-2 rounded transition-all duration-200 font-mono"
            style={{
              backgroundColor: '#1a1a24',
              borderWidth: '1px',
              borderColor: '#1f1f28',
              color: '#e2e2e8',
              fontSize: '12px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#6b51e0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1f1f28';
            }}
          >
            <ExternalLink className="w-4 h-4" />
            details
          </button>
        )}
      </div>
    </div>
  );
}
