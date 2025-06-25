
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SurveyInputForm from './components/SurveyInputForm';
import AnalysisDisplay from './components/AnalysisDisplay';
import HomePage from './components/HomePage';
import { analyzeSentiment } from './services/geminiService';
import { SentimentAnalysisResult, SentimentPolarity } from './types';

export type Theme = 'light' | 'dark';

export const ThemeContext = React.createContext<{ theme: Theme; toggleTheme: () => void } | undefined>(undefined);


const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<SentimentAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showHomePage, setShowHomePage] = useState<boolean>(true);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme) {
      setTheme(storedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    } else {
      setTheme('light'); // Default
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSurveySubmit = useCallback(async (text: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null); 
    try {
      const result = await analyzeSentiment(text);
      setAnalysisResult(result);
    } catch (err) {
      console.error("Submission error:", err);
      setError("An unexpected error occurred. Please try again.");
      setAnalysisResult({
        sentiment: SentimentPolarity.UNKNOWN,
        themes: [],
        emotions: ['Error during submission process.'],
        originalText: text,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGetStarted = () => {
    setShowHomePage(false);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-slate-900 font-sans">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {showHomePage ? (
            <HomePage onGetStartedClick={handleGetStarted} />
          ) : (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-here-and-now-teal dark:text-here-and-now-yellow">
                  Employee Sentiment Insight Engine
                </h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                  Unlock valuable insights from employee feedback using AI.
                </p>
              </div>

              <SurveyInputForm onSubmit={handleSurveySubmit} isLoading={isLoading} />

              {error && (
                <div className="p-4 bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300 rounded-md shadow-md text-center">
                  <p>{error}</p>
                </div>
              )}

              {(!isLoading && analysisResult) && <AnalysisDisplay result={analysisResult} />}
              
              {isLoading && !analysisResult && (
                <div className="p-6 bg-white dark:bg-slate-700 shadow-xl rounded-lg text-center text-gray-500 dark:text-gray-400">
                  <p>Analyzing feedback, please wait...</p>
                </div>
              )}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;