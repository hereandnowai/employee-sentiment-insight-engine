
import React from 'react';
import { ORGANIZATION_INFO } from '../constants';
import { SocialLink } from '../types'; // Corrected import

const Footer: React.FC = () => {
  return (
    <footer className="bg-here-and-now-teal text-gray-300 dark:bg-slate-800 dark:text-gray-400 py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-here-and-now-yellow mb-2">{ORGANIZATION_INFO.shortName}</h3>
            <p className="text-sm">{ORGANIZATION_INFO.longName}</p>
            <p className="text-sm mt-1">{ORGANIZATION_INFO.email}</p>
            <p className="text-sm mt-1">{ORGANIZATION_INFO.mobile}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-here-and-now-yellow mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href={ORGANIZATION_INFO.website} target="_blank" rel="noopener noreferrer" className="hover:text-here-and-now-yellow transition-colors">Website</a></li>
              {/* Add more links if needed */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-here-and-now-yellow mb-2">Connect With Us</h3>
            <div className="flex space-x-4">
              {ORGANIZATION_INFO.socialLinks.map((link: SocialLink) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  className="text-gray-300 dark:text-gray-400 hover:text-here-and-now-yellow transition-colors"
                >
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 dark:border-slate-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {ORGANIZATION_INFO.shortName}. All rights reserved.</p>
          <p className="mt-1">Employee Sentiment Insight Engine (ESIE) - {ORGANIZATION_INFO.slogan}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;