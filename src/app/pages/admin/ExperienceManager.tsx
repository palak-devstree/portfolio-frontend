import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';
import { experienceAPI } from '../../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { ArrowLeft, Plus, Edit, Trash2, X, Save, CheckCircle, Briefcase } from 'lucide-react';

interface Experience {
  id: number;
  company: string;
  position: string;
  company_url?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  description_points: string[];
  technologies: string[];
  project_urls: string[];
  display_order: number;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

const emptyForm = (): Omit<Experience, 'id'> => ({
  company: '',
  position: '',
  company_url: '',
  location: '',
  start_date: '',
  end_date: '',
  description: '',
  description_points: [],
  technologies: [],
  project_urls: [],
  display_order: 0,
  image_url: '',
});

export function ExperienceManager() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience[]>([]);
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
    fetchExperience();
  }, [isAuthenticated, navigate]);

  const fetchExperience = async () => {
    try {
      const res = await experienceAPI.list();
      setExperience(res.data);
    } catch {
      setError('Failed to load experience records');
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

  const openEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setForm({
      company: exp.company,
      position: exp.position,
      company_url: exp.company_url ?? '',
      location: exp.location ?? '',
      start_date: exp.start_date ?? '',
      end_date: exp.end_date ?? '',
      description: exp.description ?? '',
      description_points: exp.description_points,
      technologies: exp.technologies,
      project_urls: exp.project_urls,
      display_order: exp.display_order,
      image_url: exp.image_url ?? '',
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
      if (editingId !== null) {
        const res = await experienceAPI.update(editingId, form);
        setExperience(experience.map(exp => exp.id === editingId ? res.data : exp));
        setSuccess('Experience record updated successfully!');
      } else {
        const res = await experienceAPI.create(form);
        setExperience([...experience, res.data]);
        setSuccess('Experience record created successfully!');
      }
      setShowForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save experience record');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this experience record?')) return;
    try {
      await experienceAPI.delete(id);
      setExperience(experience.filter(e => e.id !== id));
      setSuccess('Deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete');
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
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8" style={{ color: '#6b51e0' }} />
              <h1 className="text-3xl font-bold" style={{ color: '#e2e2e8' }}>Experience</h1>
            </div>
            <Button onClick={openCreate} className="flex items-center gap-2" style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4" />
              Add Experience
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
                {editingId !== null ? 'Edit Experience' : 'New Experience'}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ color: '#757584' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Company *</Label>
                  <Input
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    required
                    placeholder="Company Name"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Position *</Label>
                  <Input
                    value={form.position}
                    onChange={e => setForm({ ...form, position: e.target.value })}
                    required
                    placeholder="Software Engineer"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Company URL</Label>
                  <Input
                    value={form.company_url}
                    onChange={e => setForm({ ...form, company_url: e.target.value })}
                    placeholder="https://company.com"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Location</Label>
                  <Input
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    placeholder="City, Country"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Start Date</Label>
                  <Input
                    value={form.start_date}
                    onChange={e => setForm({ ...form, start_date: e.target.value })}
                    placeholder="Jan 2020"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>End Date</Label>
                  <Input
                    value={form.end_date}
                    onChange={e => setForm({ ...form, end_date: e.target.value })}
                    placeholder="Present or Dec 2022"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Display Order</Label>
                  <Input
                    type="number"
                    value={form.display_order}
                    onChange={e => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                    min="0"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
              </div>
              <div>
                <Label style={{ color: '#9d9db0' }}>Description Points (one per line)</Label>
                <Textarea
                  value={form.description_points.join('\n')}
                  onChange={e => {
                    const lines = e.target.value.split('\n');
                    setForm({ ...form, description_points: lines });
                  }}
                  onBlur={e => {
                    const cleaned = e.target.value.split('\n').map(s => s.trim()).filter(Boolean);
                    setForm({ ...form, description_points: cleaned });
                  }}
                  rows={4}
                  placeholder="Press Enter for new line&#10;Each line becomes a bullet point"
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
                <p className="text-xs mt-1" style={{ color: '#757584' }}>
                  {form.description_points.filter(p => p.trim()).length} points
                </p>
              </div>
              <div>
                <Label style={{ color: '#9d9db0' }}>Technologies (comma-separated)</Label>
                <Input
                  value={form.technologies.join(', ')}
                  onChange={e => {
                    const items = e.target.value.split(',').map(s => s.trim());
                    setForm({ ...form, technologies: items });
                  }}
                  onBlur={e => {
                    const cleaned = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setForm({ ...form, technologies: cleaned });
                  }}
                  placeholder="React, Node.js, PostgreSQL"
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
                <p className="text-xs mt-1" style={{ color: '#757584' }}>
                  {form.technologies.filter(t => t.trim()).length} technologies
                </p>
              </div>
              <div>
                <Label style={{ color: '#9d9db0' }}>Project URLs (one per line, optional)</Label>
                <Textarea
                  value={form.project_urls.join('\n')}
                  onChange={e => {
                    const lines = e.target.value.split('\n');
                    setForm({ ...form, project_urls: lines });
                  }}
                  onBlur={e => {
                    const cleaned = e.target.value.split('\n').map(s => s.trim()).filter(Boolean);
                    setForm({ ...form, project_urls: cleaned });
                  }}
                  rows={2}
                  placeholder="Press Enter for new line&#10;https://project1.com&#10;https://project2.com"
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
                <p className="text-xs mt-1" style={{ color: '#757584' }}>
                  {form.project_urls.filter(u => u.trim()).length} URLs
                </p>
              </div>
              <div>
                <ImageUpload
                  value={form.image_url}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  imageType="experience"
                  label="Company Logo (Optional)"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} style={{ borderColor: '#1f1f28', color: '#9d9db0' }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="flex items-center gap-2" style={{ backgroundColor: '#6b51e0' }}>
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        {experience.length === 0 ? (
          <div className="p-12 rounded-lg border text-center" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
            <Briefcase className="w-12 h-12 mx-auto mb-4" style={{ color: '#757584' }} />
            <p className="mb-4" style={{ color: '#757584' }}>No experience records yet</p>
            <Button onClick={openCreate} style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Experience
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {experience.map(exp => (
              <div key={exp.id} className="p-6 rounded-lg border" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {exp.image_url && (
                        <img 
                          src={exp.image_url} 
                          alt={exp.company}
                          className="w-16 h-16 rounded object-cover"
                          style={{ borderColor: '#1f1f28' }}
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold" style={{ color: '#e2e2e8' }}>{exp.company}</h3>
                        <p className="text-lg mb-1" style={{ color: '#6b51e0' }}>{exp.position}</p>
                        <div className="flex items-center gap-3 text-sm mb-3" style={{ color: '#757584' }}>
                          {exp.start_date && <span>{exp.start_date} - {exp.end_date || 'Present'}</span>}
                          {exp.location && <span>• {exp.location}</span>}
                        </div>
                        {exp.description_points.length > 0 && (
                          <ul className="space-y-1 mb-3">
                            {exp.description_points.map((point, i) => (
                              <li key={i} className="text-sm flex gap-2" style={{ color: '#9d9db0' }}>
                                <span style={{ color: '#6b51e0' }}>▸</span>{point}
                              </li>
                            ))}
                          </ul>
                        )}
                        {exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <span key={i} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#1a1a24', color: '#6b51e0' }}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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
