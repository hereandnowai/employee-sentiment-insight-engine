
export interface OrganizationInfo {
  shortName: string;
  longName: string;
  website: string;
  email: string;
  mobile: string;
  slogan: string;
  primaryColor: string;
  secondaryColor: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export enum SentimentPolarity {
  POSITIVE = "Positive",
  NEUTRAL = "Neutral",
  NEGATIVE = "Negative",
  UNKNOWN = "Unknown",
}

export interface SentimentAnalysisResult {
  sentiment: SentimentPolarity;
  themes: string[];
  emotions: string[]; // e.g., ["joy", "frustration"]
  originalText?: string; 
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
  retrievedContext?: {
    uri: string;
    title: string;
  };
  // Add other potential grounding chunk types if needed
}

export interface Candidate {
  groundingMetadata?: {
    groundingChunks?: GroundingChunk[];
  };
  // Other candidate properties
}
    