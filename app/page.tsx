import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to My Website
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          I'm a developer, writer, and creator. This is my personal space on the web
          where I share my thoughts, projects, and experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Read My Blog
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            Learn More About Me
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
            Latest Blog Posts
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Check out my latest thoughts and articles on technology, development, and more.
          </p>
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            View all posts →
          </Link>
        </div>

        <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
            About Me
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Learn more about my background, interests, and what I'm working on.
          </p>
          <Link
            href="/about"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}
