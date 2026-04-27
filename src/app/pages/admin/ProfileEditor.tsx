import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ArrowLeft, Save, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

interface SkillCategory {
  category: string;
  skills: string[];
}

interface ProfileData {
  full_name: string;
  job_title: string;
  tagline: string;
  years_of_experience: number;
  professional_summary: string;
  skills: SkillCategory[];
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
  // Site copy
  navbar_brand?: string;
  hero_badge?: string;
  hero_cluster_label?: string;
  subtitle_projects?: string;
  subtitle_writing?: string;
  subtitle_designs?: string;
  subtitle_lab?: string;
  subtitle_about?: string;
  subtitle_contact?: string;
  contact_response_note?: string;
}

export function ProfileEditor() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileExists, setProfileExists] = useState(false); // Track if profile exists in DB
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
        setProfileExists(true); // Profile exists in database
      } catch (err: any) {
        // If profile doesn't exist (404), initialize with empty profile
        if (err.response?.status === 404) {
          setProfile({
            full_name: '',
            job_title: '',
            tagline: '',
            years_of_experience: 0,
            professional_summary: '',
            skills: [],
            current_learning: [],
            current_building: [],
            current_exploring: [],
            show_blog: false,
            show_projects: true,
            show_system_designs: false,
            show_lab: false,
            show_about: true,
          });
          setProfileExists(false); // Profile doesn't exist yet
        } else {
          setError('Failed to load profile');
        }
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
      if (profileExists) {
        await profileAPI.update(profile);
      } else {
        await profileAPI.create(profile);
        setProfileExists(true); // Now it exists
      }
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      // Reload profile after creation to get the ID and any server-generated fields
      if (!profileExists) {
        const res = await profileAPI.get();
        setProfile(res.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof ProfileData, value: any) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const updateArrayField = (field: 'current_learning' | 'current_building' | 'current_exploring', value: string) => {
    if (!profile) return;
    const items = value.split(',').map(s => s.trim()).filter(s => s);
    setProfile({ ...profile, [field]: items });
  };

  // Skill category helpers
  const addSkillCategory = () => {
    if (!profile) return;
    setProfile({ ...profile, skills: [...profile.skills, { category: '', skills: [] }] });
  };

  const removeSkillCategory = (idx: number) => {
    if (!profile) return;
    const updated = profile.skills.filter((_, i) => i !== idx);
    setProfile({ ...profile, skills: updated });
  };

  const updateSkillCategory = (idx: number, field: 'category' | 'skills', value: string) => {
    if (!profile) return;
    const updated = profile.skills.map((cat, i) => {
      if (i !== idx) return cat;
      if (field === 'category') return { ...cat, category: value };
      return { ...cat, skills: value.split(',').map(s => s.trim()).filter(s => s) };
    });
    setProfile({ ...profile, skills: updated });
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
            {profileExists ? 'Edit Profile' : 'Create Profile'}
          </h1>
          {!profileExists && (
            <p className="mt-2 text-sm" style={{ color: '#757584' }}>
              No profile exists yet. Fill in the details below to create your profile.
            </p>
          )}
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
                <div className="flex items-center justify-between mb-2">
                  <Label style={{ color: '#9d9db0' }}>Skills by Category</Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={addSkillCategory}
                    className="flex items-center gap-1"
                    style={{ backgroundColor: '#6b51e0', fontSize: '12px' }}
                  >
                    <Plus className="w-3 h-3" />
                    Add Category
                  </Button>
                </div>
                <div className="space-y-3">
                  {profile.skills.map((cat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded border"
                      style={{ backgroundColor: '#0b0b0f', borderColor: '#1f1f28' }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Input
                          value={cat.category}
                          onChange={(e) => updateSkillCategory(idx, 'category', e.target.value)}
                          placeholder="Category name (e.g. Backend, AI / ML)"
                          style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8', fontSize: '13px' }}
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => removeSkillCategory(idx)}
                          style={{ borderColor: '#1f1f28', color: '#ef4444', flexShrink: 0 }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <Input
                        value={cat.skills.join(', ')}
                        onChange={(e) => updateSkillCategory(idx, 'skills', e.target.value)}
                        placeholder="Comma-separated skills (e.g. Python, FastAPI, Go)"
                        style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8', fontSize: '12px' }}
                      />
                    </div>
                  ))}
                  {profile.skills.length === 0 && (
                    <p style={{ color: '#757584', fontSize: '13px' }}>
                      No skill categories yet. Click "Add Category" to get started.
                    </p>
                  )}
                </div>
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

          {/* Site Copy */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
            <h2 className="text-xl font-semibold mb-1" style={{ color: '#e2e2e8' }}>Site Copy</h2>
            <p className="mb-4 text-sm" style={{ color: '#757584' }}>
              Customise the labels and microcopy shown across the public portfolio.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Navbar Brand</Label>
                  <Input
                    value={profile.navbar_brand || ''}
                    onChange={(e) => updateField('navbar_brand', e.target.value)}
                    placeholder="palak.ops  (leave blank to auto-derive from name)"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Hero Badge</Label>
                  <Input
                    value={profile.hero_badge || ''}
                    onChange={(e) => updateField('hero_badge', e.target.value)}
                    placeholder="AI · Backend · Infra"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Hero Cluster Label</Label>
                  <Input
                    value={profile.hero_cluster_label || ''}
                    onChange={(e) => updateField('hero_cluster_label', e.target.value)}
                    placeholder="inference.cluster.us-west-2"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Contact Response Note</Label>
                  <Input
                    value={profile.contact_response_note || ''}
                    onChange={(e) => updateField('contact_response_note', e.target.value)}
                    placeholder="responses usually within 72h"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
              </div>

              <div
                className="pt-2 pb-1 font-mono uppercase tracking-wider"
                style={{ fontSize: '10px', color: '#757584', borderTop: '1px solid #1f1f28' }}
              >
                Section subtitles
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Projects subtitle</Label>
                  <Input
                    value={profile.subtitle_projects || ''}
                    onChange={(e) => updateField('subtitle_projects', e.target.value)}
                    placeholder="backend systems, APIs, infrastructure"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Writing subtitle</Label>
                  <Input
                    value={profile.subtitle_writing || ''}
                    onChange={(e) => updateField('subtitle_writing', e.target.value)}
                    placeholder="long-form notes on systems & engineering"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>System Designs subtitle</Label>
                  <Input
                    value={profile.subtitle_designs || ''}
                    onChange={(e) => updateField('subtitle_designs', e.target.value)}
                    placeholder="architectures for real-world scale"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Lab subtitle</Label>
                  <Input
                    value={profile.subtitle_lab || ''}
                    onChange={(e) => updateField('subtitle_lab', e.target.value)}
                    placeholder="experiments, benchmarks & research"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>About subtitle</Label>
                  <Input
                    value={profile.subtitle_about || ''}
                    onChange={(e) => updateField('subtitle_about', e.target.value)}
                    placeholder="background, focus, stack"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Contact subtitle</Label>
                  <Input
                    value={profile.subtitle_contact || ''}
                    onChange={(e) => updateField('subtitle_contact', e.target.value)}
                    placeholder="open inbox / fast reply"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
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
