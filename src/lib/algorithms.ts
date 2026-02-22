// Algorithm step types for visualization
export interface AlgorithmStep {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  found?: number;
  pivot?: number;
  searching?: number;
  visited?: number[];
  currentLine: number;
  description: string;
}

// ---- SORTING ----

export function bubbleSortSteps(input: number[]): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  const sorted: number[] = [];
  steps.push({ array: [...arr], sorted: [], currentLine: 0, description: 'Start Bubble Sort' });
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      steps.push({ array: [...arr], comparing: [j, j + 1], sorted: [...sorted], currentLine: 2, description: `Compare arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]}` });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ array: [...arr], swapping: [j, j + 1], sorted: [...sorted], currentLine: 3, description: `Swap ${arr[j + 1]} and ${arr[j]}` });
      }
    }
    sorted.push(arr.length - 1 - i);
    steps.push({ array: [...arr], sorted: [...sorted], currentLine: 4, description: `Element at index ${arr.length - 1 - i} is sorted` });
  }
  sorted.push(0);
  steps.push({ array: [...arr], sorted: Array.from({ length: arr.length }, (_, i) => i), currentLine: 5, description: 'Array is sorted!' });
  return steps;
}

export function insertionSortSteps(input: number[]): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  const sorted: number[] = [0];
  steps.push({ array: [...arr], sorted: [0], currentLine: 0, description: 'Start Insertion Sort — first element is trivially sorted' });
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    steps.push({ array: [...arr], comparing: [i], sorted: [...sorted], currentLine: 1, description: `Pick key = arr[${i}] = ${key}` });
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      steps.push({ array: [...arr], comparing: [j, j + 1], sorted: [...sorted], currentLine: 3, description: `arr[${j}]=${arr[j]} > ${key}, shift right` });
      arr[j + 1] = arr[j];
      steps.push({ array: [...arr], swapping: [j, j + 1], sorted: [...sorted], currentLine: 4, description: `Shifted arr[${j}] to arr[${j + 1}]` });
      j--;
    }
    arr[j + 1] = key;
    sorted.push(i);
    steps.push({ array: [...arr], sorted: [...sorted], currentLine: 5, description: `Placed key ${key} at index ${j + 1}` });
  }
  steps.push({ array: [...arr], sorted: Array.from({ length: arr.length }, (_, i) => i), currentLine: 6, description: 'Array is sorted!' });
  return steps;
}

export function mergeSortSteps(input: number[]): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  steps.push({ array: [...arr], currentLine: 0, description: 'Start Merge Sort' });

  function mergeSort(a: number[], left: number, right: number) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    steps.push({ array: [...arr], comparing: [left, mid, right], currentLine: 1, description: `Divide [${left}..${right}] at mid=${mid}` });
    mergeSort(a, left, mid);
    mergeSort(a, mid + 1, right);
    // merge
    const temp: number[] = [];
    let i = left, j = mid + 1;
    while (i <= mid && j <= right) {
      steps.push({ array: [...arr], comparing: [i, j], currentLine: 3, description: `Compare arr[${i}]=${arr[i]} and arr[${j}]=${arr[j]}` });
      if (arr[i] <= arr[j]) { temp.push(arr[i++]); } else { temp.push(arr[j++]); }
    }
    while (i <= mid) temp.push(arr[i++]);
    while (j <= right) temp.push(arr[j++]);
    for (let k = 0; k < temp.length; k++) {
      arr[left + k] = temp[k];
    }
    const merged = Array.from({ length: temp.length }, (_, k) => left + k);
    steps.push({ array: [...arr], swapping: merged, currentLine: 5, description: `Merged [${left}..${right}] → [${temp.join(', ')}]` });
  }

  mergeSort(arr, 0, arr.length - 1);
  steps.push({ array: [...arr], sorted: Array.from({ length: arr.length }, (_, i) => i), currentLine: 6, description: 'Array is sorted!' });
  return steps;
}

export function quickSortSteps(input: number[]): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  const sorted: number[] = [];
  steps.push({ array: [...arr], currentLine: 0, description: 'Start Quick Sort' });

  function qs(low: number, high: number) {
    if (low >= high) { if (low === high) sorted.push(low); return; }
    const pivotVal = arr[high];
    steps.push({ array: [...arr], pivot: high, sorted: [...sorted], currentLine: 1, description: `Pivot = arr[${high}] = ${pivotVal}` });
    let i = low;
    for (let j = low; j < high; j++) {
      steps.push({ array: [...arr], comparing: [j, high], pivot: high, sorted: [...sorted], currentLine: 2, description: `Compare arr[${j}]=${arr[j]} with pivot ${pivotVal}` });
      if (arr[j] < pivotVal) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ array: [...arr], swapping: [i, j], pivot: high, sorted: [...sorted], currentLine: 3, description: `Swap arr[${i}] and arr[${j}]` });
        i++;
      }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]];
    sorted.push(i);
    steps.push({ array: [...arr], swapping: [i, high], sorted: [...sorted], currentLine: 4, description: `Place pivot at index ${i}` });
    qs(low, i - 1);
    qs(i + 1, high);
  }

  qs(0, arr.length - 1);
  steps.push({ array: [...arr], sorted: Array.from({ length: arr.length }, (_, i) => i), currentLine: 5, description: 'Array is sorted!' });
  return steps;
}

