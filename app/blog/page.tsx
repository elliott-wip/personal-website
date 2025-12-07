import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';

export const metadata = {
  title: 'Blog | My Personal Website',
  description: 'Read my latest blog posts and articles',
};

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Blog
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
        Thoughts, ideas, and stories from my journey.
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No blog posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-b-0"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <time
                dateTime={post.date}
                className="text-sm text-gray-500 dark:text-gray-500"
              >
                {post.date ? format(new Date(post.date), 'MMMM d, yyyy') : ''}
              </time>
              {post.excerpt && (
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  {post.excerpt}
                </p>
              )}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

