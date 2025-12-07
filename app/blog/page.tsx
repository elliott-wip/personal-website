import { getAllPosts } from '@/lib/posts';
import BlogHeader from '@/components/BlogHeader';
import BlogPostCard from '@/components/BlogPostCard';

export const metadata = {
  title: 'Blog | My Personal Website',
  description: 'Read my latest blog posts and articles',
};

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <BlogHeader />
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
            <BlogPostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      )}
    </div>
  );
}

