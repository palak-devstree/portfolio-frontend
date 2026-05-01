import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';
import { educationAPI } from '../../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { ArrowLeft, Plus, Edit, Trash2, X, Save, CheckCircle, GraduationCap } from 'lucide-react';

interface Education {
  id: number;
  institution: string;
  degree: string;
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  description_points: string[];
  location?: string;
  display_order: number;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

const emptyForm = (): Omit<Education, 'id'> => ({
  institution: '',
  degree: '',
  field_of_study: '',
  start_date: '',
  end_date: '',
  description: '',
  description_points: [],
  location: '',
  display_order: 0,
  image_url: '',
});

export function EducationManager() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [education, setEducation] = useState<Education[]>([]);
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
    fetchEducation();
  }, [isAuthenticated, navigate]);

  const fetchEducation = async () => {
    try {
      const res = await educationAPI.list();
      setEducation(res.data);
    } catch {
      setError('Failed to load education records');
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

  const openEdit = (e: Education) => {
    setEditingId(e.id);
    setForm({
      institution: e.institution,
      degree: e.degree,
      field_of_study: e.field_of_study ?? '',
      start_date: e.start_date ?? '',
      end_date: e.end_date ?? '',
      description: e.description ?? '',
      description_points: e.description_points,
      location: e.location ?? '',
      display_order: e.display_order,
      image_url: e.image_url ?? '',
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
        const res = await educationAPI.update(editingId, form);
        setEducation(education.map(ed => ed.id === editingId ? res.data : ed));
        setSuccess('Education record updated successfully!');
      } else {
        const res = await educationAPI.create(form);
        setEducation([...education, res.data]);
        setSuccess('Education record created successfully!');
      }
      setShowForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save education record');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this education record?')) return;
    try {
      await educationAPI.delete(id);
      setEducation(education.filter(e => e.id !== id));
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
              <GraduationCap className="w-8 h-8" style={{ color: '#6b51e0' }} />
              <h1 className="text-3xl font-bold" style={{ color: '#e2e2e8' }}>Education</h1>
            </div>
            <Button onClick={openCreate} className="flex items-center gap-2" style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4" />
              Add Education
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
                {editingId !== null ? 'Edit Education' : 'New Education'}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ color: '#757584' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Institution *</Label>
                  <Input
                    value={form.institution}
                    onChange={e => setForm({ ...form, institution: e.target.value })}
                    required
                    placeholder="University of Example"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Degree *</Label>
                  <Input
                    value={form.degree}
                    onChange={e => setForm({ ...form, degree: e.target.value })}
                    required
                    placeholder="Bachelor of Science"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Field of Study</Label>
                  <Input
                    value={form.field_of_study}
                    onChange={e => setForm({ ...form, field_of_study: e.target.value })}
                    placeholder="Computer Science"
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
                    placeholder="Sep 2018"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>End Date</Label>
                  <Input
                    value={form.end_date}
                    onChange={e => setForm({ ...form, end_date: e.target.value })}
                    placeholder="May 2022 or Present"
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
                <ImageUpload
                  value={form.image_url}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  imageType="education"
                  label="Institution Logo or Image (Optional)"
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
        {education.length === 0 ? (
          <div className="p-12 rounded-lg border text-center" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
            <GraduationCap className="w-12 h-12 mx-auto mb-4" style={{ color: '#757584' }} />
            <p className="mb-4" style={{ color: '#757584' }}>No education records yet</p>
            <Button onClick={openCreate} style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Education
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {education.map(e => (
              <div key={e.id} className="p-6 rounded-lg border" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {e.image_url && (
                        <img 
                          src={e.image_url} 
                          alt={e.institution}
                          className="w-16 h-16 rounded object-cover"
                          style={{ borderColor: '#1f1f28' }}
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold" style={{ color: '#e2e2e8' }}>{e.institution}</h3>
                        <p className="text-lg mb-1" style={{ color: '#6b51e0' }}>{e.degree}</p>
                        {e.field_of_study && (
                          <p className="text-sm mb-2" style={{ color: '#9d9db0' }}>{e.field_of_study}</p>
                        )}
                        <div className="flex items-center gap-3 text-sm mb-3" style={{ color: '#757584' }}>
                          {e.start_date && <span>{e.start_date} - {e.end_date || 'Present'}</span>}
                          {e.location && <span>• {e.location}</span>}
                        </div>
                        {e.description_points.length > 0 && (
                          <ul className="space-y-1">
                            {e.description_points.map((point, i) => (
                              <li key={i} className="text-sm flex gap-2" style={{ color: '#9d9db0' }}>
                                <span style={{ color: '#6b51e0' }}>▸</span>{point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => openEdit(e)} style={{ borderColor: '#1f1f28', color: '#9d9db0' }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(e.id)} style={{ borderColor: '#1f1f28', color: '#ef4444' }}>
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
