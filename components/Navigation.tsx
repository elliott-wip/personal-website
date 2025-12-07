'use client';

import Link from 'next/link';
import { House, Article, User } from '@phosphor-icons/react';

export default function Navigation() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <House size={24} weight="fill" />
            My Website
          </Link>
          <div className="flex space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium flex items-center gap-1.5"
            >
              <House size={18} />
              Home
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium flex items-center gap-1.5"
            >
              <Article size={18} />
              Blog
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium flex items-center gap-1.5"
            >
              <User size={18} />
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

