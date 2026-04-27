import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';
import { labAPI } from '../../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ArrowLeft, Plus, Edit, Trash2, X, Save, CheckCircle } from 'lucide-react';

type LabStatus = 'experimenting' | 'testing' | 'completed';

interface LabExperiment {
  id: number;
  title: string;
  description: string;
  stack: string[];
  status: LabStatus;
  findings?: string;
  created_at?: string;
  updated_at?: string;
}

const emptyForm = (): Omit<LabExperiment, 'id'> => ({
  title: '',
  description: '',
  stack: [],
  status: 'experimenting',
  findings: '',
});

export function LabManager() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [experiments, setExperiments] = useState<LabExperiment[]>([]);
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
    fetchExperiments();
  }, [isAuthenticated, navigate]);

  const fetchExperiments = async () => {
    try {
      const res = await labAPI.list();
      setExperiments(res.data);
    } catch {
      setError('Failed to load lab experiments');
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

  const openEdit = (exp: LabExperiment) => {
    setEditingId(exp.id);
    setForm({
      title: exp.title,
      description: exp.description,
      stack: exp.stack,
      status: exp.status,
      findings: exp.findings ?? '',
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
      const payload = { ...form, findings: form.findings || undefined };
      if (editingId !== null) {
        const res = await labAPI.update(editingId, payload);
        setExperiments(experiments.map(ex => ex.id === editingId ? res.data : ex));
        setSuccess('Experiment updated successfully!');
      } else {
        const res = await labAPI.create(payload);
        setExperiments([...experiments, res.data]);
        setSuccess('Experiment created successfully!');
      }
      setShowForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save experiment');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this experiment?')) return;
    try {
      await labAPI.delete(id);
      setExperiments(experiments.filter(ex => ex.id !== id));
      setSuccess('Deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete');
    }
  };

  const statusColors: Record<LabStatus, string> = {
    experimenting: '#6b51e0',
    testing: '#f59e0b',
    completed: '#10b981',
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
            <h1 className="text-3xl font-bold" style={{ color: '#e2e2e8' }}>Lab Experiments</h1>
            <Button onClick={openCreate} className="flex items-center gap-2" style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4" />
              New Experiment
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
                {editingId !== null ? 'Edit Experiment' : 'New Experiment'}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ color: '#757584' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label style={{ color: '#9d9db0' }}>Title</Label>
                <Input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Tech Stack (comma-separated)</Label>
                  <Input
                    value={form.stack.join(', ')}
                    onChange={e => setForm({ ...form, stack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    placeholder="Python, Redis, Go"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Status</Label>
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value as LabStatus })}
                    className="w-full px-3 py-2 rounded border"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  >
                    <option value="experimenting">Experimenting</option>
                    <option value="testing">Testing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <Label style={{ color: '#9d9db0' }}>Findings (optional)</Label>
                <Textarea
                  value={form.findings}
                  onChange={e => setForm({ ...form, findings: e.target.value })}
                  rows={3}
                  placeholder="Key results and observations..."
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} style={{ borderColor: '#1f1f28', color: '#9d9db0' }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="flex items-center gap-2" style={{ backgroundColor: '#6b51e0' }}>
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Experiment'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        {experiments.length === 0 ? (
          <div className="p-12 rounded-lg border text-center" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
            <p className="mb-4" style={{ color: '#757584' }}>No experiments yet</p>
            <Button onClick={openCreate} style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Experiment
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {experiments.map(exp => (
              <div key={exp.id} className="p-6 rounded-lg border" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-semibold" style={{ color: '#e2e2e8' }}>{exp.title}</h3>
                      <span
                        className="px-2 py-0.5 rounded text-xs capitalize"
                        style={{ backgroundColor: statusColors[exp.status] + '22', color: statusColors[exp.status], border: `1px solid ${statusColors[exp.status]}44` }}
                      >
                        {exp.status}
                      </span>
                    </div>
                    <p className="mb-3" style={{ color: '#9d9db0' }}>{exp.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {exp.stack.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#1a1a24', color: '#6b51e0' }}>{t}</span>
                      ))}
                    </div>
                    {exp.findings && (
                      <div className="mt-2 p-3 rounded" style={{ backgroundColor: '#0b0b0f', borderLeft: '2px solid #6b51e0' }}>
                        <p className="text-sm" style={{ color: '#9d9db0' }}>{exp.findings}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => openEdit(exp)} style={{ borderColor: '#1f1f28', color: '#9d9db0' }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(exp.id)} style={{ borderColor: '#1f1f28', color: '#ef4444' }}>
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
