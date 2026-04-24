import { Search } from 'lucide-react';
import { useState } from 'react';

interface ConsoleInputProps {
  placeholder?: string;
  suggestions?: string[];
}

export function ConsoleInput({ 
  placeholder = '> ask about projects', 
  suggestions = ['projects', 'skills', 'system design', 'blogs', 'experience']
}: ConsoleInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-4">
      {/* Console Input */}
      <div
        className="relative rounded-lg transition-all duration-200"
        style={{
          backgroundColor: '#14141c',
          borderWidth: '1px',
          borderColor: isFocused ? '#6b51e0' : '#1f1f28',
          boxShadow: isFocused ? '0 0 20px rgba(107, 81, 224, 0.3)' : 'none',
        }}
      >
        <div className="flex items-center px-4 py-3">
          <span className="font-mono mr-3" style={{ color: '#6b51e0' }}>&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none font-mono"
            style={{
              color: '#e2e2e8',
              fontSize: '14px',
            }}
          />
          <Search className="w-4 h-4" style={{ color: '#757584' }} />
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => setInput(suggestion)}
            className="px-3 py-1.5 rounded transition-all duration-200 font-mono"
            style={{
              backgroundColor: '#14141c',
              borderWidth: '1px',
              borderColor: '#1f1f28',
              color: '#757584',
              fontSize: '12px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#6b51e0';
              e.currentTarget.style.color = '#e2e2e8';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(107, 81, 224, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1f1f28';
              e.currentTarget.style.color = '#757584';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
