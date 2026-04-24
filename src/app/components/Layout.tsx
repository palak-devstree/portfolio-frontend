import { Link, useLocation } from 'react-router';
import { Terminal } from 'lucide-react';
import { AssistantButton } from './AssistantButton';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/projects', label: 'Projects' },
    { path: '/system-design', label: 'System Design' },
    { path: '/blog', label: 'Blog' },
    { path: '/lab', label: 'Lab' },
    { path: '/metrics', label: 'Metrics' },
    { path: '/about', label: 'About' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0b0b0f' }}>
      {/* Top Navigation */}
      <nav className="border-b" style={{ borderColor: '#1f1f28' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
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
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
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
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Assistant Button */}
      <AssistantButton />
    </div>
  );
}