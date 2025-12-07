'use client';

import { Article } from '@phosphor-icons/react';

export default function BlogHeader() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Article size={32} className="text-blue-600 dark:text-blue-400" weight="duotone" />
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Blog
      </h1>
    </div>
  );
}

