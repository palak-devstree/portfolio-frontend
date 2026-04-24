/**
 * Fallback data used when the API is not configured or unreachable.
 * This ensures the portfolio looks great in v0, Storybook, or any
 * environment where the backend is not running.
 */

export const fallbackProfile = {
  full_name: 'Alex Chen',
  job_title: 'AI Backend Engineer',
  tagline:
    'Building scalable backend systems, AI services, and production-ready distributed architectures.',
  years_of_experience: 5,
  professional_summary:
    'Backend engineer specializing in building scalable systems, AI services, and distributed architectures. Passionate about the full product lifecycle from ideation to production monitoring. I believe in building systems that are not just functional, but observable, maintainable, and performant.',
  skills: [
    'Python',
    'Go',
    'Node.js',
    'PostgreSQL',
    'Redis',
    'Kafka',
    'Kubernetes',
    'Docker',
    'AWS',
    'FastAPI',
    'gRPC',
    'Terraform',
  ],
  email: 'alex@example.com',
  github_url: 'https://github.com/alexchen',
  linkedin_url: 'https://linkedin.com/in/alexchen',
  twitter_url: 'https://twitter.com/alexchen',
  location: 'San Francisco, CA',
  show_blog: true,
  show_projects: true,
  show_system_designs: true,
  show_lab: true,
  show_about: true,
  current_learning: [
    'LLM fine-tuning and optimization',
    'Vector databases and embeddings',
    'Distributed tracing systems',
    'Kubernetes operators',
  ],
  current_building: [
    'AI model serving API',
    'Real-time analytics pipeline',
    'Distributed job queue system',
    'Monitoring dashboard',
  ],
  current_exploring: [
    'Rust for systems programming',
    'eBPF for observability',
    'WebAssembly on the server',
    'Homomorphic encryption',
  ],
};

export const fallbackDashboard = {
  projects_count: 12,
  blog_posts_count: 8,
  system_designs_count: 6,
  lab_experiments_count: 9,
  uptime_percentage: 99.9,
  total_views: 4821,
};

export const fallbackProjects = [
  {
    id: 1,
    title: 'AI Model Serving API',
    description:
      'High-performance REST and gRPC API for serving large language models with batching, quantization, and auto-scaling support.',
    status: 'building' as const,
    tech_stack: ['FastAPI', 'vLLM', 'PyTorch', 'Docker', 'K8s'],
    github_url: 'https://github.com/alexchen/ai-serving',
    live_url: '',
  },
  {
    id: 2,
    title: 'Distributed Rate Limiter',
    description:
      'Redis-backed distributed rate limiter implementing token bucket and sliding window algorithms with sub-millisecond latency.',
    status: 'done' as const,
    tech_stack: ['Go', 'Redis', 'Lua', 'Prometheus'],
    github_url: 'https://github.com/alexchen/rate-limiter',
    live_url: '',
  },
  {
    id: 3,
    title: 'Real-time Analytics Pipeline',
    description:
      'Event-driven analytics pipeline processing millions of events per second with real-time aggregations and dashboards.',
    status: 'building' as const,
    tech_stack: ['Kafka', 'Flink', 'ClickHouse', 'Grafana'],
    github_url: 'https://github.com/alexchen/analytics-pipeline',
    live_url: '',
  },
  {
    id: 4,
    title: 'Vector Search Engine',
    description:
      'Semantic search engine using dense vector embeddings with ANN indexing, supporting hybrid keyword + vector queries.',
    status: 'done' as const,
    tech_stack: ['Python', 'Qdrant', 'FastAPI', 'Sentence-Transformers'],
    github_url: 'https://github.com/alexchen/vector-search',
    live_url: 'https://search.alexchen.dev',
  },
  {
    id: 5,
    title: 'Distributed Job Queue',
    description:
      'Reliable job queue with priority scheduling, retries, dead letter queues, and a web UI for monitoring.',
    status: 'done' as const,
    tech_stack: ['Go', 'Redis', 'PostgreSQL', 'React'],
    github_url: 'https://github.com/alexchen/job-queue',
    live_url: '',
  },
  {
    id: 6,
    title: 'Kubernetes Operator Framework',
    description:
      'Custom Kubernetes operator for managing stateful AI workloads with automatic scaling and health management.',
    status: 'planned' as const,
    tech_stack: ['Go', 'Kubernetes', 'controller-runtime', 'Helm'],
    github_url: '',
    live_url: '',
  },
];