// ---- SEARCHING ----

export function linearSearchSteps(input: number[], target: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  steps.push({ array: [...input], currentLine: 0, description: `Linear Search for ${target}` });
  for (let i = 0; i < input.length; i++) {
    steps.push({ array: [...input], searching: i, currentLine: 1, description: `Check arr[${i}] = ${input[i]}` });
    if (input[i] === target) {
      steps.push({ array: [...input], found: i, currentLine: 2, description: `Found ${target} at index ${i}!` });
      return steps;
    }
    steps.push({ array: [...input], currentLine: 3, description: `${input[i]} ≠ ${target}, move to next` });
  }
  steps.push({ array: [...input], currentLine: 4, description: `${target} not found in the array` });
  return steps;
}

export function binarySearchSteps(input: number[], target: number): AlgorithmStep[] {
  const arr = [...input].sort((a, b) => a - b);
  const steps: AlgorithmStep[] = [];
  steps.push({ array: [...arr], sorted: Array.from({ length: arr.length }, (_, i) => i), currentLine: 0, description: `Binary Search for ${target} (sorted array)` });
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({ array: [...arr], comparing: [low, mid, high], currentLine: 1, description: `low=${low}, mid=${mid}, high=${high} → arr[${mid}]=${arr[mid]}` });
    if (arr[mid] === target) {
      steps.push({ array: [...arr], found: mid, currentLine: 2, description: `Found ${target} at index ${mid}!` });
      return steps;
    }
    if (arr[mid] < target) {
      steps.push({ array: [...arr], currentLine: 3, description: `${arr[mid]} < ${target}, search right half` });
      low = mid + 1;
    } else {
      steps.push({ array: [...arr], currentLine: 4, description: `${arr[mid]} > ${target}, search left half` });
      high = mid - 1;
    }
  }
  steps.push({ array: [...arr], currentLine: 5, description: `${target} not found` });
  return steps;
}

// ---- GRAPH (BFS/DFS with steps) ----

export interface GraphAlgoStep {
  visited: string[];
  current: string;
  queue?: string[];
  stack?: string[];
  currentLine: number;
  description: string;
}

export interface SimpleGraph {
  nodes: { id: string; label: string }[];
  edges: { from: string; to: string }[];
}

export function buildSampleGraph(): SimpleGraph {
  const nodes = ['A', 'B', 'C', 'D', 'E', 'F'].map(l => ({ id: l, label: l }));
  return {
    nodes,
    edges: [
      { from: 'A', to: 'B' }, { from: 'A', to: 'C' },
      { from: 'B', to: 'D' }, { from: 'C', to: 'E' },
      { from: 'D', to: 'F' }, { from: 'E', to: 'F' },
    ],
  };
}

function getNeighbors(graph: SimpleGraph, id: string): string[] {
  const neighbors: string[] = [];
  for (const e of graph.edges) {
    if (e.from === id) neighbors.push(e.to);
    else if (e.to === id) neighbors.push(e.from);
  }
  return neighbors;
}

export function bfsSteps(graph: SimpleGraph, startId: string): GraphAlgoStep[] {
  const steps: GraphAlgoStep[] = [];
  const visited = new Set<string>();
  const queue = [startId];
  visited.add(startId);
  steps.push({ visited: [startId], current: startId, queue: [...queue], currentLine: 0, description: `Start BFS from ${startId}` });
  while (queue.length) {
    const current = queue.shift()!;
    steps.push({ visited: [...visited], current, queue: [...queue], currentLine: 1, description: `Dequeue ${current}, process it` });
    for (const n of getNeighbors(graph, current)) {
      if (!visited.has(n)) {
        visited.add(n);
        queue.push(n);
        steps.push({ visited: [...visited], current: n, queue: [...queue], currentLine: 2, description: `Discover neighbor ${n}, enqueue` });
      }
    }
  }
  steps.push({ visited: [...visited], current: '', currentLine: 3, description: 'BFS complete!' });
  return steps;
}

export function dfsSteps(graph: SimpleGraph, startId: string): GraphAlgoStep[] {
  const steps: GraphAlgoStep[] = [];
  const visited = new Set<string>();
  function dfs(id: string) {
    visited.add(id);
    steps.push({ visited: [...visited], current: id, currentLine: 1, description: `Visit ${id}` });
    for (const n of getNeighbors(graph, id)) {
      if (!visited.has(n)) {
        steps.push({ visited: [...visited], current: n, currentLine: 2, description: `Recurse into neighbor ${n}` });
        dfs(n);
      }
    }
    steps.push({ visited: [...visited], current: id, currentLine: 3, description: `Backtrack from ${id}` });
  }
  steps.push({ visited: [], current: startId, currentLine: 0, description: `Start DFS from ${startId}` });
  dfs(startId);
  steps.push({ visited: [...visited], current: '', currentLine: 4, description: 'DFS complete!' });
  return steps;
}

