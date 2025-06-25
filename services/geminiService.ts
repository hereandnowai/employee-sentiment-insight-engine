
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SentimentAnalysisResult, SentimentPolarity } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable is not set. Please ensure it is available.");
  // Potentially throw an error or handle this state in the UI more gracefully
  // For this example, we'll allow the app to load but API calls will fail.
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Use non-null assertion as we check above, or handle error better

export const analyzeSentiment = async (employeeText: string): Promise<SentimentAnalysisResult> => {
  if (!API_KEY) {
    return {
      sentiment: SentimentPolarity.UNKNOWN,
      themes: [],
      emotions: ["Error: API Key not configured."],
      originalText: employeeText,
    };
  }
  
  const prompt = `
You are an advanced HR sentiment analysis engine specialized in understanding employee feedback.
Analyze the following employee survey response. Your goal is to provide a concise and structured analysis.

Employee Response:
"${employeeText}"

Return your analysis strictly as a JSON object with the following structure:
{
  "sentiment": "Positive" | "Neutral" | "Negative",
  "themes": ["string", "..."],
  "emotions": ["string", "..."] 
}

Instructions for your response:
1.  **Sentiment**: Classify the overall sentiment of the text as "Positive", "Neutral", or "Negative".
2.  **Themes**: Extract up to 5 key themes or topics discussed in the response. These should be concise phrases.
3.  **Emotions**: Identify any strong emotional indicators present in the text (e.g., "joy", "frustration", "appreciation", "concern"). If no strong distinct emotions are detected, return an empty array for emotions.

Example of a valid JSON output:
{
  "sentiment": "Negative",
  "themes": ["Work-life balance", "Communication issues"],
  "emotions": ["Frustration", "Stress"]
}
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsed = JSON.parse(jsonStr) as Omit<SentimentAnalysisResult, 'originalText'>;

    // Validate sentiment value
    let sentimentValue = SentimentPolarity.UNKNOWN;
    if (parsed.sentiment && Object.values(SentimentPolarity).includes(parsed.sentiment as SentimentPolarity)) {
        sentimentValue = parsed.sentiment as SentimentPolarity;
    } else {
        console.warn(`Received unknown sentiment value: ${parsed.sentiment}. Defaulting to UNKNOWN.`);
    }

    return {
      sentiment: sentimentValue,
      themes: parsed.themes || [],
      emotions: parsed.emotions || [],
      originalText: employeeText,
    };

  } catch (error) {
    console.error("Error analyzing sentiment with Gemini:", error);
    let errorMessage = "Failed to analyze sentiment.";
    if (error instanceof Error) {
        errorMessage += ` Details: ${error.message}`;
    }
    return {
      sentiment: SentimentPolarity.UNKNOWN,
      themes: [],
      emotions: [errorMessage],
      originalText: employeeText,
    };
  }
};
    