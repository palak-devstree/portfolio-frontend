/**
 * Fallback data used when the API is not configured or unreachable.
 * Shapes mirror the backend response exactly (see `src/lib/types.ts`).
 */

import type {
  ProfileResponse,
  ProjectResponse,
  BlogPostResponse,
  SystemDesignResponse,
  LabExperimentResponse,
  DashboardResponse,
  EducationResponse,
  CertificateResponse,
  ExperienceResponse,
} from './types'

export const fallbackProfile: ProfileResponse = {
  id: 1,
  full_name: 'Alex Chen',
  job_title: 'AI Backend Engineer',
  tagline:
    'I build the systems behind AI products — LLM serving, RAG pipelines, and the distributed plumbing that keeps models fast, cheap, and correct in production.',
  years_of_experience: 6,
  professional_summary:
    'AI backend engineer focused on shipping ML systems that survive contact with real traffic. I design inference platforms, retrieval pipelines, and evaluation harnesses — the infrastructure layer between a model checkpoint and a product your users actually feel. My favorite deploys are the boring ones.',
  skills: [
    {
      category: 'AI / ML',
      skills: ['PyTorch', 'Transformers', 'vLLM', 'LangChain', 'LlamaIndex', 'Triton', 'ONNX'],
    },
    {
      category: 'Backend',
      skills: ['Python', 'FastAPI', 'Go', 'Rust', 'gRPC'],
    },
    {
      category: 'Data & Storage',
      skills: ['PostgreSQL', 'Redis', 'Kafka', 'Qdrant', 'Pinecone'],
    },
    {
      category: 'Infrastructure',
      skills: ['Kubernetes', 'AWS', 'GCP', 'Docker'],
    },
  ],
  email: 'alex@alexchen.dev',
  phone: '+1 (415) 555-0142',
  location: 'San Francisco, CA',
  resume_url: 'https://example.com/resume.pdf',
  github_url: 'https://github.com/alexchen',
  linkedin_url: 'https://linkedin.com/in/alexchen',
  twitter_url: 'https://twitter.com/alexchen',
  website_url: 'https://alexchen.dev',
  show_blog: false,
  show_projects: true,
  show_system_designs: false,
  show_lab: false,
  show_about: true,
  show_education: true,
  show_certificates: true,
  show_experience: true,
  current_learning: [
    'LLM fine-tuning and LoRA adapters',
    'Vector databases and hybrid retrieval',
    'Distributed tracing with OpenTelemetry',
    'Kubernetes operators in Go',
  ],
  current_building: [
    'Multi-tenant AI inference platform',
    'Real-time analytics pipeline over Kafka',
    'Distributed job queue with priority lanes',
    'Observability dashboard with SLO tracking',
  ],
  current_exploring: [
    'Rust for low-latency services',
    'eBPF for kernel-level observability',
    'WebAssembly on the edge',
    'Homomorphic encryption for private ML',
  ],

  // Site copy
  navbar_brand: 'alex.ops',
  hero_badge: 'AI · Backend · Infra',
  hero_cluster_label: 'inference.cluster.us-west-2',
  subtitle_projects: 'backend systems, APIs, infrastructure',
  subtitle_writing: 'long-form notes on systems & engineering',
  subtitle_designs: 'architectures for real-world scale',
  subtitle_lab: 'experiments, benchmarks & research',
  subtitle_about: 'background, focus, stack',
  subtitle_contact: 'open inbox / fast reply',
  contact_response_note: 'responses usually within 72h',
  
  // About section headings
  heading_learning: 'Currently Learning',
  heading_building: 'Currently Building',
  heading_exploring: 'Currently Exploring',
}

export const fallbackDashboard: DashboardResponse = {
  projects_count: 14,
  blog_posts_count: 9,
  system_designs_count: 6,
  lab_experiments_count: 9,
  uptime_percentage: 99.97,
  total_views: 12840,
}

