import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Play, Eye, BarChart3, Zap, ArrowRight, Layers, GitBranch, Share2,
  ArrowUpFromLine, ArrowRightLeft, Link as LinkIcon, CheckCircle2,
  BookOpen, Code2, Rocket, TrendingUp, Cpu, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import SortingAnimation from '@/components/landing/SortingAnimation';

function AnimatedCounter({ target, suffix = '', label, icon: Icon }: { target: number; suffix?: string; label: string; icon: typeof Layers }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = 45;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round((frame / totalFrames) * target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-all duration-300 group"
      whileHover={{ y: -4 }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="text-3xl font-extrabold font-mono gradient-text">
        {inView ? count : 0}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1 font-medium">{label}</div>
    </motion.div>
  );
}

const features = [
  {
    icon: Play,
    title: 'Interactive Playground',
    description: 'Hands-on practice with 6 data structures. Insert, delete, search, sort — watch every step animate in real time with full speed control.',
    highlights: ['Step-by-step animations', 'Speed control slider', '22+ operations'],
    gradient: 'from-primary/10 to-primary/5',
  },
  {
    icon: Eye,
    title: 'Algorithm Visualizer',
    description: 'Coming soon — visualize sorting algorithms (Bubble, Merge, Quick) and searching algorithms with detailed step breakdowns.',
    highlights: ['Sorting algorithms', 'Search algorithms', 'Complexity analysis'],
    gradient: 'from-accent/10 to-accent/5',
    comingSoon: true,
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Your journey is saved automatically. Track which operations you\'ve explored per structure with visual progress bars.',
    highlights: ['Auto-save to browser', 'Per-structure tracking', 'Visual progress bars'],
    gradient: 'from-primary/10 to-accent/5',
  },
];

const dsCards = [
  { icon: Layers, name: 'Array', ops: 'Insert, Delete, Search, Sort, Reverse', color: 'bg-orange-500/10 text-orange-600' },
  { icon: LinkIcon, name: 'Linked List', ops: 'Insert Head/Tail, Delete, Search', color: 'bg-amber-500/10 text-amber-600' },
  { icon: ArrowUpFromLine, name: 'Stack', ops: 'Push, Pop, Peek', color: 'bg-rose-500/10 text-rose-600' },
  { icon: ArrowRightLeft, name: 'Queue', ops: 'Enqueue, Dequeue, Peek', color: 'bg-teal-500/10 text-teal-600' },
  { icon: GitBranch, name: 'BST', ops: 'Insert, Search, Inorder, Pre/Post', color: 'bg-emerald-500/10 text-emerald-600' },
  { icon: Share2, name: 'Graph', ops: 'Add Vertex/Edge, BFS, DFS', color: 'bg-cyan-500/10 text-cyan-600' },
];

const testimonials = [
  { text: '"Finally a tool that makes BST traversals click. The step-by-step highlighting is brilliant."', author: 'CS Student', role: 'Data Structures course' },
  { text: '"I use this to prep for coding interviews. The graph BFS/DFS visualization saved me hours."', author: 'Software Engineer', role: 'Interview prep' },
  { text: '"Clean UI, no sign-up needed, works instantly. Exactly what I was looking for."', author: 'Self-taught Dev', role: 'Learning DSA' },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm opacity-60" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Zap className="w-3.5 h-3.5" /> Free & Open-Source DSA Learning Tool
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-black text-foreground leading-[1.1] mb-6 tracking-tight">
                Master DSA,{' '}
                <span className="gradient-text">Visually</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
                Interactive visualizations for <strong className="text-foreground">6 data structures</strong> and <strong className="text-foreground">22+ operations</strong>.
                Learn by doing — watch every algorithm come alive with step-by-step animations.
              </p>
              <div className="flex gap-3 justify-center lg:justify-start flex-wrap">
                <Button asChild size="lg" className="rounded-full px-8 gap-2 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  <Link to="/playground"><Rocket className="w-4 h-4" /> Open Playground</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 gap-2 text-base border-2 hover:bg-secondary">
                  <Link to="/"><Eye className="w-4 h-4" /> Visualizer (Soon)</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> No sign-up needed</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> 100% free</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> Works offline</span>
              </div>
            </motion.div>

            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl" />
                <div className="glass-card p-8 w-80 relative">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-primary/40" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <span className="text-xs font-mono text-muted-foreground ml-2">bubble_sort.js</span>
                  </div>
                  <SortingAnimation />
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-mono text-primary font-semibold">sorting...</span>
                    <span className="text-[10px] font-mono text-muted-foreground">O(n²)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data Structures Grid */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">6 Data Structures, Fully Interactive</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Each structure comes with its own set of operations, animated visualizations, and detailed output logs.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dsCards.map((ds, i) => (
              <motion.div
                key={ds.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  to="/playground"
                  className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${ds.color} group-hover:scale-110 transition-transform`}>
                    <ds.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{ds.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{ds.ops}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-foreground">Everything you need to learn DSA</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className={`relative p-7 rounded-2xl bg-gradient-to-br ${f.gradient} border border-border/40 hover:shadow-2xl transition-all duration-300 group`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -6 }}
              >
                {f.comingSoon && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase bg-accent/15 text-accent px-2.5 py-1 rounded-full tracking-wider">
                    Soon
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 shadow-md">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{f.description}</p>
                <ul className="space-y-2">
                  {f.highlights.map(h => (
                    <li key={h} className="flex items-center gap-2 text-xs text-foreground font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" /> {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground">Built for comprehensive learning</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatedCounter target={6} label="Data Structures" icon={Layers} />
            <AnimatedCounter target={22} suffix="+" label="Operations" icon={Cpu} />
            <AnimatedCounter target={3} label="Tree Traversals" icon={GitBranch} />
            <AnimatedCounter target={2} label="Graph Algorithms" icon={Share2} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-foreground">Learn in 3 simple steps</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: BookOpen, title: 'Pick a Structure', desc: 'Choose from Array, Linked List, Stack, Queue, BST, or Graph.' },
              { step: '02', icon: Code2, title: 'Run Operations', desc: 'Insert values, search, sort, traverse — all with one click.' },
              { step: '03', icon: TrendingUp, title: 'Watch & Learn', desc: 'See each step animate with highlights, logs, and visual feedback.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="text-6xl font-black gradient-text opacity-20 mb-2">{item.step}</div>
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-md">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl font-bold mt-2 text-foreground">Loved by learners</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} className="w-4 h-4 text-primary fill-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-foreground italic leading-relaxed mb-4">{t.text}</p>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.author}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="text-center p-12 rounded-3xl gradient-primary relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent)]" />
            <div className="relative">
              <Star className="w-8 h-8 text-primary-foreground/80 mx-auto mb-4" />
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-primary-foreground">Ready to master DSA?</h2>
              <p className="text-primary-foreground/80 mb-8 text-lg max-w-md mx-auto">
                Jump into the playground and start visualizing data structures today. No sign-up required.
              </p>
              <Button asChild size="lg" variant="secondary" className="rounded-full px-10 text-base font-bold shadow-lg">
                <Link to="/playground">Get Started Free <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">CodePilot</span> — Learn DSA visually
          </div>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/playground" className="hover:text-foreground transition-colors">Playground</Link>
          </div>
          <span>Built with React & TypeScript</span>
        </div>
      </footer>
    </div>
  );
}
