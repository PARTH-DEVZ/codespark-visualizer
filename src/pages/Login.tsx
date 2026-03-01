import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Code2, Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff,
  Layers, GitBranch, Share2, Play, Zap, Trophy,
  CheckCircle2, Users, Brain, Shield, Star, Rocket,
  TrendingUp, BookOpen, Award, Target, Timer
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const codeLines = [
  { indent: 0, keyword: 'function', text: ' mergeSort(arr) {' },
  { indent: 1, keyword: 'if', text: ' (arr.length <= 1) return arr;' },
  { indent: 1, keyword: 'const', text: ' mid = Math.floor(arr.length / 2);' },
  { indent: 1, keyword: 'const', text: ' left = mergeSort(arr.slice(0, mid));' },
  { indent: 1, keyword: 'const', text: ' right = mergeSort(arr.slice(mid));' },
  { indent: 1, keyword: 'return', text: ' merge(left, right);' },
  { indent: 0, keyword: '', text: '}' },
];

const platformStats = [
  { icon: Layers, val: '6', label: 'Data Structures', color: 'from-emerald-500/20 to-emerald-500/5' },
  { icon: Play, val: '8', label: 'Algorithms', color: 'from-primary/20 to-primary/5' },
  { icon: Zap, val: '22+', label: 'Operations', color: 'from-accent/20 to-accent/5' },
  { icon: Users, val: '10K+', label: 'Learners', color: 'from-sky-500/20 to-sky-500/5' },
];

const highlights = [
  { icon: Brain, text: 'AI-powered reverse engineering mode' },
  { icon: Target, text: 'FAANG interview preparation' },
  { icon: TrendingUp, text: 'Track progress across all topics' },
  { icon: BookOpen, text: 'Step-by-step visual animations' },
  { icon: Award, text: 'Complexity analysis for every op' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
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
      {/* Layered background */}
      <div className="absolute inset-0 gradient-warm opacity-60" />
      <div className="absolute top-[-200px] right-[-200px] w-[900px] h-[900px] bg-primary/6 rounded-full blur-[200px]" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[700px] h-[700px] bg-accent/6 rounded-full blur-[160px]" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Floating orbs */}
      {[
        { top: '10%', left: '5%', size: 6, dur: 7, delay: 0 },
        { top: '60%', left: '15%', size: 4, dur: 5, delay: 1.5 },
        { top: '80%', left: '50%', size: 3, dur: 6, delay: 0.8 },
        { top: '20%', left: '80%', size: 5, dur: 8, delay: 2 },
        { top: '45%', left: '92%', size: 3.5, dur: 4.5, delay: 0.3 },
        { top: '70%', left: '70%', size: 2.5, dur: 5.5, delay: 1 },
      ].map((p, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            top: p.top, left: p.left,
            width: p.size * 6, height: p.size * 6,
            background: `radial-gradient(circle, hsl(var(--primary) / 0.15), transparent)`
          }}
          animate={{ y: [0, -25, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }} />
      ))}

      {/* === LEFT PANEL === */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative px-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-[520px] w-full"
        >
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
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Welcome back,
              <br />
              <span className="gradient-text">keep learning.</span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-base leading-relaxed max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              Your progress is saved. Pick up right where you left off with interactive visualizations and AI-powered analysis.
            </motion.p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {platformStats.map((s, i) => (
              <motion.div
                key={s.label}
                className={`p-4 rounded-2xl bg-gradient-to-b ${s.color} border border-border/30 backdrop-blur-sm text-center group hover:border-primary/40 transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="w-9 h-9 rounded-xl bg-card/80 flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:shadow-md transition-shadow">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-xl font-extrabold gradient-text font-mono">{s.val}</div>
                <div className="text-[10px] text-muted-foreground font-medium mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Live code preview */}
          <motion.div
            className="rounded-2xl bg-card/90 border border-border/40 backdrop-blur-xl p-5 mb-8 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-3.5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-primary/40" />
                <div className="w-3 h-3 rounded-full bg-accent/50" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground ml-auto bg-secondary/80 px-2.5 py-0.5 rounded-full">merge_sort.js</span>
            </div>
            <div className="space-y-0.5 font-mono text-[11px]">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  className="flex items-center hover:bg-primary/5 rounded px-1 -mx-1 transition-colors"
                  style={{ paddingLeft: line.indent * 16 + 4 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 + i * 0.08 }}
                >
                  <span className="text-muted-foreground/30 w-5 text-right mr-3 select-none text-[10px]">{i + 1}</span>
                  {line.keyword && <span className="text-primary font-semibold">{line.keyword}</span>}
                  <span className="text-muted-foreground">{line.text}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }} />
                <span className="text-[11px] font-mono text-primary font-semibold">O(n log n)</span>
              </div>
              <div className="flex gap-1.5">
                <span className="text-[9px] font-mono text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded-full">divide & conquer</span>
                <span className="text-[9px] font-mono text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded-full">recursive</span>
              </div>
            </div>
          </motion.div>

          {/* Platform highlights */}
          <div className="space-y-2">
            {highlights.map((h, i) => (
              <motion.div
                key={h.text}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-card/60 transition-colors"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + i * 0.08 }}
              >
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <h.icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{h.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* === RIGHT PANEL (FORM) === */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-[440px]"
        >
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold mb-5 border border-primary/20 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}>
                  <Sparkles className="w-3.5 h-3.5" />
                </motion.span>
                Welcome back
              </motion.div>
              <h1 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight">Sign in to your account</h1>
              <p className="text-sm text-muted-foreground mt-2.5">Continue your learning journey</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
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
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
                    className="h-12 pr-11 bg-background/60 border-border/50 rounded-xl text-sm focus-visible:ring-primary/30" required minLength={6} maxLength={128} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-secondary/60">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <Button type="submit" disabled={loading}
                  className="w-full h-13 rounded-xl text-base font-bold gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.015] transition-all duration-200">
                  {loading ? (
                    <motion.div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                  ) : (
                    <>Sign In <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/40" /></div>
              <div className="relative flex justify-center"><span className="bg-card/80 px-4 text-xs text-muted-foreground font-medium">Platform Features</span></div>
            </div>

            {/* Feature chips */}
            <div className="grid grid-cols-2 gap-2 mb-7">
              {[
                { icon: Shield, label: 'Secure & private', desc: 'End-to-end encryption' },
                { icon: Zap, label: '100% free', desc: 'No hidden costs' },
                { icon: Brain, label: 'AI analysis', desc: 'Smart code evaluation' },
                { icon: Trophy, label: 'Progress tracking', desc: 'Visual dashboards' },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-secondary/40 border border-border/30 hover:border-primary/20 hover:bg-secondary/60 transition-all"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.06 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-foreground leading-tight">{f.label}</div>
                    <div className="text-[9px] text-muted-foreground">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sign up link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary font-bold hover:underline underline-offset-4 transition-all">
                  Create one free →
                </Link>
              </p>
            </div>
          </div>

          {/* Mobile stats */}
          <div className="lg:hidden grid grid-cols-4 gap-2 mt-5">
            {platformStats.map((s) => (
              <div key={s.label} className="p-2.5 rounded-xl bg-card/60 border border-border/40 text-center backdrop-blur-sm">
                <div className="text-base font-extrabold gradient-text font-mono">{s.val}</div>
                <div className="text-[9px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
