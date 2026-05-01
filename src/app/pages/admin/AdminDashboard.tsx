import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';
import { dashboardAPI, profileAPI } from '../../../lib/api';
import { 
  LayoutDashboard, 
  User, 
  FolderKanban, 
  FileText, 
  Layers, 
  FlaskConical,
  Mail,
  LogOut,
  GraduationCap,
  Briefcase,
  Award,
  RefreshCw
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';

interface DashboardData {
  projects_count: number;
  blog_posts_count: number;
  system_designs_count: number;
  lab_experiments_count: number;
  uptime_percentage: number;
  total_views: number;
}

interface ProfileData {
  show_blog: boolean;
  show_projects: boolean;
  show_system_designs: boolean;
  show_lab: boolean;
  show_about: boolean;
  show_education: boolean;
  show_certificates: boolean;
  show_experience: boolean;
}

export function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [dashRes, profileRes] = await Promise.all([
        dashboardAPI.get(),
        profileAPI.get()
      ]);
      setDashboard(dashRes.data);
      setProfile(profileRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await dashboardAPI.refresh();
      await fetchData();
    } catch (error) {
      console.error('Failed to refresh dashboard:', error);
      setRefreshing(false);
    }
  };

  const handleToggle = async (toggleName: string, value: boolean) => {
    try {
      const res = await profileAPI.updateToggles({ [toggleName]: value });
      setProfile(res.data);
    } catch (error) {
      console.error('Failed to update toggle:', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
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
    { icon: User, label: 'Profile', path: '/admin/profile', count: 1, toggleKey: null },
    { icon: Mail, label: 'Contact Messages', path: '/admin/contact', count: '?', toggleKey: null },
    { icon: FolderKanban, label: 'Projects', path: '/admin/projects', count: dashboard?.projects_count, toggleKey: 'show_projects' },
    { icon: FileText, label: 'Blog Posts', path: '/admin/blog', count: dashboard?.blog_posts_count, toggleKey: 'show_blog' },
    { icon: Layers, label: 'System Designs', path: '/admin/system-designs', count: dashboard?.system_designs_count, toggleKey: 'show_system_designs' },
    { icon: FlaskConical, label: 'Lab Experiments', path: '/admin/lab', count: dashboard?.lab_experiments_count, toggleKey: 'show_lab' },
    { icon: GraduationCap, label: 'Education', path: '/admin/education', count: '?', toggleKey: 'show_education' },
    { icon: Briefcase, label: 'Experience', path: '/admin/experience', count: '?', toggleKey: 'show_experience' },
    { icon: Award, label: 'Certificates', path: '/admin/certificates', count: '?', toggleKey: 'show_certificates' },
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
          <div className="flex items-center gap-3">
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline"
              className="flex items-center gap-2"
              style={{
                borderColor: '#1f1f28',
                color: '#9d9db0',
              }}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
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
            <div
              key={item.path}
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: '#14141c',
                borderColor: '#1f1f28',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <item.icon className="w-8 h-8" style={{ color: '#6b51e0' }} />
                <div className="flex items-center gap-3">
                  {item.toggleKey && profile && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: profile[item.toggleKey as keyof ProfileData] ? '#10b981' : '#757584' }}>
                        {profile[item.toggleKey as keyof ProfileData] ? 'ON' : 'OFF'}
                      </span>
                      <Switch
                        checked={profile[item.toggleKey as keyof ProfileData]}
                        onCheckedChange={(checked) => handleToggle(item.toggleKey!, checked)}
                      />
                    </div>
                  )}
                  <span className="text-3xl font-bold" style={{ color: '#e2e2e8' }}>
                    {item.count ?? 0}
                  </span>
                </div>
              </div>
              <Link to={item.path}>
                <h3 className="text-lg font-semibold hover:underline" style={{ color: '#e2e2e8' }}>
                  {item.label}
                </h3>
              </Link>
              <p className="text-sm mt-1" style={{ color: '#757584' }}>
                Manage {item.label.toLowerCase()}
              </p>
            </div>
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
