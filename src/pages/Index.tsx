import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Play, Eye, BarChart3, Layers, GitBranch, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import SortingAnimation from '@/components/landing/SortingAnimation';

function AnimatedCounter({ target, label }: { target: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = 40;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round((frame / totalFrames) * numericTarget));
      if (frame >= totalFrames) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, numericTarget]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold font-mono text-primary">
        {inView ? count : 0}{target.includes('+') ? '+' : ''}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

const features = [
  {
    icon: Play,
    title: 'Interactive Playground',
    description: 'Hands-on practice with 6 data structures. Insert, delete, search — watch every step animate in real time.',
    color: 'text-primary',
  },
  {
    icon: Eye,
    title: 'Algorithm Visualizer',
    description: 'Coming soon — step-by-step sorting and searching animations with full speed control.',
    color: 'text-accent',
    comingSoon: true,
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Track your exploration across every data structure and operation. Your progress saves automatically.',
    color: 'text-primary',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Zap className="w-3.5 h-3.5" /> Open-source DSA learning tool
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
                Master DSA,{' '}
                <span className="text-primary">Visually</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Interactive visualizations for arrays, linked lists, stacks, queues, binary search trees, and graphs.
                Learn by doing — watch every operation come alive.
              </p>
              <div className="flex gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link to="/playground">Open Playground</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link to="/">Visualizer (Soon)</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card p-8 w-72">
                <div className="text-xs font-mono text-muted-foreground mb-3">bubble_sort.js</div>
                <SortingAnimation />
                <div className="mt-3 text-xs font-mono text-accent">sorting...</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Everything you need to learn DSA
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="glass-card p-6 hover:shadow-2xl transition-shadow duration-300 group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                {f.comingSoon && (
                  <span className="absolute top-4 right-4 text-[10px] font-mono bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                    soon
                  </span>
                )}
                <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <AnimatedCounter target="6" label="Data Structures" />
            <AnimatedCounter target="22" label="Operations" />
            <AnimatedCounter target="3" label="Traversals" />
            <AnimatedCounter target="2" label="Graph Algos" />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to explore?</h2>
            <p className="text-muted-foreground mb-8">
              Jump into the playground and start visualizing data structures today.
            </p>
            <Button asChild size="lg" className="rounded-full px-10">
              <Link to="/playground">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          CodePilot — Learn DSA visually. Built with React & TypeScript.
        </div>
      </footer>
    </div>
  );
}