export const fallbackProjects: ProjectResponse[] = [
  {
    id: 1,
    name: 'AI Model Serving Gateway',
    description:
      'High-throughput API gateway for serving large language models with continuous batching, quantization, and autoscaling across GPU pools.',
    stack: ['FastAPI', 'vLLM', 'PyTorch', 'Kubernetes', 'Redis'],
    status: 'building',
    github_url: 'https://github.com/alexchen/ai-gateway',
    details_url: 'https://alexchen.dev/projects/ai-gateway',
    github_stars: 1240,
    github_forks: 82,
    featured: true,
    display_order: 1,
    last_commit_date: '2026-04-18',
  },
  {
    id: 2,
    name: 'Distributed Rate Limiter',
    description:
      'Redis-backed rate limiter implementing token bucket and sliding window algorithms with p99 latency under 1ms across regions.',
    stack: ['Go', 'Redis', 'Lua', 'Prometheus'],
    status: 'done',
    github_url: 'https://github.com/alexchen/rate-limiter',
    details_url: '',
    github_stars: 420,
    github_forks: 31,
    featured: true,
    display_order: 2,
    last_commit_date: '2026-02-02',
  },
  {
    id: 3,
    name: 'Vector Search Engine',
    description:
      'Semantic search service with dense embeddings, hybrid BM25 + ANN retrieval, and sub-50ms query latency at 10M vectors.',
    stack: ['Python', 'Qdrant', 'FastAPI', 'Sentence-Transformers'],
    status: 'done',
    github_url: 'https://github.com/alexchen/vector-search',
    details_url: 'https://search.alexchen.dev',
    github_stars: 287,
    github_forks: 19,
    featured: false,
    display_order: 3,
    last_commit_date: '2026-03-11',
  },
  {
    id: 4,
    name: 'Real-time Analytics Pipeline',
    description:
      'Event-driven pipeline processing 2M events/sec with exactly-once semantics, windowed aggregations, and live dashboards.',
    stack: ['Kafka', 'Flink', 'ClickHouse', 'Grafana'],
    status: 'building',
    github_url: 'https://github.com/alexchen/analytics-pipeline',
    github_stars: 156,
    github_forks: 12,
    featured: false,
    display_order: 4,
    last_commit_date: '2026-04-20',
  },
  {
    id: 5,
    name: 'Distributed Job Queue',
    description:
      'Reliable job queue with priority lanes, exponential retry, dead letter handling, and a polished web UI for ops.',
    stack: ['Go', 'Redis', 'PostgreSQL', 'React'],
    status: 'done',
    github_url: 'https://github.com/alexchen/job-queue',
    github_stars: 512,
    github_forks: 44,
    featured: false,
    display_order: 5,
    last_commit_date: '2026-01-15',
  },
  {
    id: 6,
    name: 'Kubernetes Operator Framework',
    description:
      'Custom Kubernetes operator for stateful AI workloads with automated scaling, warm pools, and health-aware scheduling.',
    stack: ['Go', 'Kubernetes', 'controller-runtime', 'Helm'],
    status: 'planned',
    github_stars: 0,
    github_forks: 0,
    featured: false,
    display_order: 6,
  },
  {
    id: 7,
    name: 'Prompt Registry',
    description:
      'Versioned prompt store with A/B testing, eval harness, and rollback. Built for teams shipping LLM features in production.',
    stack: ['TypeScript', 'PostgreSQL', 'Node.js', 'Next.js'],
    status: 'exploring',
    github_stars: 0,
    github_forks: 0,
    featured: false,
    display_order: 7,
  },
]

