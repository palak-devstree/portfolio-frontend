import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';
import { blogAPI } from '../../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ArrowLeft, Plus, Edit, Trash2, X, Save, CheckCircle } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  preview: string;
  tags: string[];
  published_date: string;
  read_time_minutes: number;
  is_published: boolean;
  views_count: number;
  created_at?: string;
}

const emptyForm = (): Omit<BlogPost, 'id' | 'views_count'> => ({
  title: '',
  slug: '',
  content: '',
  preview: '',
  tags: [],
  published_date: new Date().toISOString().split('T')[0],
  read_time_minutes: 5,
  is_published: false,
});

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function BlogManager() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
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
    fetchPosts();
  }, [isAuthenticated, navigate]);

  const fetchPosts = async () => {
    try {
      const res = await blogAPI.list();
      setPosts(res.data);
    } catch {
      setError('Failed to load blog posts');
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

  const openEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      preview: post.preview,
      tags: post.tags,
      published_date: post.published_date,
      read_time_minutes: post.read_time_minutes,
      is_published: post.is_published,
    });
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleTitleChange = (title: string) => {
    setForm(f => ({
      ...f,
      title,
      // Auto-generate slug only when creating (not editing)
      ...(editingId === null ? { slug: slugify(title) } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editingId !== null) {
        const res = await blogAPI.update(editingId, form);
        setPosts(posts.map(p => p.id === editingId ? res.data : p));
        setSuccess('Post updated successfully!');
      } else {
        const res = await blogAPI.create(form);
        setPosts([res.data, ...posts]);
        setSuccess('Post created successfully!');
      }
      setShowForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    try {
      await blogAPI.delete(id);
      setPosts(posts.filter(p => p.id !== id));
      setSuccess('Deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete post');
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
            <h1 className="text-3xl font-bold" style={{ color: '#e2e2e8' }}>Manage Blog Posts</h1>
            <Button onClick={openCreate} className="flex items-center gap-2" style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4" />
              New Post
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
                {editingId !== null ? 'Edit Post' : 'New Post'}
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
                  onChange={e => handleTitleChange(e.target.value)}
                  required
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Slug</Label>
                  <Input
                    value={form.slug}
                    onChange={e => setForm({ ...form, slug: e.target.value })}
                    required
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Tags (comma-separated)</Label>
                  <Input
                    value={form.tags.join(', ')}
                    onChange={e => setForm({ ...form, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    placeholder="redis, golang, distributed-systems"
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
              </div>
              <div>
                <Label style={{ color: '#9d9db0' }}>Preview / Excerpt</Label>
                <Textarea
                  value={form.preview}
                  onChange={e => setForm({ ...form, preview: e.target.value })}
                  rows={2}
                  required
                  placeholder="Short description shown in the post list..."
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                />
              </div>
              <div>
                <Label style={{ color: '#9d9db0' }}>Content (Markdown)</Label>
                <Textarea
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  rows={12}
                  placeholder="Write your post in Markdown..."
                  style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8', fontFamily: 'monospace', fontSize: '13px' }}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label style={{ color: '#9d9db0' }}>Published Date</Label>
                  <Input
                    type="date"
                    value={form.published_date}
                    onChange={e => setForm({ ...form, published_date: e.target.value })}
                    required
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div>
                  <Label style={{ color: '#9d9db0' }}>Read Time (minutes)</Label>
                  <Input
                    type="number"
                    value={form.read_time_minutes}
                    onChange={e => setForm({ ...form, read_time_minutes: parseInt(e.target.value) || 1 })}
                    min={1}
                    style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28', color: '#e2e2e8' }}
                  />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_published}
                      onChange={e => setForm({ ...form, is_published: e.target.checked })}
                      style={{ accentColor: '#6b51e0' }}
                    />
                    <span style={{ color: '#9d9db0' }}>Published</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} style={{ borderColor: '#1f1f28', color: '#9d9db0' }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="flex items-center gap-2" style={{ backgroundColor: '#6b51e0' }}>
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Post'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        {posts.length === 0 ? (
          <div className="p-12 rounded-lg border text-center" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
            <p className="mb-4" style={{ color: '#757584' }}>No blog posts yet</p>
            <Button onClick={openCreate} style={{ backgroundColor: '#6b51e0' }}>
              <Plus className="w-4 h-4 mr-2" />
              Write Your First Post
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {posts.map(post => (
              <div key={post.id} className="p-6 rounded-lg border" style={{ backgroundColor: '#14141c', borderColor: '#1f1f28' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold" style={{ color: '#e2e2e8' }}>{post.title}</h3>
                      {post.is_published ? (
                        <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#10b98122', color: '#10b981', border: '1px solid #10b98144' }}>Published</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#75758422', color: '#757584', border: '1px solid #75758444' }}>Draft</span>
                      )}
                    </div>
                    <p className="mb-3" style={{ color: '#9d9db0' }}>{post.preview}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#1a1a24', color: '#6b51e0' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 text-xs" style={{ color: '#757584' }}>
                      <span>{post.published_date}</span>
                      <span>{post.read_time_minutes} min read</span>
                      <span>{post.views_count} views</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => openEdit(post)} style={{ borderColor: '#1f1f28', color: '#9d9db0' }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)} style={{ borderColor: '#1f1f28', color: '#ef4444' }}>
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
