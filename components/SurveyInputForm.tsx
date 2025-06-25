
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Spinner from './Spinner';

interface SurveyInputFormProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const MicrophoneIcon: React.FC<{isListening: boolean}> = ({ isListening }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={`w-5 h-5 ${isListening ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15c-2.485 0-4.5-2.015-4.5-4.5V4.5A4.5 4.5 0 0112 0a4.5 4.5 0 014.5 4.5v6A4.5 4.5 0 0112 15z" />
  </svg>
);


const SurveyInputForm: React.FC<SurveyInputFormProps> = ({ onSubmit, isLoading }) => {
  const [surveyText, setSurveyText] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const maxLength = 2000;

  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setIsSpeechSupported(false);
      setSpeechError("Voice input is not supported by your browser.");
      return;
    }
    setIsSpeechSupported(true);

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true; 
    recognition.interimResults = false; 
    recognition.lang = 'en-US'; 

    recognitionRef.current = recognition;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }
      
      setSurveyText(prevText => {
        const newText = (prevText + (prevText ? ' ' : '') + transcript).trim();
        if (newText.length <= maxLength) {
          setCharCount(newText.length);
          return newText;
        }
        const truncatedText = newText.substring(0, maxLength);
        setCharCount(truncatedText.length);
        setSpeechError("Text limit reached. Some dictated text may have been truncated.");
        setTimeout(() => setSpeechError(null), 4000);
        return truncatedText;
      });
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      let errorMsg = `Voice input error: ${event.error}`;
      if (event.error === 'no-speech') {
        errorMsg = 'No speech detected. Please ensure your microphone is working and try again.';
      } else if (event.error === 'audio-capture') {
        errorMsg = 'Microphone problem. Please check your microphone connection and permissions.';
      } else if (event.error === 'not-allowed') {
        errorMsg = 'Microphone access denied. Please allow microphone access in your browser settings.';
      }
      setSpeechError(errorMsg);
      setIsListening(false); 
    };
    
    recognition.onend = () => {
        if (isListening) { 
             // This is a bit tricky; if continuous is true, it might only stop on error or explicit stop.
             // If continuous is false (not our case), it stops after a pause.
             // For now, we manually set isListening to false on stop() or error.
        }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  // IMPORTANT: The dependency array for this useEffect should be minimal.
  // Re-creating SpeechRecognition on `isListening` change is problematic.
  // We only want to set up event listeners once, or manage their removal/re-adding carefully.
  // For simplicity here, we'll keep it empty, but a more robust solution might
  // use `useCallback` for handlers and manage listeners in the effect.
  // For this fix, let's assume it should only run on mount and unmount.
  // Or, if we need to update `onend` based on `isListening`, that specific part might be in a separate effect.
  // Let's remove isListening from deps for now to avoid re-creating the recognition object.
  }, []); 

  const handleToggleListen = useCallback(() => {
    if (!recognitionRef.current || !isSpeechSupported) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setSpeechError(null); 
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
          console.error("Error starting recognition:", e);
          setSpeechError("Could not start voice input. Please try again or check permissions.");
          setIsListening(false);
      }
    }
  }, [isListening, isSpeechSupported]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (surveyText.trim() && !isLoading) {
      if (isListening && recognitionRef.current) {
         recognitionRef.current.stop(); 
         setIsListening(false);
      }
      onSubmit(surveyText.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxLength) {
        setSurveyText(text);
        setCharCount(text.length);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white dark:bg-slate-800 shadow-xl rounded-lg">
      <div>
        <label htmlFor="surveyText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Enter Employee Feedback for Analysis
        </label>
        <div className="relative">
          <textarea
            id="surveyText"
            name="surveyText"
            rows={8}
            className="shadow-sm focus:ring-here-and-now-yellow focus:border-here-and-now-yellow block w-full sm:text-sm border border-gray-300 rounded-md p-3 transition-colors duration-150 ease-in-out pr-10 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:ring-here-and-now-yellow dark:focus:border-here-and-now-yellow"
            placeholder="Paste or type employee survey response here... or use the microphone."
            value={surveyText}
            onChange={handleChange}
            disabled={isLoading}
            maxLength={maxLength}
          ></textarea>
          {isSpeechSupported && (
            <button
              type="button"
              onClick={handleToggleListen}
              disabled={isLoading || !isSpeechSupported}
              title={isListening ? "Stop Listening" : "Start Voice Input"}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={isListening ? "Stop voice input" : "Start voice input"}
            >
              <MicrophoneIcon isListening={isListening} />
            </button>
          )}
        </div>
        <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">
            {charCount}/{maxLength} characters
            </p>
            {speechError && <p className="text-xs text-red-500 dark:text-red-400 ml-2">{speechError}</p>}
            {!isSpeechSupported && surveyText.length === 0 && <p className="text-xs text-orange-500 dark:text-orange-400 ml-2">Voice input not supported by your browser.</p>}
        </div>

      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading || !surveyText.trim() || isListening}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-here-and-now-teal bg-here-and-now-yellow hover:bg-yellow-400 dark:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-here-and-now-yellow disabled:bg-gray-300 dark:disabled:bg-slate-600 dark:disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
        >
          {isLoading ? (
            <>
              <Spinner size="w-5 h-5" color="text-here-and-now-teal dark:text-teal-300" />
              <span className="ml-2">Analyzing...</span>
            </>
          ) : (
            'Analyze Sentiment'
          )}
        </button>
      </div>
    </form>
  );
};

export default SurveyInputForm;