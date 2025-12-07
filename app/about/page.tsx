export const metadata = {
  title: 'About | My Personal Website',
  description: 'Learn more about me and my background',
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        About Me
      </h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Hello! I'm a passionate developer and writer who loves creating things and sharing
          knowledge with others. This website is my personal space where I document my journey,
          share my thoughts, and showcase my work.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          What I Do
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          I spend my time building web applications, writing about technology, and exploring
          new ideas. I'm always learning and trying to improve my skills.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Feel free to reach out if you'd like to connect, collaborate, or just say hello!
          You can find me on social media or send me an email.
        </p>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact Information
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Email:</strong> your.email@example.com
            </li>
            <li>
              <strong>GitHub:</strong>{' '}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                github.com/yourusername
              </a>
            </li>
            <li>
              <strong>Twitter:</strong>{' '}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                @yourusername
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

