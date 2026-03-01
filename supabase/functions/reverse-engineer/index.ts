import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert computer science tutor specializing in reverse engineering code understanding. Your role is to evaluate a student's analysis of a given code snippet/algorithm.

You will receive:
1. A code snippet (the algorithm/code being analyzed)
2. The student's analysis containing their understanding of:
   - Problem statement
   - Input and output
   - Algorithm purpose
   - Time complexity
   - Space complexity
   - Edge cases they identified

Your job is to evaluate their analysis and return a JSON response with this EXACT structure:

{
  "codeUnderstanding": {
    "score": <0-100>,
    "problemStatement": { "correct": <boolean>, "feedback": "<string>" },
    "inputOutput": { "correct": <boolean>, "feedback": "<string>" },
    "algorithmPurpose": { "correct": <boolean>, "feedback": "<string>" }
  },
  "complexityAnalysis": {
    "score": <0-100>,
    "timeComplexity": { "correct": <boolean>, "expected": "<string>", "feedback": "<string>" },
    "spaceComplexity": { "correct": <boolean>, "expected": "<string>", "feedback": "<string>" },
    "hint": "<string if wrong, null if correct>"
  },
  "edgeCaseDetection": {
    "score": <0-100>,
    "identified": ["<list of edge cases student found>"],
    "missed": ["<list of edge cases student missed>"],
    "feedback": "<string>"
  },
  "socraticQuestions": [
    "<question 1>",
    "<question 2>"
  ],
  "optimizationChallenge": {
    "challenge": "<string - a specific optimization challenge>",
    "hint": "<string - a subtle hint without giving the answer>"
  },
  "overallScore": <0-100>,
  "confidenceBreakdown": {
    "understanding": <0-100>,
    "complexityAccuracy": <0-100>,
    "edgeCaseAwareness": <0-100>,
    "overall": <0-100>
  },
  "feedback": "<2-3 sentences of encouraging but critical feedback. Be supportive, academic, slightly challenging. NEVER reveal the full answer directly.>"
}

IMPORTANT RULES:
- Be supportive but academically rigorous
- Never reveal full solutions
- Give guiding hints, not answers
- If the student is mostly correct, challenge them to optimize
- If incorrect, guide them with Socratic questioning
- Always provide at least 2 Socratic questions
- Score fairly - partial credit for partial understanding
- Edge cases to check for: empty input, single element, negative values, duplicates, boundary conditions, very large inputs
- ONLY return valid JSON, no markdown, no explanation outside the JSON`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, analysis } = await req.json();

    if (!code || !analysis) {
      return new Response(
        JSON.stringify({ error: "Both code and analysis are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userMessage = `## Code to Analyze:
\`\`\`
${code}
\`\`\`

## Student's Analysis:
Problem Statement: ${analysis.problemStatement || "Not provided"}
Input/Output: ${analysis.inputOutput || "Not provided"}
Algorithm Purpose: ${analysis.algorithmPurpose || "Not provided"}
Time Complexity: ${analysis.timeComplexity || "Not provided"}
Space Complexity: ${analysis.spaceComplexity || "Not provided"}
Edge Cases: ${analysis.edgeCases || "Not provided"}`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits in Settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI evaluation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON from the AI response
    let evaluation;
    try {
      // Try to extract JSON from the response (handle potential markdown wrapping)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      evaluation = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
    } catch {
      console.error("Failed to parse AI response:", content);
      return new Response(
        JSON.stringify({ error: "Failed to parse AI evaluation. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(evaluation), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("reverse-engineer error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
