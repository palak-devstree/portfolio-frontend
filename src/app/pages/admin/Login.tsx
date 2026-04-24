import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Lock } from 'lucide-react';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0b0b0f' }}>
      <div 
        className="w-full max-w-md p-8 rounded-lg"
        style={{
          backgroundColor: '#14141c',
          borderWidth: '1px',
          borderColor: '#1f1f28',
        }}
      >
        <div className="flex items-center justify-center mb-8">
          <Lock className="w-8 h-8 mr-2" style={{ color: '#6b51e0' }} />
          <h1 className="text-2xl font-bold" style={{ color: '#e2e2e8' }}>
            Admin Login
          </h1>
        </div>

        {error && (
          <Alert className="mb-4" style={{ backgroundColor: '#1a1a24', borderColor: '#ef4444' }}>
            <AlertDescription style={{ color: '#ef4444' }}>
              {error}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" style={{ color: '#9d9db0' }}>Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              className="mt-1"
              style={{
                backgroundColor: '#1a1a24',
                borderColor: '#1f1f28',
                color: '#e2e2e8',
              }}
            />
          </div>

          <div>
            <Label htmlFor="password" style={{ color: '#9d9db0' }}>Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="mt-1"
              style={{
                backgroundColor: '#1a1a24',
                borderColor: '#1f1f28',
                color: '#e2e2e8',
              }}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            style={{
              backgroundColor: '#6b51e0',
              color: '#ffffff',
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <a 
            href="/"
            className="text-sm hover:underline"
            style={{ color: '#757584' }}
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
