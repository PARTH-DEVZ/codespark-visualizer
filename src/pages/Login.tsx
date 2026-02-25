import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Code2, Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff,
  Layers, GitBranch, Share2, Play, BarChart3, Zap, Trophy,
  CheckCircle2, Star, Users, Brain, Shield
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

const testimonials = [
  { text: '"The visualizations made BST traversals finally click for me."', author: 'Priya S.', role: 'CS Student', emoji: '🎓' },
  { text: '"Helped me crack my Google interview prep in 2 weeks."', author: 'Alex C.', role: 'SWE @ Google', emoji: '💼' },
];

const stats = [
  { icon: Layers, val: '6', label: 'Data Structures', desc: 'Array, List, Stack, Queue, BST, Graph' },
  { icon: Play, val: '8', label: 'Algorithms', desc: 'Sorting, Searching, Graph Traversals' },
  { icon: Zap, val: '22+', label: 'Operations', desc: 'Insert, Delete, Search, Sort & more' },
  { icon: Users, val: '10K+', label: 'Learners', desc: 'Students & developers worldwide' },
];

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
      <div className="absolute inset-0 gradient-warm opacity-50" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/8 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />

      {/* Floating particles */}
      {[
        { top: '15%', left: '8%', size: 2, dur: 5, delay: 0 },
        { top: '55%', left: '18%', size: 3, dur: 6, delay: 1 },
        { top: '75%', left: '45%', size: 1.5, dur: 4, delay: 2 },
        { top: '25%', left: '85%', size: 2.5, dur: 5.5, delay: 0.5 },
        { top: '65%', left: '75%', size: 2, dur: 4.5, delay: 1.5 },
      ].map((p, i) => (
        <motion.div key={i}
          className="absolute bg-primary/20 rounded-full"
          style={{ top: p.top, left: p.left, width: p.size * 4, height: p.size * 4 }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }} />
      ))}

      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg w-full">

          {/* Logo + heading */}
          <div className="text-center mb-10">
            <motion.div
              className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/25"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring' }}>
              <Code2 className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h2 className="text-4xl font-black text-foreground leading-tight mb-3">
              Welcome back to<br />
              <span className="gradient-text">CodePilot</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
              Your progress, visualizations, and learning journey — all synced and ready to continue.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="p-4 rounded-xl bg-card/60 border border-border/40 backdrop-blur-sm group hover:border-primary/30 transition-all"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -3 }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <s.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-xl font-extrabold gradient-text font-mono">{s.val}</span>
                </div>
                <div className="text-xs font-semibold text-foreground">{s.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Animated code block */}
          <motion.div
            className="rounded-xl bg-card/80 border border-border/50 backdrop-blur-sm p-5 mb-8 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/50" />
              <span className="text-[10px] font-mono text-muted-foreground ml-auto">merge_sort.js</span>
            </div>
            <div className="space-y-0.5 font-mono text-[11px]">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  className="flex"
                  style={{ paddingLeft: line.indent * 16 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}>
                  <span className="text-muted-foreground/40 w-5 text-right mr-3 select-none">{i + 1}</span>
                  {line.keyword && <span className="text-primary font-medium">{line.keyword}</span>}
                  <span className="text-muted-foreground">{line.text}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }} />
              <span className="text-[10px] font-mono text-primary font-semibold">O(n log n)</span>
              <span className="text-[10px] font-mono text-muted-foreground ml-auto bg-secondary px-2 py-0.5 rounded-full">divide & conquer</span>
            </div>
          </motion.div>

          {/* Testimonials */}
          <div className="space-y-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                className="flex items-start gap-3 p-3 rounded-xl bg-card/50 border border-border/30 backdrop-blur-sm"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + i * 0.15 }}
                whileHover={{ x: 4 }}>
                <span className="text-2xl mt-0.5">{t.emoji}</span>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground italic leading-relaxed">{t.text}</p>
                  <p className="text-[10px] text-foreground font-semibold mt-1">{t.author} · <span className="text-muted-foreground font-normal">{t.role}</span></p>
                </div>
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
                <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                  <Sparkles className="w-3 h-3" />
                </motion.span>
                Welcome back
              </motion.div>
              <h1 className="text-2xl font-bold text-foreground">Sign in to your account</h1>
              <p className="text-sm text-muted-foreground mt-2">Enter your credentials to continue learning</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
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
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 bg-background/50 border-border/60 focus:border-primary/50" required minLength={6} maxLength={128} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Button type="submit" disabled={loading}
                  className="w-full h-12 rounded-xl text-base font-semibold gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all">
                  {loading ? (
                    <motion.div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                  ) : (
                    <>Sign In <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground">or</span></div>
            </div>

            {/* Feature highlights below form */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                { icon: Shield, label: 'Secure & private' },
                { icon: Zap, label: '100% free forever' },
                { icon: Brain, label: 'AI-powered insights' },
                { icon: Trophy, label: 'Track your progress' },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border/30"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.08 }}>
                  <f.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-[11px] text-muted-foreground font-medium">{f.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary font-semibold hover:underline">Create one free</Link>
              </p>
            </div>
          </div>

          {/* Mobile-only stats */}
          <div className="lg:hidden grid grid-cols-3 gap-3 mt-6">
            {[
              { val: '6', label: 'Structures' },
              { val: '8', label: 'Algorithms' },
              { val: '22+', label: 'Operations' },
            ].map((s) => (
              <div key={s.label} className="p-3 rounded-xl bg-card/60 border border-border/40 text-center backdrop-blur-sm">
                <div className="text-lg font-extrabold gradient-text font-mono">{s.val}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
