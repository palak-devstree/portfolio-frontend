import { Code, Database, GitBranch, Server, Zap } from 'lucide-react';

export function About() {
  const techStack = [
    { category: 'Backend', items: ['Python', 'Go', 'Node.js', 'Rust'] },
    { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Cassandra'] },
    { category: 'Message Queues', items: ['Kafka', 'RabbitMQ', 'NATS', 'Redis Streams'] },
    { category: 'Infrastructure', items: ['Kubernetes', 'Docker', 'Terraform', 'AWS'] },
    { category: 'Monitoring', items: ['Prometheus', 'Grafana', 'ELK Stack', 'Jaeger'] },
    { category: 'AI/ML', items: ['PyTorch', 'HuggingFace', 'LangChain', 'FastAPI'] },
  ];

  const lifecycle = [
    { icon: <Zap className="w-5 h-5" />, label: 'Idea', description: 'Problem identification' },
    { icon: <GitBranch className="w-5 h-5" />, label: 'Design', description: 'System architecture' },
    { icon: <Code className="w-5 h-5" />, label: 'Backend', description: 'Implementation' },
    { icon: <Server className="w-5 h-5" />, label: 'Deploy', description: 'Production release' },
    { icon: <Database className="w-5 h-5" />, label: 'Monitor', description: 'Observability' },
    { icon: <Zap className="w-5 h-5" />, label: 'Improve', description: 'Optimization' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 style={{ color: '#e2e2e8', fontSize: '32px', marginBottom: '8px' }}>
          About
        </h1>
        <p style={{ color: '#757584', fontSize: '14px' }}>
          AI Backend Engineer focused on scalable systems
        </p>
      </div>

      {/* Bio */}
      <div
        className="rounded-lg p-6"
        style={{
          backgroundColor: '#14141c',
          borderWidth: '1px',
          borderColor: '#1f1f28',
        }}
      >
        <p style={{ color: '#e2e2e8', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
          Backend engineer specializing in building scalable systems, AI services, and distributed architectures. 
          Passionate about the full product lifecycle from ideation to production monitoring.
        </p>
        <p style={{ color: '#757584', fontSize: '14px', lineHeight: '1.8' }}>
          I believe in building systems that are not just functional, but observable, maintainable, and performant. 
          Every service should be monitored, every API should be documented, and every system should gracefully handle failure.
        </p>
      </div>

      {/* Product Lifecycle */}
      <div
        className="rounded-lg p-6"
        style={{
          backgroundColor: '#14141c',
          borderWidth: '1px',
          borderColor: '#1f1f28',
        }}
      >
        <h3 className="mb-4" style={{ color: '#e2e2e8' }}>
          Full Product Lifecycle
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {lifecycle.map((stage, i) => (
            <div key={i} className="text-center">
              <div
                className="w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center"
                style={{
                  backgroundColor: '#0b0b0f',
                  borderWidth: '1px',
                  borderColor: '#1f1f28',
                  color: '#6b51e0',
                }}
              >
                {stage.icon}
              </div>
              <div className="font-mono mb-1" style={{ fontSize: '13px', color: '#e2e2e8' }}>
                {stage.label}
              </div>
              <div className="font-mono" style={{ fontSize: '11px', color: '#4a4a58' }}>
                {stage.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Currently Learning */}
        <div
          className="rounded-lg p-6"
          style={{
            backgroundColor: '#14141c',
            borderWidth: '1px',
            borderColor: '#1f1f28',
          }}
        >
          <h3 className="mb-4" style={{ color: '#e2e2e8' }}>
            Currently Learning
          </h3>
          <ul className="space-y-2 font-mono" style={{ fontSize: '14px', color: '#757584' }}>
            <li className="flex items-center gap-2">
              <span style={{ color: '#6b51e0' }}>→</span>
              LLM fine-tuning and optimization
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: '#6b51e0' }}>→</span>
              Vector databases and embeddings
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: '#6b51e0' }}>→</span>
              Distributed tracing systems
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: '#6b51e0' }}>→</span>
              Kubernetes operators
            </li>
          </ul>
        </div>

        {/* Currently Building */}
        <div
          className="rounded-lg p-6"
          style={{
            backgroundColor: '#14141c',
            borderWidth: '1px',
            borderColor: '#1f1f28',
          }}
        >
          <h3 className="mb-4" style={{ color: '#e2e2e8' }}>
            Currently Building
          </h3>
          <ul className="space-y-2 font-mono" style={{ fontSize: '14px', color: '#757584' }}>
            <li className="flex items-center gap-2">
              <span style={{ color: '#6b51e0' }}>→</span>
              AI model serving API
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: '#6b51e0' }}>→</span>
              Real-time analytics pipeline
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: '#6b51e0' }}>→</span>
              Distributed job queue system
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: '#6b51e0' }}>→</span>
              Monitoring dashboard
            </li>
          </ul>
        </div>
      </div>

      {/* Tech Stack */}
      <div
        className="rounded-lg p-6"
        style={{
          backgroundColor: '#14141c',
          borderWidth: '1px',
          borderColor: '#1f1f28',
        }}
      >
        <h3 className="mb-4" style={{ color: '#e2e2e8' }}>
          Tech Stack
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((category, i) => (
            <div key={i}>
              <h4 
                className="font-mono uppercase tracking-wider mb-3"
                style={{ fontSize: '11px', color: '#6b51e0' }}
              >
                {category.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, j) => (
                  <span
                    key={j}
                    className="px-2 py-1 rounded font-mono"
                    style={{
                      backgroundColor: '#0b0b0f',
                      borderWidth: '1px',
                      borderColor: '#1f1f28',
                      color: '#757584',
                      fontSize: '12px',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div
        className="rounded-lg p-6"
        style={{
          backgroundColor: '#14141c',
          borderWidth: '1px',
          borderColor: '#1f1f28',
        }}
      >
        <h3 className="mb-4" style={{ color: '#e2e2e8' }}>
          Interests
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="mb-2 font-mono" style={{ fontSize: '13px', color: '#e2e2e8' }}>
              Technical
            </h4>
            <ul className="space-y-1 font-mono" style={{ fontSize: '13px', color: '#757584' }}>
              <li>• System design and architecture</li>
              <li>• Performance optimization</li>
              <li>• Distributed systems</li>
              <li>• AI/ML infrastructure</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-mono" style={{ fontSize: '13px', color: '#e2e2e8' }}>
              Process
            </h4>
            <ul className="space-y-1 font-mono" style={{ fontSize: '13px', color: '#757584' }}>
              <li>• DevOps and CI/CD</li>
              <li>• Observability and monitoring</li>
              <li>• Documentation practices</li>
              <li>• Code review culture</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
