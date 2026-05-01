import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';
import { systemDesignsAPI } from '../../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { ArrowLeft, Plus, Edit, Trash2, X, Save, CheckCircle } from 'lucide-react';

type ComplexityLevel = 'beginner' | 'intermediate' | 'advanced';

interface SystemDesign {
  id: number;
  title: string;
  description: string;
  stack: string[];
  notes: string[];
  diagram_url?: string;
  diagram_type?: string;
  complexity_level: ComplexityLevel;
  created_at?: string;
  updated_at?: string;
}

const emptyForm = (): Omit<SystemDesign, 'id'> => ({
  title: '',
  description: '',
  stack: [],
  notes: [],
  diagram_url: '',
  diagram_type: '',
  complexity_level: 'intermediate',
});

export function SystemDesignsManager() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [designs, setDesigns] = useState<SystemDesign[]>([]);
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
    fetchDesigns();
  }, [isAuthenticated, navigate]);

  const fetchDesigns = async () => {
    try {
      const res = await systemDesignsAPI.list();
      setDesigns(res.data);
    } catch {
      setError('Failed to load system designs');
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

  const openEdit = (d: SystemDesign) => {
    setEditingId(d.id);
    setForm({
      title: d.title,
      description: d.description,
      stack: d.stack,
      notes: d.notes,
      diagram_url: d.diagram_url ?? '',
      diagram_type: d.diagram_type ?? '',
      complexity_level: d.complexity_level,
    });
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    // Clean up arrays before validation - remove empty items
    const cleanedStack = form.stack.map(s => s.trim()).filter(Boolean);
    const cleanedNotes = form.notes.map(n => n.trim()).filter(Boolean);

    // Frontend validation
    const errors: string[] = [];
    if (form.title.length < 5) errors.push('Title must be at least 5 characters');
    if (form.description.length < 20) errors.push('Description must be at least 20 characters');
    if (cleanedStack.length < 2) errors.push('Stack must have at least 2 technologies');
    if (cleanedNotes.length < 2) errors.push('Notes must have at least 2 items');
    cleanedNotes.forEach((note, i) => {
      if (note.length < 10) errors.push(`Note ${i + 1} must be at least 10 characters`);
    });

    if (errors.length > 0) {
      setError(errors.join('. '));
      setSaving(false);
      return;
    }

    // Use cleaned data for submission
    const submitData = { ...form, stack: cleanedStack, notes: cleanedNotes };

    try {
      if (editingId !== null) {
        const res = await systemDesignsAPI.update(editingId, submitData);
        setDesigns(designs.map(d => d.id === editingId ? res.data : d));
        setSuccess('System design updated successfully!');
      } else {
        const res = await systemDesignsAPI.create(submitData);
        setDesigns([...designs, res.data]);
        setSuccess('System design created successfully!');
      }
      setShowForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      // Parse backend validation errors
      if (err.response?.data?.detail && Array.isArray(err.response.data.detail)) {
        const backendErrors = err.response.data.detail.map((e: any) => {
          const field = e.loc?.slice(-1)[0] || 'field';
          return `${field}: ${e.msg}`;
        }).join('. ');
        setError(backendErrors);
      } else {
        setError(err.response?.data?.detail || 'Failed to save system design');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this system design?')) return;
    try {
      await systemDesignsAPI.delete(id);
      setDesigns(designs.filter(d => d.id !== id));
      setSuccess('Deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete');
    }
  };

  const complexityColors: Record<ComplexityLevel, string> = {
    beginner: '#10b981',
    intermediate: '#f59e0b',
    advanced: '#ef4444',
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
            <h1 className="text-3xl font-bold" style={{ color: '#e2e2e8' }}>System Designs</h1>
            <Button onClick={openCreate} className="flex items-center gap-2" style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4" />
              Add Design
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
                {editingId !== null ? 'Edit System Design' : 'New System Design'}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ color: '#757584' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label style={{ color: '#9d9db0' }}>
                  Title <span style={{ color: '#ef4444' }}>*</span>
                  <span className="text-xs ml-2" style={{ color: '#757584' }}>(min 5 chars)</span>
                </Label>
                <Input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                  minLength={5}
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>
              <div>
                <Label style={{ color: '#9d9db0' }}>
                  Description <span style={{ color: '#ef4444' }}>*</span>
                  <span className="text-xs ml-2" style={{ color: '#757584' }}>(min 20 chars)</span>
                </Label>
                <Textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  required
                  minLength={20}
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
                <p className="text-xs mt-1" style={{ color: '#757584' }}>
                  {form.description.length}/20 characters
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>
                    Tech Stack <span style={{ color: '#ef4444' }}>*</span>
                    <span className="text-xs ml-2" style={{ color: '#757584' }}>(min 2 items, comma-separated)</span>
                  </Label>
                  <Input
                    value={form.stack.join(', ')}
                    onChange={e => {
                      const items = e.target.value.split(',').map(s => s.trim());
                      setForm({ ...form, stack: items });
                    }}
                    onBlur={e => {
                      // Clean up on blur - remove empty items
                      const cleanedStack = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      setForm({ ...form, stack: cleanedStack });
                    }}
                    placeholder="Kafka, PostgreSQL, Redis"
                    required
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                  <p className="text-xs mt-1" style={{ color: '#757584' }}>
                    {form.stack.filter(s => s.trim()).length} items
                  </p>
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Complexity Level</Label>
                  <select
                    value={form.complexity_level}
                    onChange={e => setForm({ ...form, complexity_level: e.target.value as ComplexityLevel })}
                    className="w-full px-3 py-2 rounded border"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div>
                <Label style={{ color: '#9d9db0' }}>
                  Notes <span style={{ color: '#ef4444' }}>*</span>
                  <span className="text-xs ml-2" style={{ color: '#757584' }}>(min 2 items, each 10+ chars, one per line)</span>
                </Label>
                <Textarea
                  value={form.notes.join('\n')}
                  onChange={e => {
                    // Don't filter out empty strings during typing to allow newlines
                    const lines = e.target.value.split('\n');
                    setForm({ ...form, notes: lines });
                  }}
                  onBlur={e => {
                    // Clean up on blur - remove empty lines and trim
                    const cleanedNotes = e.target.value.split('\n').map(s => s.trim()).filter(Boolean);
                    setForm({ ...form, notes: cleanedNotes });
                  }}
                  rows={4}
                  required
                  placeholder="Press Enter for new line&#10;Each line becomes a note bullet (min 10 characters each)"
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
                <p className="text-xs mt-1" style={{ color: '#757584' }}>
                  {form.notes.filter(n => n.trim()).length} notes (non-empty lines)
                </p>
              </div>
              <div>
                <ImageUpload
                  value={form.diagram_url}
                  onChange={(url) => setForm({ ...form, diagram_url: url })}
                  imageType="diagram"
                  label="Diagram Image"
                />
                <p className="text-xs mt-1" style={{ color: '#757584' }}>
                  Upload a system design diagram or architecture image
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Diagram URL (or use upload above)</Label>
                  <Input
                    value={form.diagram_url}
                    onChange={e => setForm({ ...form, diagram_url: e.target.value })}
                    placeholder="https://..."
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Diagram Type (optional)</Label>
                  <Input
                    value={form.diagram_type}
                    onChange={e => setForm({ ...form, diagram_type: e.target.value })}
                    placeholder="mermaid, excalidraw, image"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} style={{ borderColor: '#1f1f28', color: '#9d9db0' }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="flex items-center gap-2" style={{ backgroundColor: '#6b51e0' }}>
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Design'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        {designs.length === 0 ? (
          <div className="p-12 rounded-lg border text-center" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
            <p className="mb-4" style={{ color: '#757584' }}>No system designs yet</p>
            <Button onClick={openCreate} style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Design
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {designs.map(d => (
              <div key={d.id} className="p-6 rounded-lg border" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-semibold" style={{ color: '#e2e2e8' }}>{d.title}</h3>
                      <span
                        className="px-2 py-0.5 rounded text-xs capitalize"
                        style={{ backgroundColor: complexityColors[d.complexity_level] + '22', color: complexityColors[d.complexity_level], border: `1px solid ${complexityColors[d.complexity_level]}44` }}
                      >
                        {d.complexity_level}
                      </span>
                    </div>
                    <p className="mb-3" style={{ color: '#9d9db0' }}>{d.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {d.stack.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#1a1a24', color: '#6b51e0' }}>{t}</span>
                      ))}
                    </div>
                    {d.notes.length > 0 && (
                      <ul className="space-y-1">
                        {d.notes.map((n, i) => (
                          <li key={i} className="text-sm flex gap-2" style={{ color: '#757584' }}>
                            <span style={{ color: '#6b51e0' }}>▸</span>{n}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => openEdit(d)} style={{ borderColor: '#1f1f28', color: '#9d9db0' }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(d.id)} style={{ borderColor: '#1f1f28', color: '#ef4444' }}>
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
