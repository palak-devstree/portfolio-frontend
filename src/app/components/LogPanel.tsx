import { useEffect, useRef, useState } from 'react';

interface LogEntry {
  level: 'INFO' | 'OK' | 'WARN' | 'ERROR';
  message: string;
  timestamp: string;
}

interface LogPanelProps {
  logs?: LogEntry[];
  title?: string;
  height?: string;
}

const defaultLogs: LogEntry[] = [
  { level: 'INFO', message: 'loading portfolio system...', timestamp: '00:00:01' },
  { level: 'INFO', message: 'initializing components', timestamp: '00:00:02' },
  { level: 'INFO', message: 'database connection established', timestamp: '00:00:03' },
  { level: 'INFO', message: 'worker process started', timestamp: '00:00:04' },
  { level: 'OK', message: 'system ready', timestamp: '00:00:05' },
  { level: 'INFO', message: 'monitoring active', timestamp: '00:00:06' },
];

export function LogPanel({ logs = defaultLogs, title = 'System Logs', height = '240px' }: LogPanelProps) {
  const [displayedLogs, setDisplayedLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logs.forEach((log, index) => {
      setTimeout(() => {
        setDisplayedLogs(prev => [...prev, log]);
      }, index * 500);
    });
  }, [logs]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLogs]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'OK':
        return '#2dd4bf';
      case 'WARN':
        return '#fb923c';
      case 'ERROR':
        return '#d4183d';
      default:
        return '#6b51e0';
    }
  };

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        backgroundColor: '#0b0b0f',
        borderWidth: '1px',
        borderColor: '#1f1f28',
      }}
    >
      <div 
        className="px-4 py-2 border-b flex items-center justify-between"
        style={{ 
          backgroundColor: '#111118',
          borderColor: '#1f1f28',
        }}
      >
        <span className="font-mono uppercase tracking-wider" style={{ fontSize: '11px', color: '#757584' }}>
          {title}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#2dd4bf' }} />
          <span className="font-mono" style={{ fontSize: '10px', color: '#757584' }}>LIVE</span>
        </div>
      </div>
      
      <div
        ref={scrollRef}
        className="p-4 font-mono overflow-y-auto"
        style={{
          height,
          fontSize: '12px',
          lineHeight: '1.8',
        }}
      >
        {displayedLogs.map((log, i) => (
          <div key={i} className="flex items-start gap-3">
            <span style={{ color: '#4a4a58' }}>{log.timestamp}</span>
            <span 
              className="font-bold"
              style={{ 
                color: getLevelColor(log.level),
                minWidth: '50px',
              }}
            >
              [{log.level}]
            </span>
            <span style={{ color: '#e2e2e8', flex: 1 }}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
