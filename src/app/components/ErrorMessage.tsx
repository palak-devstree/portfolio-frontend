import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 p-8 rounded-lg"
      style={{
        backgroundColor: '#14141c',
        borderWidth: '1px',
        borderColor: '#ef4444',
      }}
    >
      <AlertCircle className="w-12 h-12" style={{ color: '#ef4444' }} />
      <p className="text-center" style={{ color: '#ef4444' }}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded transition-all"
          style={{
            backgroundColor: '#6b51e0',
            color: '#e2e2e8',
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
