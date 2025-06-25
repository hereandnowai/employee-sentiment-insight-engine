
import React, { useContext } from 'react';
import { ORGANIZATION_INFO } from '../constants';
import { ThemeContext } from '../App'; // Import ThemeContext

const SunIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21c3.089 0 5.897-1.456 7.752-3.798z" />
  </svg>
);


const Header: React.FC = () => {
  const logoUrl = "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png";
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null; // Or some fallback UI, though ThemeProvider should be above this
  }
  const { theme, toggleTheme } = themeContext;

  return (
    <header className="bg-here-and-now-teal text-white dark:bg-slate-800 dark:text-gray-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href={ORGANIZATION_INFO.website} target="_blank" rel="noopener noreferrer">
                <img 
                  src={logoUrl} 
                  alt={`${ORGANIZATION_INFO.shortName} Logo`} 
                  className="h-12 md:h-14"
                />
              </a>
            </div>
            <div className="ml-4 md:ml-6">
              <h1 className="text-lg sm:text-xl font-semibold text-white dark:text-gray-50">{ORGANIZATION_INFO.shortName}</h1>
              <p className="text-xs text-gray-300 dark:text-gray-400 italic">{ORGANIZATION_INFO.slogan}</p>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-white/20 dark:hover:bg-slate-700 text-here-and-now-yellow dark:text-here-and-now-yellow focus:outline-none transition-colors"
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;