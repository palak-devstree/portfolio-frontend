import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';
import { dashboardAPI } from '../../../lib/api';
import { 
  LayoutDashboard, 
  User, 
  FolderKanban, 
  FileText, 
  Layers, 
  FlaskConical,
  Mail,
  LogOut 
} from 'lucide-react';
import { Button } from '../../components/ui/button';

interface DashboardData {
  projects_count: number;
  blog_posts_count: number;
  system_designs_count: number;
  lab_experiments_count: number;
  uptime_percentage: number;
  total_views: number;
}

export function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await dashboardAPI.get();
        setDashboard(res.data);
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0b0b0f' }}>
        <div style={{ color: '#757584' }}>Loading...</div>
      </div>
    );
  }

  const menuItems = [
    { icon: User, label: 'Profile', path: '/admin/profile', count: 1 },
    { icon: Mail, label: 'Contact Messages', path: '/admin/contact', count: '?' },
    { icon: FolderKanban, label: 'Projects', path: '/admin/projects', count: dashboard?.projects_count },
    { icon: FileText, label: 'Blog Posts', path: '/admin/blog', count: dashboard?.blog_posts_count },
    { icon: Layers, label: 'System Designs', path: '/admin/system-designs', count: dashboard?.system_designs_count },
    { icon: FlaskConical, label: 'Lab Experiments', path: '/admin/lab', count: dashboard?.lab_experiments_count },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0b0b0f' }}>
      {/* Header */}
      <div 
        className="border-b"
        style={{ 
          backgroundColor: '#14141c',
          borderColor: '#1f1f28',
        }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6" style={{ color: '#6b51e0' }} />
            <h1 className="text-xl font-bold" style={{ color: '#e2e2e8' }}>
              Admin Panel
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
            style={{
              borderColor: '#1f1f28',
              color: '#9d9db0',
            }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#e2e2e8' }}>
            Content Management
          </h2>
          <p style={{ color: '#757584' }}>
            Manage your portfolio content and settings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="p-6 rounded-lg border transition-all hover:border-purple-500"
              style={{
                backgroundColor: '#14141c',
                borderColor: '#1f1f28',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <item.icon className="w-8 h-8" style={{ color: '#6b51e0' }} />
                <span className="text-3xl font-bold" style={{ color: '#e2e2e8' }}>
                  {item.count ?? 0}
                </span>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: '#e2e2e8' }}>
                {item.label}
              </h3>
              <p className="text-sm mt-1" style={{ color: '#757584' }}>
                Manage {item.label.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div 
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: '#14141c',
            borderColor: '#1f1f28',
          }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#e2e2e8' }}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/admin/projects">
              <Button className="w-full" style={{ backgroundColor: '#6b51e0' }}>
                Create New Project
              </Button>
            </Link>
            <Link to="/admin/blog">
              <Button className="w-full" style={{ backgroundColor: '#6b51e0' }}>
                Write Blog Post
              </Button>
            </Link>
            <Link to="/admin/system-designs">
              <Button className="w-full" style={{ backgroundColor: '#6b51e0' }}>
                Add System Design
              </Button>
            </Link>
            <Link to="/admin/lab">
              <Button className="w-full" style={{ backgroundColor: '#6b51e0' }}>
                Create Lab Experiment
              </Button>
            </Link>
          </div>
        </div>

        {/* Back to Portfolio */}
        <div className="mt-8 text-center">
          <a 
            href="/"
            className="text-sm hover:underline"
            style={{ color: '#757584' }}
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
