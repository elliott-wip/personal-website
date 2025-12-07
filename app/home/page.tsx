import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#88a090] to-[#607868] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 
          className="text-4xl md:text-5xl font-bold text-[#303840]"
          style={{ fontFamily: 'monospace', textShadow: '3px 3px 0 #ffffff' }}
        >
          Welcome
        </h1>
        
        <p className="text-xl text-[#404850]" style={{ fontFamily: 'monospace' }}>
          You made it. Now explore.
        </p>

        <div className="grid gap-6 mt-12">
          {/* Coffee / Finance Blog */}
          <Link 
            href="/coffee"
            className="block px-8 py-6 bg-[#e8e0d0] border-4 border-[#303840] rounded-lg shadow-[6px_6px_0_0_#303840] hover:shadow-[3px_3px_0_0_#303840] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-100"
            style={{ imageRendering: 'pixelated' }}
          >
            <span className="text-2xl font-bold text-[#303840] block" style={{ fontFamily: 'monospace' }}>
              ☕ Slow Drip
            </span>
            <span className="text-sm text-[#505860] mt-2 block" style={{ fontFamily: 'monospace' }}>
              Finance blog & favorite reads
            </span>
          </Link>

          {/* About / Timeline */}
          <Link 
            href="/about"
            className="block px-8 py-6 bg-[#d0e0e8] border-4 border-[#303840] rounded-lg shadow-[6px_6px_0_0_#303840] hover:shadow-[3px_3px_0_0_#303840] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-100"
            style={{ imageRendering: 'pixelated' }}
          >
            <span className="text-2xl font-bold text-[#303840] block" style={{ fontFamily: 'monospace' }}>
              📍 The Journey
            </span>
            <span className="text-sm text-[#505860] mt-2 block" style={{ fontFamily: 'monospace' }}>
              Timeline & experiences
            </span>
          </Link>

          {/* Beliefs - Git commit style */}
          <Link 
            href="/beliefs"
            className="block px-8 py-6 bg-[#e0d8e8] border-4 border-[#303840] rounded-lg shadow-[6px_6px_0_0_#303840] hover:shadow-[3px_3px_0_0_#303840] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-100"
            style={{ imageRendering: 'pixelated' }}
          >
            <span className="text-2xl font-bold text-[#303840] block" style={{ fontFamily: 'monospace' }}>
              💭 What I Believe
            </span>
            <span className="text-sm text-[#505860] mt-2 block" style={{ fontFamily: 'monospace' }}>
              Git commits for ideas
            </span>
          </Link>
        </div>

        {/* Back to start */}
        <Link 
          href="/"
          className="inline-block mt-8 text-sm text-[#505860] hover:text-[#303840] transition-colors"
          style={{ fontFamily: 'monospace' }}
        >
          ← back to the car
        </Link>
      </div>
    </div>
  );
}

