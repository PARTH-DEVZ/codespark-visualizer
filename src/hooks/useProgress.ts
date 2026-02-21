import { useState, useEffect, useCallback } from 'react';

export type DSType = 'array' | 'linked-list' | 'stack' | 'queue' | 'bst' | 'graph';

export const DS_LABELS: Record<DSType, string> = {
  array: 'Array',
  'linked-list': 'Linked List',
  stack: 'Stack',
  queue: 'Queue',
  bst: 'BST',
  graph: 'Graph',
};

export const OPERATIONS: Record<DSType, string[]> = {
  array: ['Insert', 'Delete', 'Search', 'Sort', 'Reverse'],
  'linked-list': ['Insert Head', 'Insert Tail', 'Delete', 'Search'],
  stack: ['Push', 'Pop', 'Peek'],
  queue: ['Enqueue', 'Dequeue', 'Peek'],
  bst: ['Insert', 'Search', 'Inorder', 'Preorder', 'Postorder'],
  graph: ['Add Vertex', 'Add Edge', 'BFS', 'DFS'],
};

export const ALL_DS: DSType[] = ['array', 'linked-list', 'stack', 'queue', 'bst', 'graph'];

export function useProgress() {
  const [explored, setExplored] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('codepilot-progress');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem('codepilot-progress', JSON.stringify(explored));
  }, [explored]);

  const markExplored = useCallback((ds: DSType, operation: string) => {
    setExplored(prev => {
      const current = prev[ds] || [];
      if (current.includes(operation)) return prev;
      return { ...prev, [ds]: [...current, operation] };
    });
  }, []);

  const getProgress = useCallback((ds: DSType) => {
    const total = OPERATIONS[ds].length;
    const done = (explored[ds] || []).length;
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
  }, [explored]);

  const getOverallProgress = useCallback(() => {
    let totalOps = 0, doneOps = 0;
    ALL_DS.forEach(ds => {
      totalOps += OPERATIONS[ds].length;
      doneOps += (explored[ds] || []).length;
    });
    return totalOps > 0 ? Math.round((doneOps / totalOps) * 100) : 0;
  }, [explored]);

  return { explored, markExplored, getProgress, getOverallProgress };
}