export const fallbackBlogPosts: BlogPostResponse[] = [
  {
    id: 1,
    title: 'Building a Distributed Rate Limiter',
    slug: 'building-a-distributed-rate-limiter',
    content: '',
    preview:
      'A deep dive into building a distributed rate limiter with Redis and token bucket — covering consistency, clock skew, and the edge cases nobody talks about.',
    tags: ['redis', 'golang', 'distributed-systems'],
    published_date: '2026-03-15',
    read_time_minutes: 12,
    is_published: true,
    views_count: 3420,
  },
  {
    id: 2,
    title: 'Optimizing Postgres Queries at Scale',
    slug: 'optimizing-postgres-queries-at-scale',
    content: '',
    preview:
      'Indexing strategies, query planning, and connection pooling patterns that actually move the needle when you cross 10TB.',
    tags: ['postgresql', 'performance'],
    published_date: '2026-03-08',
    read_time_minutes: 9,
    is_published: true,
    views_count: 2150,
  },
  {
    id: 3,
    title: 'Event-Driven Architecture, Pragmatically',
    slug: 'event-driven-architecture-pragmatically',
    content: '',
    preview:
      'When events are the right abstraction, when they are not, and how to avoid the distributed monolith trap.',
    tags: ['kafka', 'architecture', 'microservices'],
    published_date: '2026-02-28',
    read_time_minutes: 11,
    is_published: true,
    views_count: 1890,
  },
  {
    id: 4,
    title: 'API Gateway Design Patterns',
    slug: 'api-gateway-design-patterns',
    content: '',
    preview:
      'A tour of auth, rate limiting, routing, and aggregation patterns — with diagrams and real production trade-offs.',
    tags: ['api', 'gateway', 'design-patterns'],
    published_date: '2026-02-20',
    read_time_minutes: 8,
    is_published: true,
    views_count: 1620,
  },
  {
    id: 5,
    title: 'Caching Strategies for Backend Systems',
    slug: 'caching-strategies-for-backend-systems',
    content: '',
    preview:
      'Cache-aside, write-through, write-behind, and the invalidation strategies that save your weekends.',
    tags: ['caching', 'redis', 'performance'],
    published_date: '2026-02-12',
    read_time_minutes: 7,
    is_published: true,
    views_count: 1340,
  },
  {
    id: 6,
    title: 'Observability is a Product Feature',
    slug: 'observability-is-a-product-feature',
    content: '',
    preview:
      'Why metrics, logs, and traces are not separate disciplines — and how to build systems that explain themselves.',
    tags: ['observability', 'prometheus', 'opentelemetry'],
    published_date: '2026-02-05',
    read_time_minutes: 10,
    is_published: true,
    views_count: 2770,
  },
]

export const fallbackSystemDesigns: SystemDesignResponse[] = [
  {
    id: 1,
    title: 'E-commerce Platform at Scale',
    description:
      'Scalable storefront handling millions of transactions with inventory, payments, and fulfillment across regions.',
    stack: ['Microservices', 'Kafka', 'PostgreSQL', 'Redis', 'Kubernetes'],
    notes: [
      'Event-driven choreography between services',
      'SAGA pattern for distributed transactions',
      'CQRS for read/write separation',
      'Circuit breakers at every network hop',
    ],
    complexity_level: 'advanced',
  },
  {
    id: 2,
    title: 'Real-time Chat System',
    description:
      'High-performance chat supporting millions of concurrent users with delivery guarantees and sub-100ms fanout.',
    stack: ['WebSocket', 'Redis', 'Cassandra', 'RabbitMQ', 'Go'],
    notes: [
      'WebSocket connection sharding',
      'Cassandra for message persistence',
      'Redis-backed presence',
      'Stateless horizontal scaling',
    ],
    complexity_level: 'intermediate',
  },
  {
    id: 3,
    title: 'Video Streaming Service',
    description:
      'Content delivery platform with adaptive bitrate streaming, global CDN, and real-time analytics.',
    stack: ['CDN', 'S3', 'Lambda', 'DynamoDB', 'CloudFront'],
    notes: [
      'Adaptive bitrate encoding at ingest',
      'Edge caching for low start latency',
      'Signed URLs for access control',
      'ClickHouse for QoS analytics',
    ],
    complexity_level: 'advanced',
  },
  {
    id: 4,
    title: 'URL Shortener',
    description:
      'Distributed URL shortening service with custom aliases, analytics, and abuse prevention.',
    stack: ['Redis', 'PostgreSQL', 'Node.js', 'Nginx'],
    notes: [
      'Base62 encoding on monotonic IDs',
      'Write-through cache strategy',
      'Per-key rate limiting',
      'Time-series analytics store',
    ],
    complexity_level: 'beginner',
  },
  {
    id: 5,
    title: 'Semantic Search Engine',
    description:
      'Hybrid search combining BM25 and vector retrieval, with autocomplete and personalized ranking.',
    stack: ['Elasticsearch', 'Qdrant', 'Kafka', 'Python', 'Redis'],
    notes: [
      'Inverted index + ANN hybrid scoring',
      'Learning-to-rank reranker',
      'Trie-based autocomplete',
      'Distributed crawling pipeline',
    ],
    complexity_level: 'advanced',
  },
  {
    id: 6,
    title: 'Social Media Feed',
    description:
      'Personalized feed generation with real-time updates, ranking, and recommendation signals.',
    stack: ['Redis', 'MongoDB', 'Kafka', 'Python', 'GraphQL'],
    notes: [
      'Hybrid fan-out for hot vs. cold users',
      'ML ranking with embeddings',
      'WebSocket delivery layer',
      'Feedback loop into the ranker',
    ],
    complexity_level: 'intermediate',
  },
]

