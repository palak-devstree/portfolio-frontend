import { Beaker } from 'lucide-react';

interface LabCardProps {
  title: string;
  description: string;
  status: 'experimenting' | 'testing' | 'completed';
  stack: string[];
}

function LabCard({ title, description, status, stack }: LabCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#2dd4bf';
      case 'testing':
        return '#6b51e0';
      case 'experimenting':
        return '#fb923c';
      default:
        return '#757584';
    }
  };

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
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Beaker className="w-5 h-5" style={{ color: '#6b51e0' }} />
          <h3 style={{ color: '#e2e2e8' }}>{title}</h3>
        </div>
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
  );
}

export function Lab() {
  const experiments = [
    {
      title: 'Message Queue Performance',
      description: 'Benchmarking different message queue systems under various load patterns and failure scenarios.',
      status: 'testing' as const,
      stack: ['RabbitMQ', 'Kafka', 'NATS', 'Python'],
    },
    {
      title: 'LLM Model Serving',
      description: 'Experimenting with different approaches to serve large language models efficiently with batching and quantization.',
      status: 'experimenting' as const,
      stack: ['FastAPI', 'vLLM', 'PyTorch', 'Docker'],
    },
    {
      title: 'Distributed Cache Patterns',
      description: 'Testing various distributed cache invalidation strategies and consistency models.',
      status: 'completed' as const,
      stack: ['Redis', 'Memcached', 'Go'],
    },
    {
      title: 'Vector Search Optimization',
      description: 'Optimizing vector similarity search with different indexing algorithms and embedding models.',
      status: 'experimenting' as const,
      stack: ['Qdrant', 'FAISS', 'Sentence-Transformers'],
    },
    {
      title: 'Rate Limiter Algorithms',
      description: 'Comparing token bucket, leaky bucket, and sliding window rate limiting implementations.',
      status: 'completed' as const,
      stack: ['Redis', 'Lua', 'Go'],
    },
    {
      title: 'gRPC vs REST Performance',
      description: 'Performance comparison between gRPC and REST APIs under different network conditions.',
      status: 'testing' as const,
      stack: ['gRPC', 'REST', 'Go', 'Prometheus'],
    },
    {
      title: 'Database Sharding Strategies',
      description: 'Testing different sharding approaches for horizontal database scaling.',
      status: 'experimenting' as const,
      stack: ['PostgreSQL', 'Vitess', 'Python'],
    },
    {
      title: 'Circuit Breaker Patterns',
      description: 'Implementing and testing circuit breaker patterns for fault-tolerant microservices.',
      status: 'completed' as const,
      stack: ['Hystrix', 'Resilience4j', 'Go'],
    },
    {
      title: 'Event Sourcing POC',
      description: 'Proof of concept for event sourcing with event store and read model projections.',
      status: 'testing' as const,
      stack: ['EventStoreDB', 'CQRS', 'Node.js'],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 style={{ color: '#e2e2e8', fontSize: '32px', marginBottom: '8px' }}>
          Lab
        </h1>
        <p style={{ color: '#757584', fontSize: '14px' }}>
          Experimental projects and technical research
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiments.map((experiment, i) => (
          <LabCard key={i} {...experiment} />
        ))}
      </div>
    </div>
  );
}
