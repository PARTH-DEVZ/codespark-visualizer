import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { Code2, Home, Play } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const { getOverallProgress } = useProgress();
  const progress = getOverallProgress();
  const circumference = 2 * Math.PI * 12;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Code2 className="w-6 h-6 text-accent" />
          <span className="font-mono">CodePilot</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
              location.pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link
            to="/playground"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
              location.pathname === '/playground' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Play className="w-4 h-4" /> Playground
          </Link>
          <div className="flex items-center gap-2" title={`${progress}% explored`}>
            <svg width="32" height="32" className="-rotate-90">
              <circle cx="16" cy="16" r="12" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
              <circle
                cx="16" cy="16" r="12" fill="none"
                stroke="hsl(var(--accent))" strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <span className="text-xs font-mono text-muted-foreground">{progress}%</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
