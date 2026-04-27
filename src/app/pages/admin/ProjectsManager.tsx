import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';
import { projectsAPI } from '../../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ArrowLeft, Plus, Edit, Trash2, ExternalLink, X, Save, CheckCircle } from 'lucide-react';

type ProjectStatus = 'building' | 'done' | 'planned' | 'exploring';

interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  stack: string[];
  github_url?: string;
  details_url?: string;
  github_stars: number;
  github_forks: number;
  featured: boolean;
  display_order: number;
  last_commit_date?: string;
  created_at?: string;
}

const emptyForm = (): Omit<Project, 'id'> => ({
  name: '',
  description: '',
  status: 'building',
  stack: [],
  github_url: '',
  details_url: '',
  github_stars: 0,
  github_forks: 0,
  featured: false,
  display_order: 0,
  last_commit_date: '',
});

const statusColors: Record<ProjectStatus, string> = {
  building: '#6b51e0',
  done: '#10b981',
  planned: '#757584',
  exploring: '#f59e0b',
};

export function ProjectsManager() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchProjects();
  }, [isAuthenticated, navigate]);

  const fetchProjects = async () => {
    try {
      const res = await projectsAPI.list();
      setProjects(res.data);
    } catch {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const openEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      description: p.description,
      status: p.status,
      stack: p.stack,
      github_url: p.github_url ?? '',
      details_url: p.details_url ?? '',
      github_stars: p.github_stars,
      github_forks: p.github_forks,
      featured: p.featured,
      display_order: p.display_order,
      last_commit_date: p.last_commit_date ?? '',
    });
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        github_url: form.github_url || undefined,
        details_url: form.details_url || undefined,
        last_commit_date: form.last_commit_date || undefined,
      };
      if (editingId !== null) {
        const res = await projectsAPI.update(editingId, payload);
        setProjects(projects.map(p => p.id === editingId ? res.data : p));
        setSuccess('Project updated successfully!');
      } else {
        const res = await projectsAPI.create(payload);
        setProjects([...projects, res.data]);
        setSuccess('Project created successfully!');
      }
      setShowForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    try {
      await projectsAPI.delete(id);
      setProjects(projects.filter(p => p.id !== id));
      setSuccess('Deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0b0b0f' }}>
        <div style={{ color: '#757584' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0b0b0f' }}>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Link to="/admin/dashboard" className="flex items-center gap-2 mb-4 hover:underline" style={{ color: '#757584' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold" style={{ color: '#e2e2e8' }}>Manage Projects</h1>
            <Button onClick={openCreate} className="flex items-center gap-2" style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </div>
        </div>

        {error && (
          <Alert className="mb-4" style={{ backgroundColor: '#1a1a24', borderColor: '#ef4444' }}>
            <AlertDescription style={{ color: '#ef4444' }}>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4" style={{ backgroundColor: '#1a1a24', borderColor: '#10b981' }}>
            <AlertDescription className="flex items-center gap-2" style={{ color: '#10b981' }}>
              <CheckCircle className="w-4 h-4" />
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Form */}
        {showForm && (
          <div className="mb-6 p-6 rounded-lg border" style={{ backgroundColor: '#14141c', borderColor: '#6b51e0' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold" style={{ color: '#e2e2e8' }}>
                {editingId !== null ? 'Edit Project' : 'New Project'}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ color: '#757584' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Project Name</Label>
                  <Input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Status</Label>
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value as ProjectStatus })}
                    className="w-full px-3 py-2 rounded border"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  >
                    <option value="building">Building</option>
                    <option value="done">Done</option>
                    <option value="planned">Planned</option>
                    <option value="exploring">Exploring</option>
                  </select>
                </div>
              </div>
              <div>
                <Label style={{ color: '#9d9db0' }}>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  required
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>
              <div>
                <Label style={{ color: '#9d9db0' }}>Tech Stack (comma-separated)</Label>
                <Input
                  value={form.stack.join(', ')}
                  onChange={e => setForm({ ...form, stack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="FastAPI, Redis, PostgreSQL, Docker"
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>GitHub URL</Label>
                  <Input
                    value={form.github_url}
                    onChange={e => setForm({ ...form, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Live / Details URL</Label>
                  <Input
                    value={form.details_url}
                    onChange={e => setForm({ ...form, details_url: e.target.value })}
                    placeholder="https://..."
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>GitHub Stars</Label>
                  <Input
                    type="number"
                    value={form.github_stars}
                    onChange={e => setForm({ ...form, github_stars: parseInt(e.target.value) || 0 })}
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>GitHub Forks</Label>
                  <Input
                    type="number"
                    value={form.github_forks}
                    onChange={e => setForm({ ...form, github_forks: parseInt(e.target.value) || 0 })}
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Display Order</Label>
                  <Input
                    type="number"
                    value={form.display_order}
                    onChange={e => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Last Commit Date</Label>
                  <Input
                    type="date"
                    value={form.last_commit_date}
                    onChange={e => setForm({ ...form, last_commit_date: e.target.value })}
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={e => setForm({ ...form, featured: e.target.checked })}
                  style={{ accentColor: '#6b51e0' }}
                />
                <Label htmlFor="featured" style={{ color: '#9d9db0', cursor: 'pointer' }}>Featured project</Label>
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} style={{ borderColor: '#1f1f28', color: '#9d9db0' }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="flex items-center gap-2" style={{ backgroundColor: '#6b51e0' }}>
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Project'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        {projects.length === 0 ? (
          <div className="p-12 rounded-lg border text-center" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
            <p className="mb-4" style={{ color: '#757584' }}>No projects yet</p>
            <Button onClick={openCreate} style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {projects.map(project => (
              <div key={project.id} className="p-6 rounded-lg border" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-semibold" style={{ color: '#e2e2e8' }}>{project.name}</h3>
                      <span
                        className="px-2 py-0.5 rounded text-xs capitalize"
                        style={{
                          backgroundColor: statusColors[project.status] + '22',
                          color: statusColors[project.status],
                          border: `1px solid ${statusColors[project.status]}44`,
                        }}
                      >
                        {project.status}
                      </span>
                      {project.featured && (
                        <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#f59e0b22', color: '#f59e0b', border: '1px solid #f59e0b44' }}>
                          featured
                        </span>
                      )}
                    </div>
                    <p className="mb-3" style={{ color: '#9d9db0' }}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.stack.map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#1a1a24', color: '#6b51e0' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 text-xs" style={{ color: '#757584' }}>
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                          <ExternalLink className="w-3 h-3" /> GitHub
                        </a>
                      )}
                      {project.details_url && (
                        <a href={project.details_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                          <ExternalLink className="w-3 h-3" /> Live
                        </a>
                      )}
                      <span>★ {project.github_stars}</span>
                      <span>⑂ {project.github_forks}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => openEdit(project)} style={{ borderColor: '#1f1f28', color: '#9d9db0' }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(project.id)} style={{ borderColor: '#1f1f28', color: '#ef4444' }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
