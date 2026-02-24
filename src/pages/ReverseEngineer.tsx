import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Code2, Send, Loader2, Key, ChevronRight, AlertTriangle,
  CheckCircle2, XCircle, Lightbulb, Zap, Target, Shield, Trophy,
  Shuffle, Lock, Unlock, HelpCircle, BookOpen, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import { CODE_PROBLEMS, type CodeProblem } from '@/lib/codeProblems';
import { getGeminiKey, setGeminiKey, removeGeminiKey, evaluateWithGemini, type AIEvaluation } from '@/lib/geminiClient';

const difficultyColor: Record<string, string> = {
  Easy: 'bg-primary/10 text-primary border-primary/20',
  Medium: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Hard: 'bg-destructive/10 text-destructive border-destructive/20',
};

function ScoreRing({ score, label, size = 64 }: { score: number; label: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? 'hsl(var(--primary))' : score >= 50 ? 'hsl(45 90% 50%)' : 'hsl(var(--destructive))';
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <span className="text-lg font-bold font-mono text-foreground -mt-[calc(50%+8px)]" style={{ position: 'relative', top: `-${size / 2 + 6}px`, marginBottom: `-${size / 2 + 6}px` }}>
        {score}
      </span>
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function ReverseEngineer() {
  const [apiKey, setApiKeyState] = useState(getGeminiKey() || '');
  const [isKeySet, setIsKeySet] = useState(!!getGeminiKey());
  const [selectedProblem, setSelectedProblem] = useState<CodeProblem>(CODE_PROBLEMS[0]);
  const [showHint, setShowHint] = useState(false);

  // Student answers
  const [problemStatement, setProblemStatement] = useState('');
  const [inputOutput, setInputOutput] = useState('');
  const [algorithmPurpose, setAlgorithmPurpose] = useState('');
  const [timeComplexity, setTimeComplexity] = useState('');
  const [spaceComplexity, setSpaceComplexity] = useState('');
  const [edgeCases, setEdgeCases] = useState('');

  // AI state
  const [evaluation, setEvaluation] = useState<AIEvaluation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const saveKey = () => {
    if (!apiKey.trim()) return;
    setGeminiKey(apiKey.trim());
    setIsKeySet(true);
  };

  const clearKey = () => {
    removeGeminiKey();
    setApiKeyState('');
    setIsKeySet(false);
  };

  const resetAnswers = () => {
    setProblemStatement('');
    setInputOutput('');
    setAlgorithmPurpose('');
    setTimeComplexity('');
    setSpaceComplexity('');
    setEdgeCases('');
    setEvaluation(null);
    setError('');
    setShowHint(false);
  };

  const selectProblem = (problem: CodeProblem) => {
    setSelectedProblem(problem);
    resetAnswers();
  };

  const randomProblem = () => {
    const remaining = CODE_PROBLEMS.filter(p => p.id !== selectedProblem.id);
    selectProblem(remaining[Math.floor(Math.random() * remaining.length)]);
  };

  const handleSubmit = async () => {
    if (!isKeySet) { setError('Please set your Gemini API key first'); return; }
    if (!problemStatement.trim() && !algorithmPurpose.trim()) {
      setError('Please fill in at least the problem statement and algorithm purpose');
      return;
    }
    setIsLoading(true);
    setError('');
    setEvaluation(null);

    try {
      const result = await evaluateWithGemini(selectedProblem.code, {
        problemStatement, inputOutput, algorithmPurpose,
        timeComplexity, spaceComplexity, edgeCases,
      });
      setEvaluation(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Reverse Engineering Mode</h1>
                  <p className="text-sm text-muted-foreground">Read the code. Decode the logic. Prove your understanding.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isKeySet ? (
                  <Button variant="outline" size="sm" onClick={clearKey} className="rounded-full gap-1.5 text-xs">
                    <Unlock className="w-3 h-3" /> API Key Set <XCircle className="w-3 h-3 text-destructive" />
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Gemini API Key"
                      value={apiKey}
                      onChange={e => setApiKeyState(e.target.value)}
                      className="w-52 h-8 text-xs rounded-full"
                      onKeyDown={e => e.key === 'Enter' && saveKey()}
                    />
                    <Button size="sm" onClick={saveKey} className="rounded-full gap-1 text-xs h-8">
                      <Key className="w-3 h-3" /> Save
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Problem Selector */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">Choose a Problem</span>
              <Button variant="ghost" size="sm" onClick={randomProblem} className="ml-auto gap-1 text-xs rounded-full">
                <Shuffle className="w-3 h-3" /> Random
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {CODE_PROBLEMS.map(p => (
                <motion.button
                  key={p.id}
                  onClick={() => selectProblem(p)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    selectedProblem.id === p.id
                      ? 'border-primary bg-primary/10 text-primary shadow-md'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  {p.title}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main 3-panel layout */}
          <div className="grid lg:grid-cols-2 gap-5">
            {/* LEFT — Code Display */}
            <motion.div
              className="glass-card p-0 overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}>
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-secondary/30">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">{selectedProblem.title}</span>
                  <Badge variant="outline" className={`text-[10px] ${difficultyColor[selectedProblem.difficulty]}`}>
                    {selectedProblem.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">{selectedProblem.category}</Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)} className="gap-1 text-xs rounded-full">
                  <HelpCircle className="w-3 h-3" /> {showHint ? 'Hide Hint' : 'Hint'}
                </Button>
              </div>

              <ScrollArea className="h-[400px]">
                <pre className="p-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto">
                  <code>{selectedProblem.code}</code>
                </pre>
              </ScrollArea>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border/50 bg-primary/5 px-5 py-3 overflow-hidden">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Lightbulb className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-bold text-primary">Hint</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{selectedProblem.hints.algorithm}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* RIGHT — Student Answer Panel */}
            <motion.div
              className="glass-card p-0 overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50 bg-secondary/30">
                <Target className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-foreground">Your Analysis</span>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="p-5 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">What does this code do? (Problem Statement)</label>
                    <Textarea
                      value={problemStatement}
                      onChange={e => setProblemStatement(e.target.value)}
                      placeholder="Describe the problem this code solves..."
                      className="text-sm min-h-[60px] resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Input & Output</label>
                    <Textarea
                      value={inputOutput}
                      onChange={e => setInputOutput(e.target.value)}
                      placeholder="What are the inputs and expected outputs?"
                      className="text-sm min-h-[50px] resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Algorithm / Approach</label>
                    <Textarea
                      value={algorithmPurpose}
                      onChange={e => setAlgorithmPurpose(e.target.value)}
                      placeholder="What algorithm or technique is used?"
                      className="text-sm min-h-[50px] resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1 block">Time Complexity</label>
                      <Input
                        value={timeComplexity}
                        onChange={e => setTimeComplexity(e.target.value)}
                        placeholder="e.g. O(n log n)"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1 block">Space Complexity</label>
                      <Input
                        value={spaceComplexity}
                        onChange={e => setSpaceComplexity(e.target.value)}
                        placeholder="e.g. O(n)"
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Edge Cases</label>
                    <Textarea
                      value={edgeCases}
                      onChange={e => setEdgeCases(e.target.value)}
                      placeholder="Empty input, single element, negatives, duplicates..."
                      className="text-sm min-h-[50px] resize-none"
                    />
                  </div>
                </div>
              </ScrollArea>

              <div className="px-5 py-3 border-t border-border/50 flex gap-2">
                <Button onClick={resetAnswers} variant="outline" size="sm" className="rounded-full text-xs">
                  Clear
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading} size="sm" className="rounded-full gap-1.5 text-xs flex-1">
                  {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  {isLoading ? 'Evaluating...' : 'Submit for AI Review'}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM — AI Feedback Panel */}
          <AnimatePresence>
            {(error || evaluation) && (
              <motion.div
                className="mt-5 glass-card p-0 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}>

                <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50 bg-secondary/30">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">AI Evaluation</span>
                  {evaluation && (
                    <Badge variant="outline" className="ml-auto text-[10px] gap-1">
                      <Trophy className="w-3 h-3" /> Overall: {evaluation.overallConfidence}/100
                    </Badge>
                  )}
                </div>

                <div className="p-5">
                  {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {evaluation && (
                    <div className="space-y-6">
                      {/* Score rings */}
                      <div className="flex justify-center gap-8 flex-wrap">
                        <ScoreRing score={evaluation.understandingScore} label="Understanding" />
                        <ScoreRing score={evaluation.complexityAccuracy} label="Complexity" />
                        <ScoreRing score={evaluation.edgeCaseAwareness} label="Edge Cases" />
                        <ScoreRing score={evaluation.overallConfidence} label="Overall" size={80} />
                      </div>

                      {/* Feedback sections */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <FeedbackCard
                          icon={<CheckCircle2 className="w-4 h-4 text-primary" />}
                          title="Problem Understanding"
                          content={evaluation.problemUnderstanding}
                        />
                        <FeedbackCard
                          icon={<Zap className="w-4 h-4 text-amber-500" />}
                          title="Complexity Analysis"
                          content={evaluation.complexityFeedback}
                        />
                        <FeedbackCard
                          icon={<Shield className="w-4 h-4 text-accent" />}
                          title="Edge Case Coverage"
                          content={evaluation.edgeCaseFeedback}
                        />
                        <FeedbackCard
                          icon={<Trophy className="w-4 h-4 text-primary" />}
                          title="Overall Feedback"
                          content={evaluation.overallFeedback}
                        />
                      </div>

                      {/* Socratic Questions */}
                      {evaluation.socraticQuestions.length > 0 && (
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
                          <div className="flex items-center gap-1.5 mb-2">
                            <Brain className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold text-foreground">Think Deeper</span>
                          </div>
                          <ul className="space-y-1.5">
                            {evaluation.socraticQuestions.map((q, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                                {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Optimization Challenge */}
                      {evaluation.optimizationChallenge && (
                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/15">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Zap className="w-4 h-4 text-accent" />
                            <span className="text-sm font-bold text-foreground">Challenge</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{evaluation.optimizationChallenge}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function FeedbackCard({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border/50">
      <div className="flex items-center gap-1.5 mb-2">
        {icon}
        <span className="text-sm font-bold text-foreground">{title}</span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
    </div>
  );
}
