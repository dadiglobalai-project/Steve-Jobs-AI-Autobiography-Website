
export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  image: string;
  cta: string;
}

export interface Quote {
  text: string;
  author: string;
  topic: string;
}

export interface Transcript {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  transcript: string;
  video: string;
}

export interface MentorContext {
  timeline: TimelineEvent[];
  quotes: Quote[];
  transcripts: Transcript[];
}

export interface ReasoningResult {
  structuredQuery: string;
  prioritizedContext: string;
  heuristics: string[];
  tone: string;
}

/**
 * Nuwa.skill - Internal Reasoning Layer
 * 
 * This module simulates an expert reasoning layer that processes user queries
 * and retrieved context before generation.
 */
export class NuwaSkill {
  /**
   * Applies structured reasoning to a user query and context.
   */
  public static reason(query: string, context: MentorContext): ReasoningResult {
    // 1. Structured Reasoning: Analyze the intent
    const intent = this.analyzeIntent(query);
    
    // 2. Context Prioritization: Filter most relevant data
    const filteredContext = this.prioritizeContext(query, context);
    
    // 3. Expert Heuristics: Apply "Steve Jobs" decision-making rules
    const heuristics = this.applyHeuristics(intent);
    
    return {
      structuredQuery: `User is asking about ${intent}. Focus on providing visionary yet practical advice.`,
      prioritizedContext: JSON.stringify(filteredContext),
      heuristics: heuristics,
      tone: "Direct, minimalist, opinionated, and visionary."
    };
  }

  private static analyzeIntent(query: string): string {
    const q = query.toLowerCase();
    if (q.includes('failure') || q.includes('mistake') || q.includes('fired')) return 'resilience and learning from failure';
    if (q.includes('design') || q.includes('simple') || q.includes('beautiful')) return 'design philosophy and simplicity';
    if (q.includes('team') || q.includes('people') || q.includes('hire')) return 'building elite teams and leadership';
    if (q.includes('future') || q.includes('innovation') || q.includes('next')) return 'vision and shaping the future';
    if (q.includes('product') || q.includes('build') || q.includes('make')) return 'product excellence and craftsmanship';
    return 'general life and business philosophy';
  }

  private static prioritizeContext(query: string, context: MentorContext): Partial<MentorContext> {
    const q = query.toLowerCase();
    
    // Simple keyword-based filtering for simulation
    const filteredTimeline = context.timeline.filter(e => 
      e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
    ).slice(0, 3);

    const filteredQuotes = context.quotes.filter(quote => 
      quote.text.toLowerCase().includes(q) || quote.topic.toLowerCase().includes(q)
    ).slice(0, 5);

    // If no specific matches, provide a balanced subset
    return {
      timeline: filteredTimeline.length > 0 ? filteredTimeline : context.timeline.slice(0, 2),
      quotes: filteredQuotes.length > 0 ? filteredQuotes : context.quotes.slice(0, 3)
    };
  }

  private static applyHeuristics(intent: string): string[] {
    const baseHeuristics = [
      "Simplicity is the ultimate sophistication.",
      "Quality is more important than quantity. One home run is much better than two doubles.",
      "Innovation distinguishes between a leader and a follower."
    ];

    const specificHeuristics: Record<string, string[]> = {
      'resilience and learning from failure': [
        "Getting fired from Apple was the best thing that could have ever happened to me.",
        "Sometimes life hits you in the head with a brick. Don't lose faith."
      ],
      'design philosophy and simplicity': [
        "Design is not just what it looks like and feels like. Design is how it works.",
        "It takes a lot of hard work to make something simple, to truly understand the underlying challenges and come up with elegant solutions."
      ],
      'building elite teams and leadership': [
        "A-players hire A-players. B-players hire C-players.",
        "My job is not to be easy on people. My job is to make them better."
      ],
      'vision and shaping the future': [
        "You can't connect the dots looking forward; you can only connect them looking backward.",
        "The people who are crazy enough to think they can change the world are the ones who do."
      ]
    };

    return [...baseHeuristics, ...(specificHeuristics[intent] || [])];
  }
}
