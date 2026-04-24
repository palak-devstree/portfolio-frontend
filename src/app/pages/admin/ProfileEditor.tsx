import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

interface ProfileData {
  full_name: string;
  job_title: string;
  tagline: string;
  years_of_experience: number;
  professional_summary: string;
  skills: string[];
  email?: string;
  phone?: string;
  location?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  show_blog: boolean;
  show_projects: boolean;
  show_system_designs: boolean;
  show_lab: boolean;
  show_about: boolean;
  current_learning: string[];
  current_building: string[];
  current_exploring: string[];
}

export function ProfileEditor() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await profileAPI.get();
        setProfile(res.data);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      await profileAPI.update(profile);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof ProfileData, value: any) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const updateArrayField = (field: 'skills' | 'current_learning' | 'current_building' | 'current_exploring', value: string) => {
    if (!profile) return;
    const items = value.split(',').map(s => s.trim()).filter(s => s);
    setProfile({ ...profile, [field]: items });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0b0b0f' }}>
        <div style={{ color: '#757584' }}>Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0b0b0f' }}>
        <div style={{ color: '#ef4444' }}>Profile not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0b0b0f' }}>
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-6">
          <Link to="/admin/dashboard" className="flex items-center gap-2 mb-4 hover:underline" style={{ color: '#757584' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold" style={{ color: '#e2e2e8' }}>
            Edit Profile
          </h1>
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
              Profile updated successfully!
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: '#e2e2e8' }}>Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label style={{ color: '#9d9db0' }}>Full Name</Label>
                <Input
                  value={profile.full_name}
                  onChange={(e) => updateField('full_name', e.target.value)}
                  required
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>

              <div>
                <Label style={{ color: '#9d9db0' }}>Job Title</Label>
                <Input
                  value={profile.job_title}
                  onChange={(e) => updateField('job_title', e.target.value)}
                  required
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>

              <div>
                <Label style={{ color: '#9d9db0' }}>Tagline</Label>
                <Input
                  value={profile.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  required
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>

              <div>
                <Label style={{ color: '#9d9db0' }}>Years of Experience</Label>
                <Input
                  type="number"
                  value={profile.years_of_experience}
                  onChange={(e) => updateField('years_of_experience', parseInt(e.target.value))}
                  required
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>

              <div>
                <Label style={{ color: '#9d9db0' }}>Professional Summary</Label>
                <Textarea
                  value={profile.professional_summary}
                  onChange={(e) => updateField('professional_summary', e.target.value)}
                  rows={4}
                  required
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>

              <div>
                <Label style={{ color: '#9d9db0' }}>Skills (comma-separated)</Label>
                <Input
                  value={profile.skills.join(', ')}
                  onChange={(e) => updateArrayField('skills', e.target.value)}
                  placeholder="Python, FastAPI, React, TypeScript"
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: '#e2e2e8' }}>Contact & Links</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label style={{ color: '#9d9db0' }}>Email</Label>
                <Input
                  type="email"
                  value={profile.email || ''}
                  onChange={(e) => updateField('email', e.target.value)}
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>

              <div>
                <Label style={{ color: '#9d9db0' }}>Phone</Label>
                <Input
                  value={profile.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>

              <div>
                <Label style={{ color: '#9d9db0' }}>Location</Label>
                <Input
                  value={profile.location || ''}
                  onChange={(e) => updateField('location', e.target.value)}
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>

              <div>
                <Label style={{ color: '#9d9db0' }}>GitHub URL</Label>
                <Input
                  value={profile.github_url || ''}
                  onChange={(e) => updateField('github_url', e.target.value)}
                  placeholder="https://github.com/username"
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>

              <div>
                <Label style={{ color: '#9d9db0' }}>LinkedIn URL</Label>
                <Input
                  value={profile.linkedin_url || ''}
                  onChange={(e) => updateField('linkedin_url', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>

              <div>
                <Label style={{ color: '#9d9db0' }}>Twitter URL</Label>
                <Input
                  value={profile.twitter_url || ''}
                  onChange={(e) => updateField('twitter_url', e.target.value)}
                  placeholder="https://twitter.com/username"
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>
            </div>
          </div>

          {/* Current Focus */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: '#e2e2e8' }}>Current Focus</h2>
            
            <div className="space-y-4">
              <div>
                <Label style={{ color: '#9d9db0' }}>Currently Learning (comma-separated)</Label>
                <Input
                  value={profile.current_learning.join(', ')}
                  onChange={(e) => updateArrayField('current_learning', e.target.value)}
                  placeholder="LLM Integration, System Design"
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>

              <div>
                <Label style={{ color: '#9d9db0' }}>Currently Building (comma-separated)</Label>
                <Input
                  value={profile.current_building.join(', ')}
                  onChange={(e) => updateArrayField('current_building', e.target.value)}
                  placeholder="AI Platform, Analytics Dashboard"
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>

              <div>
                <Label style={{ color: '#9d9db0' }}>Currently Exploring (comma-separated)</Label>
                <Input
                  value={profile.current_exploring.join(', ')}
                  onChange={(e) => updateArrayField('current_exploring', e.target.value)}
                  placeholder="Vector Databases, Edge Computing"
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Link to="/admin/dashboard">
              <Button type="button" variant="outline" style={{ borderColor: '#1f1f28', color: '#9d9db0' }}>
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2"
              style={{ backgroundColor: '#6b51e0' }}
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
