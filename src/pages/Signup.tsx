import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Code2, Mail, Lock, User, ArrowRight, Sparkles, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !displayName.trim()) return;
    if (password.length < 6) {
      toast({ title: 'Password too short', description: 'At least 6 characters required.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { display_name: displayName.trim() },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: 'Signup failed', description: error.message, variant: 'destructive' });
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm opacity-40" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[150px]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 max-w-md w-full text-center relative">
          <motion.div
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}>
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Check your email!</h2>
          <p className="text-muted-foreground mb-6">
            We've sent a verification link to <strong className="text-foreground">{email}</strong>. Click it to activate your account.
          </p>
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/login">Back to Sign In</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-warm opacity-40" />
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-accent/6 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[120px]" />
      
      {/* Floating particles */}
      <motion.div className="absolute top-[25%] right-[12%] w-2 h-2 bg-primary/20 rounded-full"
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 4.5, repeat: Infinity }} />
      <motion.div className="absolute top-[50%] left-[8%] w-3 h-3 bg-accent/15 rounded-full"
        animate={{ y: [0, 18, 0], opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 5.5, repeat: Infinity, delay: 1.5 }} />

      {/* Left form panel */}
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
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4 border border-accent/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}>
                <Sparkles className="w-3 h-3" /> Start free today
              </motion.div>
              <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
              <p className="text-sm text-muted-foreground mt-2">Join thousands learning DSA the visual way</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Display Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name" type="text" placeholder="Your name"
                    value={displayName} onChange={e => setDisplayName(e.target.value)}
                    className="pl-10 h-12 bg-background/50 border-border/60 focus:border-primary/50"
                    required maxLength={100} />
                </div>
              </div>

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
                    id="password" type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters"
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
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right decorative panel - hidden on mobile */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md text-center px-12">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/25">
            <Code2 className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-black text-foreground leading-tight mb-4">
            Start your<br />
            <span className="gradient-text">DSA journey</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Interactive visualizations for every data structure and algorithm. Track your progress, master concepts, ace interviews.
          </p>
          <div className="mt-10 space-y-3">
            {[
              'Step-by-step algorithm animations',
              'Track progress across 22+ operations',
              'Synced complexity analysis',
            ].map((item) => (
              <motion.div
                key={item}
                className="flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-border/40 backdrop-blur-sm text-left"
                whileHover={{ x: 4 }}>
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
