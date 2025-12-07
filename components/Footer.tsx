'use client';

import { GithubLogo, TwitterLogo, Envelope } from '@phosphor-icons/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} My Website. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm flex items-center gap-1.5"
              aria-label="GitHub"
            >
              <GithubLogo size={18} weight="fill" />
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm flex items-center gap-1.5"
              aria-label="Twitter"
            >
              <TwitterLogo size={18} weight="fill" />
              Twitter
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm flex items-center gap-1.5"
              aria-label="Contact"
            >
              <Envelope size={18} />
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

