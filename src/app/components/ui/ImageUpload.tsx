import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from './button';
import { uploadsAPI } from '../../../lib/api';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  imageType: 'diagram' | 'certificate' | 'education' | 'experience' | 'profile';
  label?: string;
  accept?: string;
}

export function ImageUpload({ 
  value, 
  onChange, 
  imageType, 
  label = 'Upload Image',
  accept = 'image/png,image/jpeg,image/jpg,image/svg+xml,application/pdf'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const response = await uploadsAPI.uploadImage(file, imageType);
      onChange(response.data.url);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to upload image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium" style={{ color: '#9d9db0' }}>
        {label}
      </label>
      
      {value ? (
        <div className="relative">
          <div 
            className="border rounded-lg p-4 flex items-center justify-between"
            style={{ backgroundColor: '#1a1a24', borderColor: '#1f1f28' }}
          >
            <div className="flex items-center gap-3">
              <ImageIcon className="w-5 h-5" style={{ color: '#6b51e0' }} />
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: '#e2e2e8' }}>
                  Image uploaded
                </p>
                <a 
                  href={value} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs hover:underline"
                  style={{ color: '#757584' }}
                >
                  View image
                </a>
              </div>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleRemove}
              style={{ borderColor: '#1f1f28', color: '#ef4444' }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          {value.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
            <div className="mt-2">
              <img 
                src={value} 
                alt="Preview" 
                className="max-w-xs max-h-48 rounded border"
                style={{ borderColor: '#1f1f28' }}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
            id={`file-upload-${imageType}`}
          />
          <label
            htmlFor={`file-upload-${imageType}`}
            className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-colors"
            style={{ 
              backgroundColor: '#1a1a24', 
              borderColor: uploading ? '#6b51e0' : '#1f1f28' 
            }}
          >
            <Upload 
              className="w-8 h-8 mb-2" 
              style={{ color: uploading ? '#6b51e0' : '#757584' }} 
            />
            <p className="text-sm font-medium mb-1" style={{ color: '#e2e2e8' }}>
              {uploading ? 'Uploading...' : 'Click to upload'}
            </p>
            <p className="text-xs" style={{ color: '#757584' }}>
              PNG, JPG, SVG or PDF (max 10MB)
            </p>
          </label>
        </div>
      )}

      {error && (
        <p className="text-sm" style={{ color: '#ef4444' }}>
          {error}
        </p>
      )}
    </div>
  );
}