// ---- PSEUDOCODE ----

export const PSEUDOCODE: Record<string, string[]> = {
  'Bubble Sort': [
    'function bubbleSort(arr):',
    '  for i = 0 to n-2:',
    '    for j = 0 to n-2-i:',
    '      if arr[j] > arr[j+1]: swap',
    '    // element at n-1-i is sorted',
    '  return arr',
  ],
  'Insertion Sort': [
    'function insertionSort(arr):',
    '  for i = 1 to n-1:',
    '    key = arr[i]',
    '    j = i - 1',
    '    while j >= 0 and arr[j] > key:',
    '      arr[j+1] = arr[j]; j--',
    '    arr[j+1] = key',
  ],
  'Merge Sort': [
    'function mergeSort(arr, l, r):',
    '  mid = (l + r) / 2',
    '  mergeSort(arr, l, mid)',
    '  mergeSort(arr, mid+1, r)',
    '  merge left and right halves',
    '  copy merged result back',
    '  return sorted array',
  ],
  'Quick Sort': [
    'function quickSort(arr, low, high):',
    '  pivot = arr[high]',
    '  for j = low to high-1:',
    '    if arr[j] < pivot: swap(arr[i], arr[j])',
    '  swap(arr[i], arr[high]) // place pivot',
    '  return sorted array',
  ],
  'Linear Search': [
    'function linearSearch(arr, target):',
    '  for i = 0 to n-1:',
    '    if arr[i] == target: return i',
    '    else: continue',
    '  return -1 // not found',
  ],
  'Binary Search': [
    'function binarySearch(arr, target):',
    '  low=0, high=n-1, mid=(l+h)/2',
    '  if arr[mid] == target: return mid',
    '  if arr[mid] < target: low = mid+1',
    '  if arr[mid] > target: high = mid-1',
    '  return -1 // not found',
  ],
  'BFS': [
    'function BFS(graph, start):',
    '  dequeue current, process',
    '  for each neighbor:',
    '    if not visited: enqueue',
    '  // BFS complete',
  ],
  'DFS': [
    'function DFS(graph, start):',
    '  mark current visited',
    '  for each neighbor:',
    '    if not visited: recurse',
    '  backtrack',
    '  // DFS complete',
  ],
};

// ---- COMPLEXITY DATA ----

export const COMPLEXITY: Record<string, { time: string; space: string; best?: string; worst?: string }> = {
  'Bubble Sort': { best: 'O(n)', time: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  'Insertion Sort': { best: 'O(n)', time: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  'Merge Sort': { best: 'O(n log n)', time: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
  'Quick Sort': { best: 'O(n log n)', time: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
  'Linear Search': { best: 'O(1)', time: 'O(n)', worst: 'O(n)', space: 'O(1)' },
  'Binary Search': { best: 'O(1)', time: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
  'BFS': { time: 'O(V + E)', space: 'O(V)', worst: 'O(V + E)' },
  'DFS': { time: 'O(V + E)', space: 'O(V)', worst: 'O(V + E)' },
};

// DS operation complexities
export const DS_COMPLEXITY: Record<string, Record<string, { time: string; space: string }>> = {
  'Array': {
    'Insert': { time: 'O(n)', space: 'O(1)' },
    'Delete': { time: 'O(n)', space: 'O(1)' },
    'Search': { time: 'O(n)', space: 'O(1)' },
    'Sort': { time: 'O(n²)', space: 'O(1)' },
    'Reverse': { time: 'O(n)', space: 'O(1)' },
  },
  'Linked List': {
    'Insert Head': { time: 'O(1)', space: 'O(1)' },
    'Insert Tail': { time: 'O(n)', space: 'O(1)' },
    'Delete': { time: 'O(n)', space: 'O(1)' },
    'Search': { time: 'O(n)', space: 'O(1)' },
  },
  'Stack': {
    'Push': { time: 'O(1)', space: 'O(1)' },
    'Pop': { time: 'O(1)', space: 'O(1)' },
    'Peek': { time: 'O(1)', space: 'O(1)' },
  },
  'Queue': {
    'Enqueue': { time: 'O(1)', space: 'O(1)' },
    'Dequeue': { time: 'O(1)', space: 'O(1)' },
    'Peek': { time: 'O(1)', space: 'O(1)' },
  },
  'BST': {
    'Insert': { time: 'O(log n)', space: 'O(1)' },
    'Search': { time: 'O(log n)', space: 'O(1)' },
    'Inorder': { time: 'O(n)', space: 'O(n)' },
    'Preorder': { time: 'O(n)', space: 'O(n)' },
    'Postorder': { time: 'O(n)', space: 'O(n)' },
  },
  'Graph': {
    'Add Vertex': { time: 'O(1)', space: 'O(1)' },
    'Add Edge': { time: 'O(1)', space: 'O(1)' },
    'BFS': { time: 'O(V+E)', space: 'O(V)' },
    'DFS': { time: 'O(V+E)', space: 'O(V)' },
  },
};
