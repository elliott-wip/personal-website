'use client';

import Link from 'next/link';
import { CalendarBlank, ArrowRight } from '@phosphor-icons/react';
import { format } from 'date-fns';

interface BlogPostCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
}

export default function BlogPostCard({ slug, title, date, excerpt }: BlogPostCardProps) {
  return (
    <article className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-b-0">
      <Link href={`/blog/${slug}`}>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {title}
        </h2>
      </Link>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 mb-3">
        <CalendarBlank size={16} />
        <time dateTime={date}>
          {date ? format(new Date(date), 'MMMM d, yyyy') : ''}
        </time>
      </div>
      {excerpt && (
        <p className="text-gray-600 dark:text-gray-400 mt-3">
          {excerpt}
        </p>
      )}
      <Link
        href={`/blog/${slug}`}
        className="inline-flex items-center gap-1.5 mt-4 text-blue-600 dark:text-blue-400 hover:underline font-medium"
      >
        Read more
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}

