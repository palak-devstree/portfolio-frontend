import { useState } from 'react';
import { Terminal, Activity, Code, FileText, Layers, TrendingUp } from 'lucide-react';
import { DashboardCard } from './components/DashboardCard';
import { LogPanel } from './components/LogPanel';
import { ConsoleInput } from './components/ConsoleInput';
import { ProjectCard } from './components/ProjectCard';
import { AssistantButton } from './components/AssistantButton';

type PageType = 'dashboard' | 'projects' | 'system-design' | 'blog' | 'lab' | 'about';

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* System Init / Introduction Section */}
      <div
        className="rounded-lg p-8 relative overflow-hidden"
        style={{
          backgroundColor: '#14141c',
          borderWidth: '1px',
          borderColor: '#1f1f28',
        }}
      >
        {/* Subtle glow effect */}
        <div 
          className="absolute top-0 left-0 w-full h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(107, 81, 224, 0.5), transparent)',
          }}
        />
        
        <div className="space-y-6">
          {/* System Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#6b51e0' }}
                />
                <span 
                  className="font-mono uppercase tracking-wider"
                  style={{ fontSize: '11px', color: '#757584' }}
                >
                  System Status: Online
                </span>
              </div>
              <h1 
                style={{ 
                  fontSize: '42px',
                  color: '#e2e2e8',
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                }}
              >
                AI Backend Engineer
              </h1>
              <p 
                className="font-mono"
                style={{ 
                  fontSize: '14px',
                  color: '#9d9db0',
                }}
              >
                {'> '}<span style={{ color: '#6b51e0' }}>Architect</span> of scalable systems • <span style={{ color: '#6b51e0' }}>Builder</span> of AI infrastructure • <span style={{ color: '#6b51e0' }}>Engineer</span> of production-grade services
              </p>
            </div>
            
            {/* Quick Stats */}
            <div 
              className="rounded px-4 py-3"
              style={{
                backgroundColor: '#0b0b0f',
                borderWidth: '1px',
                borderColor: '#1f1f28',
              }}
            >
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-mono" style={{ fontSize: '24px', color: '#e2e2e8' }}>5+</div>
                  <div className="font-mono" style={{ fontSize: '10px', color: '#757584' }}>YEARS EXP</div>
                </div>
                <div className="w-[1px] h-8" style={{ backgroundColor: '#1f1f28' }} />
                <div className="text-right">
                  <div className="font-mono" style={{ fontSize: '24px', color: '#e2e2e8' }}>50+</div>
                  <div className="font-mono" style={{ fontSize: '10px', color: '#757584' }}>PROJECTS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal-style bio */}
          <div
            className="rounded p-4 font-mono space-y-1"
            style={{
              backgroundColor: '#0b0b0f',
              borderWidth: '1px',
              borderColor: '#1f1f28',
              fontSize: '13px',
            }}
          >
            <div style={{ color: '#757584' }}>
              <span style={{ color: '#6b51e0' }}>$</span> cat introduction.txt
            </div>
            <div style={{ color: '#9d9db0', lineHeight: '1.6' }}>
              Specialized in designing and implementing <span style={{ color: '#e2e2e8' }}>distributed systems</span>, 
              <span style={{ color: '#e2e2e8' }}> AI/ML infrastructure</span>, and <span style={{ color: '#e2e2e8' }}>high-throughput APIs</span>. 
              Experienced with Python, Go, and cloud-native architectures. Passionate about building reliable, 
              observable systems that scale.
            </div>
            <div style={{ color: '#757584', marginTop: '12px' }}>
              <span style={{ color: '#6b51e0' }}>$</span> ./get-stack.sh
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Python', 'Go', 'FastAPI', 'Kubernetes', 'PostgreSQL', 'Redis', 'Docker', 'Kafka', 'AWS', 'GCP'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded"
                  style={{
                    backgroundColor: '#14141c',
                    borderWidth: '1px',
                    borderColor: '#1f1f28',
                    color: '#9d9db0',
                    fontSize: '11px',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded transition-all duration-200"
              style={{
                backgroundColor: '#6b51e0',
                color: '#e2e2e8',
                fontSize: '14px',
              }}
            >
              View Projects →
            </button>
            <button
              className="px-4 py-2 rounded transition-all duration-200"
              style={{
                backgroundColor: '#14141c',
                borderWidth: '1px',
                borderColor: '#1f1f28',
                color: '#e2e2e8',
                fontSize: '14px',
              }}
            >
              Download Resume
            </button>
            <button
              className="px-4 py-2 rounded transition-all duration-200"
              style={{
                backgroundColor: 'transparent',
                borderWidth: '1px',
                borderColor: '#1f1f28',
                color: '#e2e2e8',
                fontSize: '14px',
              }}
            >
              Contact
            </button>
          </div>
        </div>

        {/* Console Input */}
        <div className="mt-6">
          <ConsoleInput />
        </div>
      </div>

      {/* Dashboard Panels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Projects"
          value="12"
          icon={<Code className="w-5 h-5" />}
          subtitle="active repositories"
          trend="↑ 2 this month"
        />
        <DashboardCard
          title="Blog Posts"
          value="8"
          icon={<FileText className="w-5 h-5" />}
          subtitle="technical articles"
          trend="↑ 1 recently"
        />
        <DashboardCard
          title="System Designs"
          value="5"
          icon={<Layers className="w-5 h-5" />}
          subtitle="architecture diagrams"
        />
        <DashboardCard
          title="Uptime"
          value="99.8%"
          icon={<Activity className="w-5 h-5" />}
          subtitle="system availability"
          trend="↑ 0.2% improvement"
        />
      </div>

      {/* Current Focus Panel */}
      <div
        className="rounded-lg p-6"
        style={{
          backgroundColor: '#14141c',
          borderWidth: '1px',
          borderColor: '#1f1f28',
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5" style={{ color: '#6b51e0' }} />
          <span className="font-mono uppercase tracking-wider" style={{ fontSize: '11px', color: '#757584' }}>
            Current Focus
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="mb-2" style={{ color: '#e2e2e8' }}>Learning</h4>
            <ul className="space-y-1 font-mono" style={{ fontSize: '13px', color: '#757584' }}>
              <li>• LLM fine-tuning</li>
              <li>• Vector databases</li>
              <li>• Distributed tracing</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2" style={{ color: '#e2e2e8' }}>Building</h4>
            <ul className="space-y-1 font-mono" style={{ fontSize: '13px', color: '#757584' }}>
              <li>• AI model serving API</li>
              <li>• Real-time analytics</li>
              <li>• Job queue system</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2" style={{ color: '#e2e2e8' }}>Exploring</h4>
            <ul className="space-y-1 font-mono" style={{ fontSize: '13px', color: '#757584' }}>
              <li>• Kubernetes operators</li>
              <li>• Event sourcing</li>
              <li>• CQRS patterns</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Log Panel */}
      <LogPanel />
    </div>
  );
}

function Projects() {
  const projects = [
    {
      name: 'AI Model API Gateway',
      description: 'High-performance API gateway for serving multiple ML models with load balancing, caching, and rate limiting.',
      stack: ['FastAPI', 'Redis', 'PostgreSQL', 'Docker', 'NGINX'],
      status: 'building' as const,
      github: '#',
      details: '#',
    },
    {
      name: 'Distributed Job Queue',
      description: 'Fault-tolerant job queue system with priority scheduling, retry logic, and dead letter queues.',
      stack: ['Python', 'RabbitMQ', 'Celery', 'MongoDB', 'Prometheus'],
      status: 'done' as const,
      github: '#',
      details: '#',
    },
    {
      name: 'Vector Search Engine',
      description: 'Semantic search service using embeddings with fast similarity search and hybrid ranking.',
      stack: ['Python', 'Qdrant', 'Sentence-Transformers', 'FastAPI'],
      status: 'building' as const,
      github: '#',
      details: '#',
    },
    {
      name: 'Real-time Analytics Pipeline',
      description: 'Streaming data pipeline for processing and analyzing events in real-time with minimal latency.',
      stack: ['Kafka', 'Spark', 'TimescaleDB', 'Grafana', 'Python'],
      status: 'done' as const,
      github: '#',
      details: '#',
    },
    {
      name: 'Microservices Platform',
      description: 'Full microservices architecture with service mesh, observability, and CI/CD automation.',
      stack: ['Go', 'Kubernetes', 'Istio', 'Terraform', 'ArgoCD'],
      status: 'building' as const,
      github: '#',
      details: '#',
    },
    {
      name: 'Cache Layer Service',
      description: 'Intelligent caching layer with automatic invalidation, TTL management, and cache warming.',
      stack: ['Redis', 'Node.js', 'Express', 'Docker'],
      status: 'done' as const,
      github: '#',
      details: '#',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 style={{ color: '#e2e2e8', fontSize: '32px', marginBottom: '8px' }}>
          Projects
        </h1>
        <p style={{ color: '#757584', fontSize: '14px' }}>
          Backend systems, APIs, and infrastructure projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </div>
  );
}

function SystemDesign() {
  return (
    <div className="space-y-8">
      <div>
        <h1 style={{ color: '#e2e2e8', fontSize: '32px', marginBottom: '8px' }}>
          System Design
        </h1>
        <p style={{ color: '#757584', fontSize: '14px' }}>
          Architecture diagrams and system design documentation
        </p>
      </div>
      <div className="text-center py-20" style={{ color: '#757584' }}>
        System design content coming soon...
      </div>
    </div>
  );
}

function Blog() {
  return (
    <div className="space-y-8">
      <div>
        <h1 style={{ color: '#e2e2e8', fontSize: '32px', marginBottom: '8px' }}>
          Blog
        </h1>
        <p style={{ color: '#757584', fontSize: '14px' }}>
          Technical articles and insights
        </p>
      </div>
      <div className="text-center py-20" style={{ color: '#757584' }}>
        Blog posts coming soon...
      </div>
    </div>
  );
}

function Lab() {
  return (
    <div className="space-y-8">
      <div>
        <h1 style={{ color: '#e2e2e8', fontSize: '32px', marginBottom: '8px' }}>
          Lab
        </h1>
        <p style={{ color: '#757584', fontSize: '14px' }}>
          Experiments and prototypes
        </p>
      </div>
      <div className="text-center py-20" style={{ color: '#757584' }}>
        Lab experiments coming soon...
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="space-y-8">
      <div>
        <h1 style={{ color: '#e2e2e8', fontSize: '32px', marginBottom: '8px' }}>
          About
        </h1>
        <p style={{ color: '#757584', fontSize: '14px' }}>
          Background and contact information
        </p>
      </div>
      <div className="text-center py-20" style={{ color: '#757584' }}>
        About content coming soon...
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const navLinks: { id: PageType; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'system-design', label: 'System Design' },
    { id: 'blog', label: 'Blog' },
    { id: 'lab', label: 'Lab' },
    { id: 'about', label: 'About' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <Projects />;
      case 'system-design':
        return <SystemDesign />;
      case 'blog':
        return <Blog />;
      case 'lab':
        return <Lab />;
      case 'about':
        return <About />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0b0b0f' }}>
      {/* Top Navigation */}
      <nav className="border-b" style={{ borderColor: '#1f1f28' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className="flex items-center gap-2 group"
            >
              <div 
                className="w-8 h-8 rounded flex items-center justify-center transition-all duration-200"
                style={{ 
                  backgroundColor: '#14141c',
                  borderWidth: '1px',
                  borderColor: '#1f1f28',
                }}
              >
                <Terminal className="w-4 h-4" style={{ color: '#6b51e0' }} />
              </div>
              <span className="font-mono" style={{ color: '#e2e2e8' }}>ai.backend</span>
            </button>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setCurrentPage(link.id)}
                    className="px-3 py-2 rounded transition-all duration-200 relative group"
                    style={{
                      color: isActive ? '#e2e2e8' : '#757584',
                      backgroundColor: isActive ? '#1a1a24' : 'transparent',
                    }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <div 
                        className="absolute inset-0 rounded opacity-30"
                        style={{ 
                          boxShadow: '0 0 10px rgba(107, 81, 224, 0.3)',
                          backgroundColor: 'rgba(107, 81, 224, 0.1)',
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>

      {/* Assistant Button */}
      <AssistantButton />
    </div>
  );
}