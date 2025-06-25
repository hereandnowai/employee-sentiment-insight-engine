
import React from 'react';
import { ORGANIZATION_INFO } from '../constants';

interface HomePageProps {
  onGetStartedClick: () => void;
}

const FeatureCard: React.FC<{ title: string; description: string; icon?: React.ReactNode }> = ({ title, description, icon }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl dark:hover:shadow-teal-600/30 transition-shadow duration-300">
    {icon && <div className="text-here-and-now-yellow mb-3">{icon}</div>}
    <h3 className="text-xl font-semibold text-here-and-now-teal dark:text-here-and-now-yellow mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

// Basic SVG Icons (can be replaced with more elaborate ones)
const AiIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m0 15v1.5M12 4.5v-1.5m0 15v-1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5zM12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
  </svg>
);

const ChartIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 14.25h16.5M12 17.25h.008v.008H12v-.008z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 10.5h16.5M7.5 21V3m9 18V3" />
  </svg>
);

const UsersIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-3.471-1.637m0 1.637a5.971 5.971 0 00-3.471-1.637M6.75 8.25A3.375 3.375 0 1113.5 8.25a3.375 3.375 0 01-6.75 0zM17.25 8.25a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0z" />
  </svg>
);


const HomePage: React.FC<HomePageProps> = ({ onGetStartedClick }) => {
  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="text-center py-10 md:py-16 bg-gradient-to-r from-here-and-now-teal to-teal-700 dark:from-teal-700 dark:to-teal-800 rounded-xl shadow-2xl text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-here-and-now-yellow drop-shadow-md">
            Unlock a Deeper Understanding of Your Workforce
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-200 dark:text-gray-300">
            The <span className="font-semibold text-white dark:text-gray-100">Employee Sentiment Insight Engine (ESIE)</span> by {ORGANIZATION_INFO.shortName} empowers you to analyze feedback, uncover key concerns, and cultivate a thriving workplace.
          </p>
          <button
            onClick={onGetStartedClick}
            className="bg-here-and-now-yellow text-here-and-now-teal font-semibold py-3 px-8 rounded-lg text-lg hover:bg-yellow-300 dark:hover:bg-yellow-500 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="Proceed to analyze employee feedback"
          >
            Analyze Employee Feedback
          </button>
        </div>
      </section>

      {/* Features/Benefits Section */}
      <section className="py-10 md:py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-here-and-now-teal dark:text-here-and-now-yellow mb-10 md:mb-12">
            Why ESIE? Transform Feedback into Action
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<AiIcon />}
              title="AI-Powered Insights"
              description="Leverage advanced AI to instantly classify sentiment, identify emerging themes, and understand employee emotions from survey responses."
            />
            <FeatureCard
              icon={<ChartIcon />}
              title="Data-Driven Decisions"
              description="Transform raw feedback into actionable intelligence. Make informed decisions to enhance HR strategies and initiatives effectively."
            />
            <FeatureCard
              icon={<UsersIcon />}
              title="Proactive Engagement"
              description="Monitor morale trends, detect potential issues early, and foster a more positive, engaged, and productive work environment."
            />
          </div>
        </div>
      </section>

      {/* Powered By Section */}
      <section className="py-8 text-center bg-gray-50 dark:bg-slate-800 rounded-lg shadow">
         <div className="container mx-auto px-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
                ESIE is a product of <a href={ORGANIZATION_INFO.website} target="_blank" rel="noopener noreferrer" className="text-here-and-now-teal dark:text-here-and-now-yellow font-semibold hover:underline">{ORGANIZATION_INFO.longName}</a>.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                We are <span className="italic">{ORGANIZATION_INFO.slogan}</span>, committed to innovative AI solutions that drive organizational success.
            </p>
         </div>
      </section>
    </div>
  );
};

export default HomePage;