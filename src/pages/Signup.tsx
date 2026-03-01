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
  Trophy, Brain, Shield, Timer, Target, Star, GraduationCap, Rocket,
  BookOpen, TrendingUp, Award, BarChart3
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
  { icon: Play, label: '8 Algorithms', desc: 'Sorting, Searching, Graph Traversals' },
  { icon: Zap, label: '22+ Operations', desc: 'Insert, Delete, Search, Sort & more' },
  { icon: Timer, label: 'Complexity', desc: 'Time & space for every operation' },
  { icon: Brain, label: 'AI Mode', desc: 'Reverse engineering with AI feedback' },
  { icon: Target, label: 'Interview Prep', desc: 'FAANG-level practice questions' },
];

const socialProof = [
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[120px]" />
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 max-w-lg w-full text-center relative shadow-2xl shadow-primary/10">
          
          <motion.div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 border-2 border-primary/20"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <CheckCircle2 className="w-14 h-14 text-primary" />
            </motion.div>
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-3">Check your email!</h2>
          <p className="text-muted-foreground mb-2 text-lg leading-relaxed">
            We've sent a verification link to
          </p>
          <p className="text-primary font-bold text-lg mb-6">{email}</p>
          <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">Click the link to activate your account and start your DSA mastery journey.</p>
          
          <div className="flex gap-3 justify-center">
            <Button asChild className="rounded-xl gap-2 shadow-lg shadow-primary/20 h-12 px-6">
              <Link to="/login"><ArrowRight className="w-4 h-4" /> Go to Sign In</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-warm opacity-60" />
      <div className="absolute top-[-200px] left-[-200px] w-[900px] h-[900px] bg-accent/6 rounded-full blur-[200px]" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[700px] h-[700px] bg-primary/6 rounded-full blur-[160px]" />
      
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Floating orbs */}
      {[
        { top: '8%', left: '88%', size: 5, dur: 6, delay: 0 },
        { top: '50%', left: '8%', size: 4, dur: 7, delay: 1 },
        { top: '85%', left: '55%', size: 3, dur: 5, delay: 2 },
        { top: '25%', left: '40%', size: 4.5, dur: 8, delay: 0.5 },
        { top: '65%', left: '85%', size: 3, dur: 5.5, delay: 1.5 },
      ].map((p, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            top: p.top, left: p.left,
            width: p.size * 6, height: p.size * 6,
            background: `radial-gradient(circle, hsl(var(--accent) / 0.15), transparent)`
          }}
          animate={{ y: [0, -20, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }} />
      ))}

      {/* === LEFT PANEL (FORM) === */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-[440px]">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-extrabold text-2xl text-foreground">
              Code<span className="gradient-text">Pilot</span>
            </span>
          </div>

          <div className="glass-card p-8 lg:p-10 shadow-2xl shadow-primary/5">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-bold mb-5 border border-accent/20"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
              >
                <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}>
                  <Sparkles className="w-3.5 h-3.5" />
                </motion.span>
                Start free today
              </motion.div>
              <h1 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight">Create your account</h1>
              <p className="text-sm text-muted-foreground mt-2.5">Join 10,000+ learners mastering DSA visually</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Display Name */}
              <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" /> Display Name
                </Label>
                <div className={`relative rounded-xl transition-all duration-200 ${focused === 'name' ? 'ring-2 ring-primary/20' : ''}`}>
                  <Input id="name" type="text" placeholder="Your name"
                    value={displayName} onChange={e => setDisplayName(e.target.value)}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    className="h-12 bg-background/60 border-border/50 rounded-xl text-sm focus-visible:ring-primary/30" required maxLength={100} />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-primary" /> Email Address
                </Label>
                <div className={`relative rounded-xl transition-all duration-200 ${focused === 'email' ? 'ring-2 ring-primary/20' : ''}`}>
                  <Input id="email" type="email" placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    className="h-12 bg-background/60 border-border/50 rounded-xl text-sm focus-visible:ring-primary/30" required maxLength={255} />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <Label htmlFor="password" className="text-sm font-semibold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-primary" /> Password
                </Label>
                <div className={`relative rounded-xl transition-all duration-200 ${focused === 'password' ? 'ring-2 ring-primary/20' : ''}`}>
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters"
                    value={password} onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
                    className="h-12 pr-11 bg-background/60 border-border/50 rounded-xl text-sm focus-visible:ring-primary/30" required minLength={6} maxLength={128} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-secondary/60">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Password strength indicator */}
                <div className="flex gap-1 mt-1.5">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      password.length >= i * 3 ? 'bg-primary' : 'bg-border/50'
                    }`} />
                  ))}
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="pt-1">
                <Button type="submit" disabled={loading}
                  className="w-full h-13 rounded-xl text-base font-bold gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.015] transition-all duration-200">
                  {loading ? (
                    <motion.div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                  ) : (
                    <>Create Account <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Trust indicators */}
            <motion.div className="flex items-center justify-center gap-4 mt-5 flex-wrap"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              {['No credit card', 'Free forever', 'Email verification'].map(t => (
                <span key={t} className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                  <CheckCircle2 className="w-3 h-3 text-primary" /> {t}
                </span>
              ))}
            </motion.div>

            <div className="mt-5 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-bold hover:underline underline-offset-4 transition-all">Sign in →</Link>
              </p>
            </div>
          </div>

          {/* Mobile features */}
          <div className="lg:hidden grid grid-cols-3 gap-2 mt-5">
            {features.slice(0, 3).map((f) => (
              <div key={f.label} className="p-2.5 rounded-xl bg-card/60 border border-border/40 text-center backdrop-blur-sm">
                <f.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-[10px] font-semibold text-foreground">{f.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* === RIGHT PANEL === */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative px-12">
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
          className="max-w-[520px] w-full">

          {/* Brand header */}
          <div className="mb-10">
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-xl shadow-primary/25">
                <Code2 className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <span className="font-extrabold text-2xl text-foreground block leading-none">
                  Code<span className="gradient-text">Pilot</span>
                </span>
                <span className="text-xs text-muted-foreground">Master DSA Visually</span>
              </div>
            </motion.div>

            <motion.h2
              className="text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Start your
              <br />
              <span className="gradient-text">DSA journey.</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-base leading-relaxed max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              The most intuitive way to learn data structures & algorithms. Interactive, visual, AI-powered, and completely free.
            </motion.p>
          </div>

          {/* Journey timeline */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Your Learning Path</h3>
            <div className="space-y-2.5">
              {journeySteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card/60 border border-border/40 backdrop-blur-sm group hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ x: -4 }}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 relative group-hover:bg-primary/15 transition-colors">
                    <step.icon className="w-5 h-5 text-primary" />
                    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-sm">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-foreground">{step.title}</div>
                    <div className="text-[11px] text-muted-foreground">{step.desc}</div>
                  </div>
                  <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{step.badge}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-3 gap-2.5 mb-8">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                className="p-3.5 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm text-center group hover:border-primary/30 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.06 }}
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/15 transition-colors">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-[11px] font-bold text-foreground">{f.label}</div>
                <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{f.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="space-y-2.5">
            {socialProof.map((t, i) => (
              <motion.div
                key={t.author}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-card/50 border border-border/30 backdrop-blur-sm hover:border-primary/20 transition-all"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                whileHover={{ x: -3 }}
              >
                <span className="text-2xl">{t.emoji}</span>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground italic leading-relaxed">{t.text}</p>
                  <p className="text-[10px] text-foreground font-semibold mt-0.5">{t.author} · <span className="text-muted-foreground font-normal">{t.role}</span></p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stars */}
          <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
            <div className="flex items-center justify-center gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-primary fill-primary" />)}
            </div>
            <p className="text-[11px] text-muted-foreground">Loved by <strong className="text-foreground">10,000+</strong> students & developers</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
