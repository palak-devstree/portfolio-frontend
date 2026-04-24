interface BlogPostProps {
  title: string;
  date: string;
  tags: string[];
  preview: string;
}

function BlogPost({ title, date, tags, preview }: BlogPostProps) {
  return (
    <div
      className="rounded-lg p-5 transition-all duration-200 cursor-pointer"
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
      <div className="flex items-start justify-between mb-2">
        <h3 style={{ color: '#e2e2e8', flex: 1 }}>
          {title}
        </h3>
        <span className="font-mono ml-4" style={{ fontSize: '12px', color: '#4a4a58' }}>
          {date}
        </span>
      </div>

      <p className="mb-3" style={{ color: '#757584', fontSize: '14px', lineHeight: '1.6' }}>
        {preview}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 rounded font-mono"
            style={{
              backgroundColor: '#0b0b0f',
              borderWidth: '1px',
              borderColor: '#1f1f28',
              color: '#6b51e0',
              fontSize: '11px',
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Blog() {
  const posts = [
    {
      title: 'Building a Distributed Rate Limiter',
      date: '2026-03-15',
      tags: ['redis', 'golang', 'distributed-systems'],
      preview: 'Deep dive into implementing a distributed rate limiter using Redis and the token bucket algorithm. Covers scaling, consistency, and handling edge cases.',
    },
    {
      title: 'Optimizing Database Queries at Scale',
      date: '2026-03-08',
      tags: ['postgresql', 'optimization', 'performance'],
      preview: 'Techniques for optimizing slow database queries including indexing strategies, query planning, and connection pooling best practices.',
    },
    {
      title: 'Introduction to Event-Driven Architecture',
      date: '2026-02-28',
      tags: ['kafka', 'architecture', 'microservices'],
      preview: 'Understanding event-driven architecture patterns, when to use them, and how to implement with Apache Kafka.',
    },
    {
      title: 'API Gateway Design Patterns',
      date: '2026-02-20',
      tags: ['api', 'gateway', 'design-patterns'],
      preview: 'Exploring different API gateway patterns including authentication, rate limiting, request routing, and aggregation.',
    },
    {
      title: 'Caching Strategies for Backend Systems',
      date: '2026-02-12',
      tags: ['caching', 'redis', 'performance'],
      preview: 'Comprehensive guide to caching strategies: cache-aside, write-through, write-behind, and their trade-offs.',
    },
    {
      title: 'Monitoring and Observability Best Practices',
      date: '2026-02-05',
      tags: ['monitoring', 'observability', 'prometheus'],
      preview: 'Setting up effective monitoring and observability with metrics, logs, and traces. Using Prometheus and Grafana.',
    },
    {
      title: 'Building a Job Queue System',
      date: '2026-01-28',
      tags: ['queue', 'rabbitmq', 'celery'],
      preview: 'Designing and implementing a reliable job queue system with priority scheduling, retries, and dead letter queues.',
    },
    {
      title: 'Understanding Database Replication',
      date: '2026-01-20',
      tags: ['database', 'replication', 'postgresql'],
      preview: 'Master-slave replication patterns, conflict resolution, and ensuring data consistency across replicas.',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 style={{ color: '#e2e2e8', fontSize: '32px', marginBottom: '8px' }}>
          Blog
        </h1>
        <p style={{ color: '#757584', fontSize: '14px' }}>
          Technical articles about backend engineering and system design
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post, i) => (
          <BlogPost key={i} {...post} />
        ))}
      </div>
    </div>
  );
}
