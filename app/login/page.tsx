'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Lock } from '@phosphor-icons/react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid password');
      } else {
        router.push('/beliefs');
        router.refresh();
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">
      <div className="max-w-md mx-auto px-6 py-8">
        <Link 
          href="/home"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span style={{ fontFamily: 'monospace' }}>back to home</span>
        </Link>

        <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={32} className="text-green-400" />
            <h1 
              className="text-2xl font-bold"
              style={{ fontFamily: 'monospace' }}
            >
              Admin Login
            </h1>
          </div>

          <p className="text-gray-400 mb-6" style={{ fontFamily: 'monospace' }}>
            Enter the admin password to manage beliefs.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                htmlFor="password" 
                className="block text-sm text-gray-400 mb-2"
                style={{ fontFamily: 'monospace' }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                style={{ fontFamily: 'monospace' }}
                placeholder="Enter password..."
                required
              />
            </div>

            {error && (
              <p 
                className="text-red-400 text-sm mb-4"
                style={{ fontFamily: 'monospace' }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
              style={{ fontFamily: 'monospace' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
