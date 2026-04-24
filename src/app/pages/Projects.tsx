import { useEffect, useState } from 'react';
import { projectsAPI } from '../../lib/api';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingPage } from '../components/LoadingSpinner';
import { fallbackProjects } from '../../lib/fallbackData';

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'building' | 'done' | 'planned';
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectsAPI.list();
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
        }
      } catch (err) {
        // API not configured or unreachable — fallback data is already set
        console.info('API unavailable, using fallback projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <LoadingPage message="Loading projects..." />;
  }

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
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            name={project.title}
            description={project.description}
            stack={project.tech_stack}
            status={project.status as any}
            github={project.github_url || ''}
            details={project.live_url || ''}
          />
        ))}
      </div>
    </div>
  );
}
