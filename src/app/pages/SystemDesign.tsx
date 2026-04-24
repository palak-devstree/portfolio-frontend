import { Network } from 'lucide-react';

interface SystemDesignCardProps {
  title: string;
  description: string;
  stack: string[];
  notes: string[];
}

function SystemDesignCard({ title, description, stack, notes }: SystemDesignCardProps) {
  return (
    <div
      className="rounded-lg p-5 transition-all duration-200"
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
      <h3 className="mb-3" style={{ color: '#e2e2e8' }}>
        {title}
      </h3>
      
      <p className="mb-4" style={{ color: '#757584', fontSize: '14px' }}>
        {description}
      </p>

      {/* Diagram Placeholder */}
      <div
        className="mb-4 rounded flex items-center justify-center"
        style={{
          height: '160px',
          backgroundColor: '#0b0b0f',
          borderWidth: '1px',
          borderColor: '#1f1f28',
        }}
      >
        <div className="text-center">
          <Network className="w-12 h-12 mx-auto mb-2" style={{ color: '#6b51e0', opacity: 0.5 }} />
          <span className="font-mono" style={{ fontSize: '12px', color: '#4a4a58' }}>
            Architecture Diagram
          </span>
        </div>
      </div>

      {/* Stack */}
      <div className="mb-4">
        <span className="font-mono uppercase tracking-wider block mb-2" style={{ fontSize: '11px', color: '#757584' }}>
          Stack
        </span>
        <div className="flex flex-wrap gap-2">
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
      </div>

      {/* Notes */}
      <div>
        <span className="font-mono uppercase tracking-wider block mb-2" style={{ fontSize: '11px', color: '#757584' }}>
          Key Points
        </span>
        <ul className="space-y-1 font-mono" style={{ fontSize: '12px', color: '#757584' }}>
          {notes.map((note, i) => (
            <li key={i}>• {note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SystemDesign() {
  const designs = [
    {
      title: 'E-commerce Platform',
      description: 'Scalable e-commerce system handling millions of transactions with inventory management and payment processing.',
      stack: ['Microservices', 'Kafka', 'PostgreSQL', 'Redis', 'K8s'],
      notes: [
        'Event-driven architecture',
        'SAGA pattern for distributed transactions',
        'CQRS for read/write separation',
        'Circuit breaker for fault tolerance',
      ],
    },
    {
      title: 'Real-time Chat System',
      description: 'High-performance chat application supporting millions of concurrent users with message delivery guarantees.',
      stack: ['WebSocket', 'Redis', 'Cassandra', 'RabbitMQ', 'Go'],
      notes: [
        'WebSocket connection management',
        'Message persistence with Cassandra',
        'Presence detection via Redis',
        'Horizontal scaling with load balancers',
      ],
    },
    {
      title: 'Video Streaming Service',
      description: 'Content delivery platform with adaptive bitrate streaming and global CDN integration.',
      stack: ['CDN', 'S3', 'Lambda', 'DynamoDB', 'CloudFront'],
      notes: [
        'Adaptive bitrate encoding',
        'Edge caching for low latency',
        'Pre-signed URLs for security',
        'Analytics pipeline for metrics',
      ],
    },
    {
      title: 'URL Shortener',
      description: 'Distributed URL shortening service with analytics and custom aliases.',
      stack: ['Redis', 'PostgreSQL', 'Node.js', 'Nginx'],
      notes: [
        'Base62 encoding for short URLs',
        'Write-through cache strategy',
        'Rate limiting per user',
        'Analytics with time-series data',
      ],
    },
    {
      title: 'Search Engine',
      description: 'Full-text search engine with ranking algorithms and autocomplete functionality.',
      stack: ['Elasticsearch', 'Kafka', 'Python', 'Redis'],
      notes: [
        'Inverted index for fast lookup',
        'TF-IDF ranking algorithm',
        'Autocomplete with tries',
        'Distributed crawling system',
      ],
    },
    {
      title: 'Social Media Feed',
      description: 'Personalized feed generation system with real-time updates and recommendation engine.',
      stack: ['Redis', 'MongoDB', 'Kafka', 'Python', 'GraphQL'],
      notes: [
        'Fan-out on write for feed generation',
        'Ranking with ML models',
        'Real-time updates via WebSocket',
        'Content recommendation engine',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 style={{ color: '#e2e2e8', fontSize: '32px', marginBottom: '8px' }}>
          System Design
        </h1>
        <p style={{ color: '#757584', fontSize: '14px' }}>
          Architecture designs for scalable distributed systems
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {designs.map((design, i) => (
          <SystemDesignCard key={i} {...design} />
        ))}
      </div>
    </div>
  );
}
