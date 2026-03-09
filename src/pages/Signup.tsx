import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Code2, Mail, Lock, User, ArrowRight, Eye, EyeOff,
  CheckCircle2, Layers, Play, Zap, Brain, Trophy,
  Rocket, Target, Timer, Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const journeySteps = [
  { icon: Rocket, title: 'Create Account', desc: 'Get started in seconds — completely free', badge: '30 sec' },
  { icon: Play, title: 'Explore Visually', desc: 'Interactive step-by-step animations', badge: 'Hands-on' },
  { icon: Brain, title: 'AI Analysis', desc: 'Reverse-engineer code with AI evaluation', badge: 'New!' },
  { icon: Trophy, title: 'Master DSA', desc: 'Track progress and ace interviews', badge: 'Goal' },
];

const features = [
  { icon: Layers, label: '6 Structures', desc: 'Array, List, Stack, Queue, BST, Graph' },
  { icon: Play, label: '8 Algorithms', desc: 'Sorting, Searching, Traversals' },
  { icon: Zap, label: '22+ Operations', desc: 'Insert, Delete, Search & more' },
  { icon: Timer, label: 'Complexity', desc: 'Time & space analysis' },
  { icon: Brain, label: 'AI Mode', desc: 'Smart code evaluation' },
  { icon: Target, label: 'Interview Prep', desc: 'FAANG-level practice' },
];

const testimonials = [
  { emoji: '🎓', text: '"Finally understood BST traversals"', author: 'Priya S.', role: 'Stanford CS' },
  { emoji: '💼', text: '"Helped me land my Google offer"', author: 'Alex C.', role: 'SWE @ Google' },
  { emoji: '🚀', text: '"Best DSA learning platform"', author: 'Marcus J.', role: 'Self-taught dev' },
];

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const { toast } = useToast();

  const passwordStrength = Math.min(4, Math.floor(password.length / 3));

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
        <div className="absolute inset-0 gradient-warm opacity-50" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 max-w-md w-full text-center">
          <motion.div
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
          >
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-2xl font-black text-foreground mb-2">Check your email!</h2>
          <p className="text-muted-foreground mb-1">We've sent a verification link to</p>
          <p className="text-primary font-bold mb-6">{email}</p>
          <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto">Click the link to activate your account and start learning.</p>
          <Button asChild className="rounded-xl gap-2 h-11 px-6 shadow-md shadow-primary/15">
            <Link to="/login"><ArrowRight className="w-4 h-4" /> Go to Sign In</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-warm opacity-60" />
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[180px]" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute inset-0 opacity-[0.012]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* ── LEFT: Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md shadow-primary/20">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-extrabold text-xl text-foreground">
              Code<span className="gradient-text">Pilot</span>
            </span>
          </div>

          <div className="glass-card p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/8 text-accent text-[11px] font-semibold mb-4 border border-accent/15">
                <Rocket className="w-3 h-3" /> Start free today
              </div>
              <h1 className="text-2xl lg:text-[28px] font-black text-foreground tracking-tight leading-tight">
                Create your account
              </h1>
              <p className="text-sm text-muted-foreground mt-2">Join 10,000+ learners mastering DSA visually</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[13px] font-semibold text-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" /> Display Name
                </Label>
                <div className={`rounded-xl transition-shadow duration-200 ${focused === 'name' ? 'ring-2 ring-primary/20' : ''}`}>
                  <Input
                    id="name" type="text" placeholder="Your name"
                    value={displayName} onChange={e => setDisplayName(e.target.value)}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    className="h-12 bg-background/50 border-border/40 rounded-xl text-sm focus-visible:ring-primary/30"
                    required maxLength={100}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[13px] font-semibold text-foreground flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-primary" /> Email
                </Label>
                <div className={`rounded-xl transition-shadow duration-200 ${focused === 'email' ? 'ring-2 ring-primary/20' : ''}`}>
                  <Input
                    id="email" type="email" placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    className="h-12 bg-background/50 border-border/40 rounded-xl text-sm focus-visible:ring-primary/30"
                    required maxLength={255}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[13px] font-semibold text-foreground flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-primary" /> Password
                </Label>
                <div className={`relative rounded-xl transition-shadow duration-200 ${focused === 'password' ? 'ring-2 ring-primary/20' : ''}`}>
                  <Input
                    id="password" type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters"
                    value={password} onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
                    className="h-12 pr-11 bg-background/50 border-border/40 rounded-xl text-sm focus-visible:ring-primary/30"
                    required minLength={6} maxLength={128}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-secondary/50">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Strength bar */}
                <div className="flex gap-1 pt-1">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i <= passwordStrength ? 'bg-primary' : 'bg-border/40'
                    }`} />
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" disabled={loading}
                className="w-full h-12 rounded-xl text-[15px] font-bold gap-2 shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 mt-1">
                {loading ? (
                  <motion.div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </Button>
            </form>

            {/* Trust */}
            <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
              {['No credit card', 'Free forever', 'Email verification'].map(t => (
                <span key={t} className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                  <CheckCircle2 className="w-3 h-3 text-primary" /> {t}
                </span>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-5">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-bold hover:underline underline-offset-4">Sign in →</Link>
            </p>
          </div>

          {/* Mobile features */}
          <div className="lg:hidden grid grid-cols-3 gap-2 mt-5">
            {features.slice(0, 3).map(f => (
              <div key={f.label} className="p-2.5 rounded-xl bg-card/60 border border-border/30 text-center backdrop-blur-sm">
                <f.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-[10px] font-semibold text-foreground">{f.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT: Info Panel ── */}
      <div className="hidden lg:flex flex-1 items-center justify-center px-16 relative">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[480px] space-y-8"
        >
          {/* Brand + Headline */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Code2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-foreground block leading-none">
                  Code<span className="gradient-text">Pilot</span>
                </span>
                <span className="text-[11px] text-muted-foreground">Master DSA Visually</span>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black text-foreground leading-[1.15] tracking-tight">
                Start your
                <br />
                <span className="gradient-text">DSA journey.</span>
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mt-3 max-w-sm">
                The most intuitive way to learn data structures & algorithms. Interactive, visual, AI-powered.
              </p>
            </div>
          </div>

          {/* Journey Steps */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-bold text-primary uppercase tracking-wider mb-3">Your Learning Path</h3>
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.title}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-card/60 border border-border/30 backdrop-blur-sm hover:border-primary/25 transition-all"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 relative">
                  <step.icon className="w-4.5 h-4.5 text-primary" />
                  <span className="absolute -top-1 -left-1 w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-foreground">{step.title}</div>
                  <div className="text-[11px] text-muted-foreground">{step.desc}</div>
                </div>
                <span className="text-[9px] font-bold text-primary bg-primary/8 px-2 py-0.5 rounded-full flex-shrink-0">{step.badge}</span>
              </motion.div>
            ))}
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                className="p-3 rounded-xl bg-card/50 border border-border/25 backdrop-blur-sm text-center hover:border-primary/25 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
              >
                <f.icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                <div className="text-[11px] font-bold text-foreground">{f.label}</div>
                <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{f.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="space-y-2">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/25 backdrop-blur-sm"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.08 }}
              >
                <span className="text-xl flex-shrink-0">{t.emoji}</span>
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground italic leading-relaxed">{t.text}</p>
                  <p className="text-[10px] text-foreground font-semibold mt-0.5">
                    {t.author} · <span className="text-muted-foreground font-normal">{t.role}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stars */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />)}
            </div>
            <p className="text-[11px] text-muted-foreground">Loved by <strong className="text-foreground">10,000+</strong> students</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