export const fallbackLabExperiments: LabExperimentResponse[] = [
  {
    id: 1,
    title: 'Message Queue Shootout',
    description:
      'Benchmarking RabbitMQ, Kafka, and NATS across load patterns, failure scenarios, and tail latencies.',
    stack: ['RabbitMQ', 'Kafka', 'NATS', 'Python'],
    status: 'testing',
    findings:
      'Kafka wins on throughput at >100k msg/s. NATS dominates sub-millisecond fan-out. RabbitMQ still best for complex routing topologies.',
  },
  {
    id: 2,
    title: 'LLM Serving Strategies',
    description:
      'Exploring continuous batching, paged attention, and quantization for cost-efficient LLM inference.',
    stack: ['vLLM', 'PyTorch', 'FastAPI', 'Docker'],
    status: 'experimenting',
  },
  {
    id: 3,
    title: 'Distributed Cache Consistency',
    description:
      'Comparing invalidation strategies and consistency models across a multi-region cache tier.',
    stack: ['Redis', 'Memcached', 'Go'],
    status: 'completed',
    findings:
      'Write-through with TTL jitter outperformed naive invalidation by 3x on cache hit ratio. Pub/sub invalidation costs scale poorly past 50 replicas.',
  },
  {
    id: 4,
    title: 'Vector Index Benchmarks',
    description:
      'Benchmarking HNSW, IVF, and ScaNN across recall/latency trade-offs on 10M+ vector corpora.',
    stack: ['Qdrant', 'FAISS', 'Sentence-Transformers'],
    status: 'experimenting',
  },
  {
    id: 5,
    title: 'Rate Limiter Algorithms',
    description:
      'Comparing token bucket, leaky bucket, and sliding window with real traffic replays.',
    stack: ['Redis', 'Lua', 'Go'],
    status: 'completed',
    findings:
      'Sliding window counter gives the smoothest user experience under bursty traffic. Token bucket is simplest to reason about and plenty for most APIs.',
  },
  {
    id: 6,
    title: 'gRPC vs REST at the Edge',
    description:
      'Throughput, latency, and operational cost comparison between gRPC and REST under flaky networks.',
    stack: ['gRPC', 'REST', 'Go', 'Prometheus'],
    status: 'testing',
  },
  {
    id: 7,
    title: 'Event Sourcing Proof of Concept',
    description:
      'Event sourcing with an append-only store and materialized read projections for a ledger service.',
    stack: ['EventStoreDB', 'CQRS', 'Node.js'],
    status: 'experimenting',
  },
]

export const fallbackEducation: EducationResponse[] = [
  {
    id: 1,
    institution: 'Stanford University',
    degree: 'M.S. Computer Science',
    field_of_study: 'Distributed Systems',
    start_date: '2018',
    end_date: '2020',
    description: '',
    description_points: [
      'Focused on distributed systems, database internals, and large-scale infrastructure',
      'Thesis on consensus protocols in geo-replicated systems',
      'Teaching assistant for CS 244 (Advanced Topics in Networking)',
    ],
    location: 'Stanford, CA',
    display_order: 1,
  },
  {
    id: 2,
    institution: 'UC Berkeley',
    degree: 'B.S. Computer Science',
    field_of_study: 'Computer Science',
    start_date: '2014',
    end_date: '2018',
    description: '',
    description_points: [
      'Core CS fundamentals with emphasis on algorithms, operating systems, and networking',
      'Teaching assistant for CS 162 (Operating Systems)',
      'Graduated with honors (GPA: 3.9/4.0)',
    ],
    location: 'Berkeley, CA',
    display_order: 2,
  },
]

