const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export function getGeminiKey(): string | null {
  return localStorage.getItem('gemini_api_key');
}

export function setGeminiKey(key: string) {
  localStorage.setItem('gemini_api_key', key);
}

export function removeGeminiKey() {
  localStorage.removeItem('gemini_api_key');
}

export interface AIEvaluation {
  understandingScore: number;
  complexityAccuracy: number;
  edgeCaseAwareness: number;
  overallConfidence: number;
  problemUnderstanding: string;
  complexityFeedback: string;
  edgeCaseFeedback: string;
  socraticQuestions: string[];
  optimizationChallenge: string;
  overallFeedback: string;
}

export async function evaluateWithGemini(
  code: string,
  studentAnswer: {
    problemStatement: string;
    inputOutput: string;
    algorithmPurpose: string;
    timeComplexity: string;
    spaceComplexity: string;
    edgeCases: string;
  }
): Promise<AIEvaluation> {
  const apiKey = getGeminiKey();
  if (!apiKey) throw new Error('Gemini API key not configured');

  const prompt = `You are a supportive but challenging DSA professor evaluating a student's reverse-engineering of code. Be encouraging, academic, and slightly challenging. NEVER reveal the full answer directly — give hints and guide them.

## Code to Analyze:
\`\`\`
${code}
\`\`\`

## Student's Answers:
- **Problem Statement**: ${studentAnswer.problemStatement}
- **Input/Output**: ${studentAnswer.inputOutput}
- **Algorithm Purpose**: ${studentAnswer.algorithmPurpose}
- **Time Complexity**: ${studentAnswer.timeComplexity}
- **Space Complexity**: ${studentAnswer.spaceComplexity}
- **Edge Cases Mentioned**: ${studentAnswer.edgeCases}

## Evaluate and respond in this EXACT JSON format (no markdown, no code blocks, just raw JSON):
{
  "understandingScore": <0-100>,
  "complexityAccuracy": <0-100>,
  "edgeCaseAwareness": <0-100>,
  "overallConfidence": <0-100>,
  "problemUnderstanding": "<2-3 sentences evaluating their problem identification>",
  "complexityFeedback": "<2-3 sentences on complexity accuracy, give hints if wrong>",
  "edgeCaseFeedback": "<2-3 sentences on edge case coverage, mention what they missed>",
  "socraticQuestions": ["<question 1>", "<question 2>"],
  "optimizationChallenge": "<A challenge like 'Can you solve this in O(1) space?' or 'What if the input is unsorted?'>",
  "overallFeedback": "<3-4 sentences of encouraging but critical overall feedback>"
}`;

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    if (response.status === 400 || response.status === 403) {
      throw new Error('Invalid API key. Please check your Gemini API key.');
    }
    throw new Error(`Gemini API error: ${response.status} — ${err}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No response from Gemini');

  // Strip markdown code blocks if present
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  try {
    return JSON.parse(cleaned) as AIEvaluation;
  } catch {
    throw new Error('Failed to parse AI response. Please try again.');
  }
}
