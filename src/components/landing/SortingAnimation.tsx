import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const INITIAL = [35, 65, 20, 80, 45, 55, 30, 70, 25, 60];

export default function SortingAnimation() {
  const [bars, setBars] = useState(INITIAL);
  const [active, setActive] = useState<number[]>([]);
  const mounted = useRef(true);

  const runSort = useCallback(() => {
    const arr = [...INITIAL];
    setBars([...arr]);
    setActive([]);

    const steps: { arr: number[]; active: number[] }[] = [];
    const a = [...arr];
    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - 1 - i; j++) {
        if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ arr: [...a], active: [j, j + 1] });
      }
    }

    const timers: number[] = [];
    steps.forEach((step, idx) => {
      timers.push(window.setTimeout(() => {
        if (!mounted.current) return;
        setBars(step.arr);
        setActive(step.active);
        if (idx === steps.length - 1) {
          timers.push(window.setTimeout(() => {
            if (!mounted.current) return;
            setActive([]);
            timers.push(window.setTimeout(() => { if (mounted.current) runSort(); }, 2000));
          }, 600));
        }
      }, idx * 150));
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    mounted.current = true;
    const cleanup = runSort();
    return () => { mounted.current = false; cleanup?.(); };
  }, [runSort]);

  return (
    <div className="flex items-end gap-1.5 h-28">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className={`w-3 rounded-t-sm transition-colors duration-200 ${
            active.includes(i) ? 'bg-accent' : 'bg-primary/30'
          }`}
          animate={{ height: `${height}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      ))}
    </div>
  );
}