export const fallbackBlogPosts = [
  {
    id: 1,
    title: 'Building a Distributed Rate Limiter',
    date: '2026-03-15',
    tags: ['redis', 'golang', 'distributed-systems'],
    excerpt:
      'Deep dive into implementing a distributed rate limiter using Redis and the token bucket algorithm. Covers scaling, consistency, and handling edge cases.',
    is_published: true,
  },
  {
    id: 2,
    title: 'Optimizing Database Queries at Scale',
    date: '2026-03-08',
    tags: ['postgresql', 'optimization', 'performance'],
    excerpt:
      'Techniques for optimizing slow database queries including indexing strategies, query planning, and connection pooling best practices.',
    is_published: true,
  },
  {
    id: 3,
    title: 'Introduction to Event-Driven Architecture',
    date: '2026-02-28',
    tags: ['kafka', 'architecture', 'microservices'],
    excerpt:
      'Understanding event-driven architecture patterns, when to use them, and how to implement with Apache Kafka.',
    is_published: true,
  },
  {
    id: 4,
    title: 'API Gateway Design Patterns',
    date: '2026-02-20',
    tags: ['api', 'gateway', 'design-patterns'],
    excerpt:
      'Exploring different API gateway patterns including authentication, rate limiting, request routing, and aggregation.',
    is_published: true,
  },
  {
    id: 5,
    title: 'Caching Strategies for Backend Systems',
    date: '2026-02-12',
    tags: ['caching', 'redis', 'performance'],
    excerpt:
      'Comprehensive guide to caching strategies: cache-aside, write-through, write-behind, and their trade-offs.',
    is_published: true,
  },
  {
    id: 6,
    title: 'Monitoring and Observability Best Practices',
    date: '2026-02-05',
    tags: ['monitoring', 'observability', 'prometheus'],
    excerpt:
      'Setting up effective monitoring and observability with metrics, logs, and traces. Using Prometheus and Grafana.',
    is_published: true,
  },
  {
    id: 7,
    title: 'Building a Job Queue System',
    date: '2026-01-28',
    tags: ['queue', 'rabbitmq', 'celery'],
    excerpt:
      'Designing and implementing a reliable job queue system with priority scheduling, retries, and dead letter queues.',
    is_published: true,
  },
  {
    id: 8,
    title: 'Understanding Database Replication',
    date: '2026-01-20',
    tags: ['database', 'replication', 'postgresql'],
    excerpt:
      'Master-slave replication patterns, conflict resolution, and ensuring data consistency across replicas.',
    is_published: true,
  },
];

