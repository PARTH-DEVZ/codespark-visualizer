import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { Code2, Home, Play, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const location = useLocation();
  const { getOverallProgress } = useProgress();
  const progress = getOverallProgress();
  const circumference = 2 * Math.PI * 12;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <Code2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-extrabold text-xl text-foreground tracking-tight">
            Code<span className="gradient-text">Pilot</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            asChild variant={location.pathname === '/' ? 'default' : 'ghost'}
            size="sm" className="rounded-full gap-1.5 text-sm"
          >
            <Link to="/"><Home className="w-3.5 h-3.5" /> Home</Link>
          </Button>
          <Button
            asChild variant={location.pathname === '/playground' ? 'default' : 'ghost'}
            size="sm" className="rounded-full gap-1.5 text-sm"
          >
            <Link to="/playground"><Play className="w-3.5 h-3.5" /> Playground</Link>
          </Button>
          <Button
            asChild variant={location.pathname === '/visualizer' ? 'default' : 'ghost'}
            size="sm" className="rounded-full gap-1.5 text-sm"
          >
            <Link to="/visualizer"><Eye className="w-3.5 h-3.5" /> Visualizer</Link>
          </Button>
          <div className="ml-2 flex items-center gap-1.5 bg-secondary rounded-full px-3 py-1.5" title={`${progress}% explored`}>
            <svg width="24" height="24" className="-rotate-90">
              <circle cx="12" cy="12" r="9" fill="none" stroke="hsl(var(--muted))" strokeWidth="2.5" />
              <circle
                cx="12" cy="12" r="9" fill="none"
                stroke="hsl(var(--primary))" strokeWidth="2.5"
                strokeDasharray={2 * Math.PI * 9}
                strokeDashoffset={2 * Math.PI * 9 - (progress / 100) * 2 * Math.PI * 9}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <span className="text-xs font-bold font-mono text-foreground">{progress}%</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
