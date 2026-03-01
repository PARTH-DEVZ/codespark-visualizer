import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { useAuth } from '@/contexts/AuthContext';
import { Code2, Home, Play, Eye, LogIn, LogOut, User, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const location = useLocation();
  const { getOverallProgress } = useProgress();
  const { user, signOut, profile } = useAuth();
  const progress = getOverallProgress();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
            <Code2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-extrabold text-xl text-foreground tracking-tight">
            Code<span className="gradient-text">Pilot</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant={location.pathname === '/' ? 'default' : 'ghost'} size="sm" className="rounded-full gap-1.5 text-sm">
            <Link to="/"><Home className="w-3.5 h-3.5" /> Home</Link>
          </Button>
          <Button asChild variant={location.pathname === '/playground' ? 'default' : 'ghost'} size="sm" className="rounded-full gap-1.5 text-sm">
            <Link to="/playground"><Play className="w-3.5 h-3.5" /> Playground</Link>
          </Button>
          <Button asChild variant={location.pathname === '/visualizer' ? 'default' : 'ghost'} size="sm" className="rounded-full gap-1.5 text-sm">
            <Link to="/visualizer"><Eye className="w-3.5 h-3.5" /> Visualizer</Link>
          </Button>
          <Button asChild variant={location.pathname === '/reverse-engineer' ? 'default' : 'ghost'} size="sm" className="rounded-full gap-1.5 text-sm">
            <Link to="/reverse-engineer"><Brain className="w-3.5 h-3.5" /> AI Mode</Link>
          </Button>

          {user && (
            <div className="ml-2 flex items-center gap-1.5 bg-secondary rounded-full px-3 py-1.5" title={`${progress}% explored`}>
              <svg width="24" height="24" className="-rotate-90">
                <circle cx="12" cy="12" r="9" fill="none" stroke="hsl(var(--muted))" strokeWidth="2.5" />
                <circle cx="12" cy="12" r="9" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5"
                  strokeDasharray={2 * Math.PI * 9} strokeDashoffset={2 * Math.PI * 9 - progress / 100 * 2 * Math.PI * 9}
                  strokeLinecap="round" className="transition-all duration-500" />
              </svg>
              <span className="text-xs font-bold font-mono text-foreground">{progress}%</span>
            </div>
          )}

          {user ? (
            <div className="ml-2 flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-secondary/60 rounded-full px-3 py-1.5 border border-border/50">
                <User className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground max-w-[100px] truncate">
                  {profile?.display_name || user.email?.split('@')[0]}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="rounded-full gap-1.5 text-sm" onClick={signOut}>
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </Button>
            </div>
          ) : (
            <Button asChild variant={location.pathname === '/login' ? 'default' : 'ghost'} size="sm" className="rounded-full gap-1.5 text-sm ml-2">
              <Link to="/login"><LogIn className="w-3.5 h-3.5" /> Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