export const fallbackSystemDesigns = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description:
      'Scalable e-commerce system handling millions of transactions with inventory management and payment processing.',
    stack: ['Microservices', 'Kafka', 'PostgreSQL', 'Redis', 'K8s'],
    notes: [
      'Event-driven architecture',
      'SAGA pattern for distributed transactions',
      'CQRS for read/write separation',
      'Circuit breaker for fault tolerance',
    ],
  },
  {
    id: 2,
    title: 'Real-time Chat System',
    description:
      'High-performance chat application supporting millions of concurrent users with message delivery guarantees.',
    stack: ['WebSocket', 'Redis', 'Cassandra', 'RabbitMQ', 'Go'],
    notes: [
      'WebSocket connection management',
      'Message persistence with Cassandra',
      'Presence detection via Redis',
      'Horizontal scaling with load balancers',
    ],
  },
  {
    id: 3,
    title: 'Video Streaming Service',
    description:
      'Content delivery platform with adaptive bitrate streaming and global CDN integration.',
    stack: ['CDN', 'S3', 'Lambda', 'DynamoDB', 'CloudFront'],
    notes: [
      'Adaptive bitrate encoding',
      'Edge caching for low latency',
      'Pre-signed URLs for security',
      'Analytics pipeline for metrics',
    ],
  },
  {
    id: 4,
    title: 'URL Shortener',
    description:
      'Distributed URL shortening service with analytics and custom aliases.',
    stack: ['Redis', 'PostgreSQL', 'Node.js', 'Nginx'],
    notes: [
      'Base62 encoding for short URLs',
      'Write-through cache strategy',
      'Rate limiting per user',
      'Analytics with time-series data',
    ],
  },
  {
    id: 5,
    title: 'Search Engine',
    description:
      'Full-text search engine with ranking algorithms and autocomplete functionality.',
    stack: ['Elasticsearch', 'Kafka', 'Python', 'Redis'],
    notes: [
      'Inverted index for fast lookup',
      'TF-IDF ranking algorithm',
      'Autocomplete with tries',
      'Distributed crawling system',
    ],
  },
  {
    id: 6,
    title: 'Social Media Feed',
    description:
      'Personalized feed generation system with real-time updates and recommendation engine.',
    stack: ['Redis', 'MongoDB', 'Kafka', 'Python', 'GraphQL'],
    notes: [
      'Fan-out on write for feed generation',
      'Ranking with ML models',
      'Real-time updates via WebSocket',
      'Content recommendation engine',
    ],
  },
];

export const fallbackLabExperiments = [
  {
    id: 1,
    title: 'Message Queue Performance',
    description:
      'Benchmarking different message queue systems under various load patterns and failure scenarios.',
    status: 'testing' as const,
    stack: ['RabbitMQ', 'Kafka', 'NATS', 'Python'],
  },
  {
    id: 2,
    title: 'LLM Model Serving',
    description:
      'Experimenting with different approaches to serve large language models efficiently with batching and quantization.',
    status: 'experimenting' as const,
    stack: ['FastAPI', 'vLLM', 'PyTorch', 'Docker'],
  },
  {
    id: 3,
    title: 'Distributed Cache Patterns',
    description:
      'Testing various distributed cache invalidation strategies and consistency models.',
    status: 'completed' as const,
    stack: ['Redis', 'Memcached', 'Go'],
  },
  {
    id: 4,
    title: 'Vector Search Optimization',
    description:
      'Optimizing vector similarity search with different indexing algorithms and embedding models.',
    status: 'experimenting' as const,
    stack: ['Qdrant', 'FAISS', 'Sentence-Transformers'],
  },
  {
    id: 5,
    title: 'Rate Limiter Algorithms',
    description:
      'Comparing token bucket, leaky bucket, and sliding window rate limiting implementations.',
    status: 'completed' as const,
    stack: ['Redis', 'Lua', 'Go'],
  },
  {
    id: 6,
    title: 'gRPC vs REST Performance',
    description:
      'Performance comparison between gRPC and REST APIs under different network conditions.',
    status: 'testing' as const,
    stack: ['gRPC', 'REST', 'Go', 'Prometheus'],
  },
  {
    id: 7,
    title: 'Database Sharding Strategies',
    description:
      'Testing different sharding approaches for horizontal database scaling.',
    status: 'experimenting' as const,
    stack: ['PostgreSQL', 'Vitess', 'Python'],
  },
  {
    id: 8,
    title: 'Circuit Breaker Patterns',
    description:
      'Implementing and testing circuit breaker patterns for fault-tolerant microservices.',
    status: 'completed' as const,
    stack: ['Hystrix', 'Resilience4j', 'Go'],
  },
  {
    id: 9,
    title: 'Event Sourcing POC',
    description:
      'Proof of concept for event sourcing with event store and read model projections.',
    status: 'testing' as const,
    stack: ['EventStoreDB', 'CQRS', 'Node.js'],
  },
];
