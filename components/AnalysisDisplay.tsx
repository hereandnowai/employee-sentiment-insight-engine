
import React from 'react';
import { SentimentAnalysisResult, SentimentPolarity } from '../types';

interface AnalysisDisplayProps {
  result: SentimentAnalysisResult | null;
}

const getSentimentClasses = (sentiment: SentimentPolarity): string => {
  switch (sentiment) {
    case SentimentPolarity.POSITIVE:
      return 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-700/30';
    case SentimentPolarity.NEGATIVE:
      return 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-700/30';
    case SentimentPolarity.NEUTRAL:
      return 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-700/30';
    default:
      return 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-slate-600/50';
  }
};

const SentimentBadge: React.FC<{ sentiment: SentimentPolarity }> = ({ sentiment }) => {
  return (
    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getSentimentClasses(sentiment)}`}>
      {sentiment}
    </span>
  );
};

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="p-6 bg-white dark:bg-slate-800 shadow-xl rounded-lg text-center text-gray-500 dark:text-gray-400">
        <p>Submit employee feedback above to see the analysis.</p>
      </div>
    );
  }

  const firstEmotion = (result.emotions && result.emotions.length > 0 && typeof result.emotions[0] === 'string') 
                       ? result.emotions[0] 
                       : "";
  
  const hasErrorInEmotions = firstEmotion.startsWith("Error:") || firstEmotion.startsWith("Failed to analyze sentiment");

  return (
    <div className="p-6 bg-white dark:bg-slate-800 shadow-xl rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-here-and-now-teal dark:text-here-and-now-yellow mb-4">Sentiment Analysis Results</h2>
      
      {result.originalText && (
         <div className="mb-4">
            <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-1">Original Text:</h3>
            <p className="text-sm text-gray-600 bg-gray-50 dark:bg-slate-700 dark:text-gray-300 p-3 rounded-md max-h-32 overflow-y-auto">
                <em>"{result.originalText}"</em>
            </p>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Overall Sentiment:</h3>
        <SentimentBadge sentiment={result.sentiment} />
      </div>

      {result.themes && result.themes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Themes:</h3>
          <ul className="list-disc list-inside space-y-1 pl-2">
            {result.themes.map((theme, index) => (
              <li key={index} className="text-gray-800 bg-gray-100 dark:text-gray-200 dark:bg-slate-700 px-2 py-1 rounded text-sm">
                {theme}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.emotions && result.emotions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {hasErrorInEmotions ? "Analysis Issues:" : "Detected Emotions/Indicators:"}
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-2">
            {result.emotions.map((emotion, index) => (
              <li key={index} className={`text-sm ${hasErrorInEmotions ? 'text-red-600 dark:text-red-400' : 'text-indigo-700 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-700/30 px-2 py-1 rounded'}`}>
                {emotion}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {(result.themes.length === 0 && result.emotions.length === 0 && !hasErrorInEmotions && result.sentiment !== SentimentPolarity.UNKNOWN) && (
        <p className="text-sm text-gray-500 dark:text-gray-400">No specific themes or strong emotions were prominently detected in this feedback.</p>
      )}

       {result.sentiment === SentimentPolarity.UNKNOWN && !hasErrorInEmotions && (
         <p className="text-sm text-orange-600 bg-orange-100 dark:text-orange-300 dark:bg-orange-700/30 p-3 rounded">Could not determine sentiment from the provided text or an issue occurred during analysis.</p>
       )}
    </div>
  );
};

export default AnalysisDisplay;