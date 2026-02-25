import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Code2, Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-warm opacity-40" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/6 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[120px]" />
      
      {/* Floating particles */}
      <motion.div className="absolute top-[20%] left-[10%] w-2 h-2 bg-primary/20 rounded-full"
        animate={{ y: [0, -25, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }} />
      <motion.div className="absolute top-[60%] right-[15%] w-3 h-3 bg-accent/15 rounded-full"
        animate={{ y: [0, 20, 0], opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }} />
      <motion.div className="absolute bottom-[30%] left-[30%] w-1.5 h-1.5 bg-primary/25 rounded-full"
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }} />

      {/* Left decorative panel - hidden on mobile */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md text-center px-12">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/25">
            <Code2 className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-black text-foreground leading-tight mb-4">
            Welcome back to<br />
            <span className="gradient-text">CodePilot</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Pick up right where you left off. Your progress, your visualizations, your learning journey — all synced and waiting.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { val: '6', label: 'Structures' },
              { val: '8', label: 'Algorithms' },
              { val: '22+', label: 'Operations' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="p-4 rounded-xl bg-card/60 border border-border/40 backdrop-blur-sm"
                whileHover={{ y: -3 }}>
                <div className="text-2xl font-extrabold gradient-text font-mono">{stat.val}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md">
          
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-extrabold text-2xl text-foreground">
              Code<span className="gradient-text">Pilot</span>
            </span>
          </div>

          <div className="glass-card p-8 lg:p-10">
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}>
                <Sparkles className="w-3 h-3" /> Welcome back
              </motion.div>
              <h1 className="text-2xl font-bold text-foreground">Sign in to your account</h1>
              <p className="text-sm text-muted-foreground mt-2">Enter your credentials to continue learning</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email" type="email" placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-background/50 border-border/60 focus:border-primary/50"
                    required maxLength={255} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 bg-background/50 border-border/60 focus:border-primary/50"
                    required minLength={6} maxLength={128} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base font-semibold gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                {loading ? (
                  <motion.div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary font-semibold hover:underline">
                  Create one free
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
