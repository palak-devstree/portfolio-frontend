import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';
import { certificatesAPI } from '../../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { ArrowLeft, Plus, Edit, Trash2, X, Save, CheckCircle, Award } from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issue_date?: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
  image_url?: string;
  description?: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

const emptyForm = (): Omit<Certificate, 'id'> => ({
  title: '',
  issuer: '',
  issue_date: '',
  expiry_date: '',
  credential_id: '',
  credential_url: '',
  image_url: '',
  description: '',
  display_order: 0,
});

export function CertificatesManager() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
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
    fetchCertificates();
  }, [isAuthenticated, navigate]);

  const fetchCertificates = async () => {
    try {
      const res = await certificatesAPI.list();
      setCertificates(res.data);
    } catch {
      setError('Failed to load certificates');
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

  const openEdit = (cert: Certificate) => {
    setEditingId(cert.id);
    setForm({
      title: cert.title,
      issuer: cert.issuer,
      issue_date: cert.issue_date ?? '',
      expiry_date: cert.expiry_date ?? '',
      credential_id: cert.credential_id ?? '',
      credential_url: cert.credential_url ?? '',
      image_url: cert.image_url ?? '',
      description: cert.description ?? '',
      display_order: cert.display_order,
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
        const res = await certificatesAPI.update(editingId, form);
        setCertificates(certificates.map(c => c.id === editingId ? res.data : c));
        setSuccess('Certificate updated successfully!');
      } else {
        const res = await certificatesAPI.create(form);
        setCertificates([...certificates, res.data]);
        setSuccess('Certificate created successfully!');
      }
      setShowForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save certificate');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this certificate?')) return;
    try {
      await certificatesAPI.delete(id);
      setCertificates(certificates.filter(c => c.id !== id));
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
              <Award className="w-8 h-8" style={{ color: '#6b51e0' }} />
              <h1 className="text-3xl font-bold" style={{ color: '#e2e2e8' }}>Certificates</h1>
            </div>
            <Button onClick={openCreate} className="flex items-center gap-2" style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4" />
              Add Certificate
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
                {editingId !== null ? 'Edit Certificate' : 'New Certificate'}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ color: '#757584' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Title *</Label>
                  <Input
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    required
                    placeholder="AWS Certified Solutions Architect"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Issuer *</Label>
                  <Input
                    value={form.issuer}
                    onChange={e => setForm({ ...form, issuer: e.target.value })}
                    required
                    placeholder="Amazon Web Services"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Issue Date</Label>
                  <Input
                    value={form.issue_date}
                    onChange={e => setForm({ ...form, issue_date: e.target.value })}
                    placeholder="Jan 2023"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Expiry Date</Label>
                  <Input
                    value={form.expiry_date}
                    onChange={e => setForm({ ...form, expiry_date: e.target.value })}
                    placeholder="Jan 2026 or Never"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Credential ID</Label>
                  <Input
                    value={form.credential_id}
                    onChange={e => setForm({ ...form, credential_id: e.target.value })}
                    placeholder="ABC123XYZ"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Credential URL</Label>
                  <Input
                    value={form.credential_url}
                    onChange={e => setForm({ ...form, credential_url: e.target.value })}
                    placeholder="https://verify.example.com/..."
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
              </div>
              <div>
                <Label style={{ color: '#9d9db0' }}>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  placeholder="Brief description of the certificate"
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>
              <div>
                <ImageUpload
                  value={form.image_url}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  imageType="certificate"
                  label="Certificate Image"
                />
                <p className="text-xs mt-1" style={{ color: '#757584' }}>
                  Upload a certificate badge or image
                </p>
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
        {certificates.length === 0 ? (
          <div className="p-12 rounded-lg border text-center" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
            <Award className="w-12 h-12 mx-auto mb-4" style={{ color: '#757584' }} />
            <p className="mb-4" style={{ color: '#757584' }}>No certificates yet</p>
            <Button onClick={openCreate} style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Certificate
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map(cert => (
              <div key={cert.id} className="p-6 rounded-lg border" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {cert.image_url && (
                      <img 
                        src={cert.image_url} 
                        alt={cert.title}
                        className="w-full h-48 object-cover rounded mb-4"
                        style={{ borderColor: '#1f1f28' }}
                      />
                    )}
                    <h3 className="text-lg font-semibold mb-1" style={{ color: '#e2e2e8' }}>{cert.title}</h3>
                    <p className="text-sm mb-2" style={{ color: '#6b51e0' }}>{cert.issuer}</p>
                    {cert.issue_date && (
                      <p className="text-xs mb-2" style={{ color: '#757584' }}>
                        Issued: {cert.issue_date}
                        {cert.expiry_date && ` • Expires: ${cert.expiry_date}`}
                      </p>
                    )}
                    {cert.credential_id && (
                      <p className="text-xs mb-2" style={{ color: '#9d9db0' }}>
                        ID: {cert.credential_id}
                      </p>
                    )}
                    {cert.description && (
                      <p className="text-sm mt-2" style={{ color: '#9d9db0' }}>{cert.description}</p>
                    )}
                    {cert.credential_url && (
                      <a 
                        href={cert.credential_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs hover:underline mt-2 inline-block"
                        style={{ color: '#6b51e0' }}
                      >
                        Verify Certificate →
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => openEdit(cert)} style={{ borderColor: '#1f1f28', color: '#9d9db0' }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(cert.id)} style={{ borderColor: '#1f1f28', color: '#ef4444' }}>
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
