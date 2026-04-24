import { Activity, Code, FileText, Layers, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DashboardCard } from '../components/DashboardCard';
import { LogPanel } from '../components/LogPanel';
import { ConsoleInput } from '../components/ConsoleInput';
import { LoadingPage } from '../components/LoadingSpinner';
import { dashboardAPI, profileAPI } from '../../lib/api';
import { fallbackDashboard, fallbackProfile } from '../../lib/fallbackData';

interface DashboardData {
  projects_count: number;
  blog_posts_count: number;
  system_designs_count: number;
  lab_experiments_count: number;
  uptime_percentage: number;
  total_views: number;
}

interface ProfileData {
  full_name: string;
  job_title: string;
  tagline: string;
  current_learning: string[];
  current_building: string[];
  current_exploring: string[];
}

export function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData>(fallbackDashboard);
  const [profile, setProfile] = useState<ProfileData>(fallbackProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardRes, profileRes] = await Promise.all([
          dashboardAPI.get(),
          profileAPI.get(),
        ]);
        setDashboard(dashboardRes.data);
        setProfile(profileRes.data);
      } catch (error) {
        // API not configured or unreachable — fallback data is already set
        console.info('API unavailable, using fallback data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingPage message="Loading dashboard..." />;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-6">
        <div>
          <h1 
            className="mb-2"
            style={{ 
              fontSize: '42px',
              color: '#e2e2e8',
              letterSpacing: '-0.02em',
            }}
          >
            {profile.full_name}
          </h1>
          <p 
            className="mb-6"
            style={{ 
              fontSize: '16px',
              color: '#757584',
              maxWidth: '600px',
            }}
          >
            {profile.tagline}
          </p>
        </div>

        {/* Console Input */}
        <ConsoleInput />
      </div>

      {/* Dashboard Panels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Projects"
          value={dashboard.projects_count.toString()}
          icon={<Code className="w-5 h-5" />}
          subtitle="active repositories"
        />
        <DashboardCard
          title="Blog Posts"
          value={dashboard.blog_posts_count.toString()}
          icon={<FileText className="w-5 h-5" />}
          subtitle="technical articles"
        />
        <DashboardCard
          title="System Designs"
          value={dashboard.system_designs_count.toString()}
          icon={<Layers className="w-5 h-5" />}
          subtitle="architecture diagrams"
        />
        <DashboardCard
          title="Uptime"
          value={`${dashboard.uptime_percentage.toFixed(1)}%`}
          icon={<Activity className="w-5 h-5" />}
          subtitle="system availability"
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
              {profile.current_learning.map((item, i) => <li key={i}>• {item}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="mb-2" style={{ color: '#e2e2e8' }}>Building</h4>
            <ul className="space-y-1 font-mono" style={{ fontSize: '13px', color: '#757584' }}>
              {profile.current_building.map((item, i) => <li key={i}>• {item}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="mb-2" style={{ color: '#e2e2e8' }}>Exploring</h4>
            <ul className="space-y-1 font-mono" style={{ fontSize: '13px', color: '#757584' }}>
              {profile.current_exploring.map((item, i) => <li key={i}>• {item}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Log Panel */}
      <LogPanel />
    </div>
  );
}