export const fallbackCertificates: CertificateResponse[] = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect – Professional',
    issuer: 'Amazon Web Services',
    issue_date: 'Jan 2025',
    expiry_date: 'Jan 2028',
    credential_id: 'AWS-PSA-12345',
    credential_url: 'https://aws.amazon.com/verification',
    image_url: 'https://images.credly.com/images/aws-certified-solutions-architect-professional.png',
    description:
      'Advanced AWS architecture certification covering high availability, disaster recovery, cost optimization, and security at scale.',
    display_order: 1,
  },
  {
    id: 2,
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    issue_date: 'Sep 2024',
    expiry_date: 'Sep 2027',
    credential_id: 'LF-CKA-67890',
    credential_url: 'https://training.linuxfoundation.org/certification/verify',
    image_url: 'https://images.credly.com/images/cka-certified-kubernetes-administrator.png',
    description:
      'Hands-on Kubernetes administration certification covering cluster setup, networking, storage, security, and troubleshooting.',
    display_order: 2,
  },
  {
    id: 3,
    title: 'Google Cloud Professional Data Engineer',
    issuer: 'Google Cloud',
    issue_date: 'Mar 2024',
    expiry_date: 'Mar 2026',
    credential_id: 'GCP-PDE-11223',
    credential_url: 'https://www.credential.net/verify',
    image_url: 'https://images.credly.com/images/gcp-professional-data-engineer.png',
    description:
      'Data engineering certification covering BigQuery, Dataflow, Pub/Sub, and building scalable data pipelines on GCP.',
    display_order: 3,
  },
]

export const fallbackExperience: ExperienceResponse[] = [
  {
    id: 1,
    company: 'Anthropic',
    position: 'Senior Backend Engineer',
    company_url: 'https://anthropic.com',
    location: 'San Francisco, CA',
    start_date: 'Jan 2024',
    end_date: 'Present',
    description: '',
    description_points: [
      'Building inference infrastructure for Claude',
      'Designed and shipped the multi-tenant serving platform handling 100M+ requests/day with p99 latency under 200ms',
      'Led the migration from monolithic to microservices architecture, reducing deployment time from 2 hours to 8 minutes',
    ],
    technologies: ['Python', 'FastAPI', 'Kubernetes', 'Redis', 'PostgreSQL', 'gRPC'],
    project_urls: ['https://anthropic.com/claude'],
    display_order: 1,
  },
  {
    id: 2,
    company: 'Stripe',
    position: 'Backend Engineer',
    company_url: 'https://stripe.com',
    location: 'San Francisco, CA',
    start_date: 'Jun 2021',
    end_date: 'Dec 2023',
    description: '',
    description_points: [
      'Worked on the payments infrastructure team',
      'Built distributed rate limiting system handling 50k req/s with sub-millisecond latency',
      'Designed and implemented the event-driven notification pipeline processing 10M events/day with exactly-once delivery guarantees',
    ],
    technologies: ['Ruby', 'Go', 'Redis', 'Kafka', 'PostgreSQL', 'AWS'],
    project_urls: ['https://stripe.com/docs/api'],
    display_order: 2,
  },
  {
    id: 3,
    company: 'Airbnb',
    position: 'Software Engineer',
    company_url: 'https://airbnb.com',
    location: 'San Francisco, CA',
    start_date: 'Jul 2020',
    end_date: 'May 2021',
    description: '',
    description_points: [
      'Joined the search infrastructure team',
      'Optimized Elasticsearch queries reducing p95 latency by 40%',
      'Built the A/B testing framework for search ranking experiments, enabling data-driven improvements to search relevance',
    ],
    technologies: ['Java', 'Elasticsearch', 'Kafka', 'MySQL', 'Kubernetes'],
    project_urls: [],
    display_order: 3,
  },
]
