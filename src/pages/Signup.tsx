import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Code2, Mail, Lock, User, ArrowRight, Sparkles, Eye, EyeOff,
  CheckCircle2, Layers, Play, Zap, GitBranch, Share2,
  Trophy, Brain, Shield, Timer, Target, BarChart3, Star, GraduationCap, Rocket
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const dsIcons = [
  { icon: Layers, name: 'Array', color: 'bg-emerald-500/10 text-emerald-600' },
  { icon: GitBranch, name: 'BST', color: 'bg-lime-500/10 text-lime-600' },
  { icon: Share2, name: 'Graph', color: 'bg-sky-500/10 text-sky-600' },
];

const journeySteps = [
  { icon: Rocket, title: 'Create Account', desc: 'Get started in seconds with email' },
  { icon: Play, title: 'Explore Visually', desc: 'Interactive animations for every concept' },
  { icon: BarChart3, title: 'Track Progress', desc: 'See your growth across all topics' },
  { icon: Trophy, title: 'Master DSA', desc: 'Ace interviews with confidence' },
];

const features = [
  { icon: Brain, label: 'Visual learning', desc: 'Animations for every operation' },
  { icon: Timer, label: 'Learn fast', desc: 'Understand in minutes, not hours' },
  { icon: Target, label: 'Interview prep', desc: 'FAANG-level practice' },
  { icon: Shield, label: 'Zero setup', desc: 'No installs, works instantly' },
  { icon: Star, label: 'Complexity analysis', desc: 'Time & space for every algo' },
  { icon: GraduationCap, label: 'Self-paced', desc: 'Learn at your own speed' },
];

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
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[120px]" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 max-w-lg w-full text-center relative">
          <motion.div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 border-2 border-primary/20"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </motion.div>
          </motion.div>
          <h2 className="text-3xl font-black text-foreground mb-3">Check your email!</h2>
          <p className="text-muted-foreground mb-4 text-base leading-relaxed">
            We've sent a verification link to <strong className="text-foreground">{email}</strong>.
          </p>
          <p className="text-sm text-muted-foreground mb-8">Click the link to activate your account and start your DSA journey.</p>
          <div className="flex gap-3 justify-center">
            <Button asChild className="rounded-xl gap-2 shadow-lg shadow-primary/20">
              <Link to="/login"><ArrowRight className="w-4 h-4" /> Go to Sign In</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-warm opacity-50" />
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-accent/8 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />

      {/* Floating particles */}
      {[
        { top: '12%', left: '88%', size: 2, dur: 4.5, delay: 0 },
        { top: '45%', left: '5%', size: 3, dur: 5.5, delay: 1 },
        { top: '80%', left: '60%', size: 1.5, dur: 3.5, delay: 2 },
        { top: '30%', left: '35%', size: 2.5, dur: 6, delay: 0.5 },
        { top: '70%', left: '90%', size: 2, dur: 5, delay: 1.5 },
      ].map((p, i) => (
        <motion.div key={i}
          className="absolute bg-accent/20 rounded-full"
          style={{ top: p.top, left: p.left, width: p.size * 4, height: p.size * 4 }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }} />
      ))}

      {/* Left form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
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
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                  <Sparkles className="w-3 h-3" />
                </motion.span>
                Start free today
              </motion.div>
              <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
              <p className="text-sm text-muted-foreground mt-2">Join 10,000+ learners mastering DSA visually</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Label htmlFor="name" className="text-sm font-medium">Display Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="name" type="text" placeholder="Your name"
                    value={displayName} onChange={e => setDisplayName(e.target.value)}
                    className="pl-10 h-12 bg-background/50 border-border/60 focus:border-primary/50" required maxLength={100} />
                </div>
              </motion.div>

              <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-background/50 border-border/60 focus:border-primary/50" required maxLength={255} />
                </div>
              </motion.div>

              <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters"
                    value={password} onChange={e => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 bg-background/50 border-border/60 focus:border-primary/50" required minLength={6} maxLength={128} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <Button type="submit" disabled={loading}
                  className="w-full h-12 rounded-xl text-base font-semibold gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all">
                  {loading ? (
                    <motion.div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                  ) : (
                    <>Create Account <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Trust indicators */}
            <motion.div className="flex items-center justify-center gap-4 mt-5 text-[10px] text-muted-foreground"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              {['No credit card', 'Cancel anytime', 'Email verification'].map(t => (
                <span key={t} className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-primary" /> {t}
                </span>
              ))}
            </motion.div>

            <div className="mt-5 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
              </p>
            </div>
          </div>

          {/* Mobile-only data structure icons */}
          <div className="lg:hidden flex justify-center gap-4 mt-6">
            {dsIcons.map((ds) => (
              <div key={ds.name} className={`w-12 h-12 rounded-xl flex items-center justify-center ${ds.color} border border-border/30`}>
                <ds.icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right decorative panel */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative px-8">
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          className="max-w-lg w-full">

          {/* Logo + heading */}
          <div className="text-center mb-10">
            <motion.div
              className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/25"
              whileHover={{ scale: 1.05, rotate: -5 }}
              transition={{ type: 'spring' }}>
              <Code2 className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h2 className="text-4xl font-black text-foreground leading-tight mb-3">
              Start your<br />
              <span className="gradient-text">DSA journey</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
              The most intuitive way to learn data structures & algorithms. Interactive, visual, and completely free.
            </p>
          </div>

          {/* Journey timeline */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4 text-center">Your Learning Path</h3>
            <div className="space-y-2">
              {journeySteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  className="flex items-center gap-4 p-3 rounded-xl bg-card/60 border border-border/40 backdrop-blur-sm group hover:border-primary/30 transition-all"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: -4 }}>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors relative">
                    <step.icon className="w-5 h-5 text-primary" />
                    <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground">{step.title}</div>
                    <div className="text-[11px] text-muted-foreground">{step.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-3 gap-2">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                className="p-3 rounded-xl bg-card/50 border border-border/30 backdrop-blur-sm text-center group hover:border-primary/30 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.08 }}
                whileHover={{ y: -2 }}>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-1.5 group-hover:bg-primary/15 transition-colors">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-[11px] font-semibold text-foreground">{f.label}</div>
                <div className="text-[9px] text-muted-foreground mt-0.5">{f.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Social proof */}
          <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
            <div className="flex items-center justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-primary fill-primary" />)}
            </div>
            <p className="text-xs text-muted-foreground">Loved by <strong className="text-foreground">10,000+</strong> students & developers worldwide</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
