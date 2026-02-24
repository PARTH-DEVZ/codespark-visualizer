export interface CodeProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  code: string;
  hints: {
    problem: string;
    algorithm: string;
    timeComplexity: string;
    spaceComplexity: string;
  };
}

export const CODE_PROBLEMS: CodeProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    code: `function solve(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complement in map) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
  return [];
}`,
    hints: {
      problem: 'Find two numbers in an array that add up to a target value',
      algorithm: 'Hash Map lookup',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Searching',
    code: `function solve(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
    hints: {
      problem: 'Find the index of a target element in a sorted array',
      algorithm: 'Binary Search — divide and conquer on sorted data',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
    },
  },
  {
    id: 'max-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    code: `function solve(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
    hints: {
      problem: 'Find the contiguous subarray with the largest sum',
      algorithm: "Kadane's Algorithm",
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    code: `function solve(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  for (const char of s) {
    if ('([{'.includes(char)) {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
    hints: {
      problem: 'Check if a string of brackets is properly balanced',
      algorithm: 'Stack-based matching',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    difficulty: 'Medium',
    category: 'Sorting',
    code: `function solve(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = solve(arr.slice(0, mid));
  const right = solve(arr.slice(mid));
  return merge(left, right);
}

function merge(a, b) {
  const result = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  return result.concat(a.slice(i)).concat(b.slice(j));
}`,
    hints: {
      problem: 'Sort an array of numbers in ascending order',
      algorithm: 'Merge Sort — divide, sort halves, merge',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
    },
  },
  {
    id: 'detect-cycle',
    title: 'Linked List Cycle Detection',
    difficulty: 'Medium',
    category: 'Linked List',
    code: `function solve(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    hints: {
      problem: 'Detect if a linked list has a cycle',
      algorithm: "Floyd's Tortoise and Hare (two pointers)",
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },
  {
    id: 'lca-bst',
    title: 'Lowest Common Ancestor (BST)',
    difficulty: 'Medium',
    category: 'Trees',
    code: `function solve(root, p, q) {
  let node = root;
  while (node) {
    if (p < node.val && q < node.val) node = node.left;
    else if (p > node.val && q > node.val) node = node.right;
    else return node.val;
  }
  return -1;
}`,
    hints: {
      problem: 'Find the lowest common ancestor of two nodes in a BST',
      algorithm: 'BST property — split point where p and q diverge',
      timeComplexity: 'O(h) where h is tree height',
      spaceComplexity: 'O(1)',
    },
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    code: `function solve(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    hints: {
      problem: 'Find the minimum number of coins to make a given amount',
      algorithm: 'Bottom-up Dynamic Programming',
      timeComplexity: 'O(amount × coins)',
      spaceComplexity: 'O(amount)',
    },
  },
];
