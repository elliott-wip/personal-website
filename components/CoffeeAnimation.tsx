'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import Link from 'next/link';

// Pokemon Ruby/GBA color palette
const COLORS = {
  // Frame (wooden brown - pixel style)
  frameDark: '#3a2010',
  frameMid: '#5a3820',
  frameLight: '#7a4830',
  frameHighlight: '#9a6040',
  
  // Gold/Brass accents
  goldDark: '#8a6a10',
  goldMid: '#c49a20',
  goldLight: '#e4c040',
  goldHighlight: '#f4e070',
  
  // Glass (pixel blue-grey)
  glassDark: '#4a6a8a',
  glassMid: '#7a9aba',
  glassLight: '#aacaea',
  glassHighlight: '#daeafa',
  
  // Water
  waterDark: '#2a4a7a',
  waterMid: '#4a7aba',
  waterLight: '#7aaadc',
  
  // Coffee
  coffeeDark: '#1a0a00',
  coffeeMid: '#3a1a0a',
  coffeeLight: '#5a3020',
  
  // Background (Pokemon style sage/tan)
  bg1: '#88a090',
  bg2: '#607868',
  
  // Outlines
  outline: '#101820',
};

export default function CoffeeAnimation() {
  const [frame, setFrame] = useState(0);
  const [stage, setStage] = useState<'dripping' | 'brewing' | 'filling' | 'complete'>('dripping');
  const [cupFill, setCupFill] = useState(0);
  const [waterLevel, setWaterLevel] = useState(100);
  const [showLink, setShowLink] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const resetAnimation = () => {
    setStage('dripping');
    setCupFill(0);
    setWaterLevel(100);
    setShowLink(false);
    setAnimationKey(prev => prev + 1);
    setFrame(0);
  };

  // Animation loop - 12 FPS like GBA games
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => prev + 1);
    }, 83);
    return () => clearInterval(interval);
  }, []);

  // Stage progression
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStage('brewing'), 3000));
    timers.push(setTimeout(() => setStage('filling'), 6000));
    return () => timers.forEach(clearTimeout);
  }, [animationKey]);

  // Drain water
  useEffect(() => {
    if (stage === 'dripping' || stage === 'brewing' || stage === 'filling') {
      const drainInterval = setInterval(() => {
        setWaterLevel(prev => prev <= 0 ? 0 : prev - 0.8);
      }, 100);
      return () => clearInterval(drainInterval);
    }
  }, [stage, animationKey]);

  // Fill flask
  useEffect(() => {
    if (stage === 'filling') {
      const fillInterval = setInterval(() => {
        setCupFill(prev => {
          if (prev >= 100) {
            clearInterval(fillInterval);
            setStage('complete');
            setTimeout(() => setShowLink(true), 1000);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(fillInterval);
    }
  }, [stage]);

  // Sprite-based drip animation (4 frame cycle)
  const dripFrame = Math.floor(frame / 3) % 4;
  const dripPositions = [0, 8, 16, 24];
  const dripY = dripPositions[dripFrame];

  // Pixel size for the grid
  const P = 4;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#88a090] to-[#607868] px-4 py-8">
      {/* Back navigation */}
      <Link 
        href="/home"
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 bg-[#e8e0d0] border-3 border-[#303840] rounded shadow-[3px_3px_0_0_#303840] hover:shadow-[1px_1px_0_0_#303840] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 text-sm font-bold text-[#303840]"
        style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
      >
        <ArrowLeft size={16} weight="bold" />
        back
      </Link>
      
      <div className="relative flex flex-col items-center">
        <svg 
          width="280" 
          height="560" 
          viewBox="0 0 280 560"
          style={{ imageRendering: 'pixelated' }}
          className="drop-shadow-lg"
        >
          {/* ===== WOODEN FRAME (PIXEL STYLE) ===== */}
          
          {/* Left post */}
          <rect x={24} y={24} width={16} height={480} fill={COLORS.outline} />
          <rect x={28} y={28} width={8} height={472} fill={COLORS.frameMid} />
          <rect x={28} y={28} width={4} height={472} fill={COLORS.frameLight} />
          
          {/* Right post */}
          <rect x={240} y={24} width={16} height={480} fill={COLORS.outline} />
          <rect x={244} y={28} width={8} height={472} fill={COLORS.frameMid} />
          <rect x={244} y={28} width={4} height={472} fill={COLORS.frameLight} />
          
          {/* Top crossbar */}
          <rect x={20} y={20} width={240} height={16} fill={COLORS.outline} />
          <rect x={24} y={24} width={232} height={8} fill={COLORS.frameMid} />
          <rect x={24} y={24} width={232} height={4} fill={COLORS.frameLight} />
          
          {/* Upper shelf */}
          <rect x={20} y={180} width={240} height={12} fill={COLORS.outline} />
          <rect x={24} y={184} width={232} height={4} fill={COLORS.frameMid} />
          
          {/* Lower shelf */}
          <rect x={20} y={340} width={240} height={12} fill={COLORS.outline} />
          <rect x={24} y={344} width={232} height={4} fill={COLORS.frameMid} />
          
          {/* Bottom base */}
          <rect x={16} y={496} width={248} height={20} fill={COLORS.outline} />
          <rect x={20} y={500} width={240} height={12} fill={COLORS.frameMid} />
          <rect x={24} y={500} width={232} height={4} fill={COLORS.frameLight} />
          
          {/* Gold corner accents */}
          <rect x={20} y={16} width={24} height={24} fill={COLORS.goldDark} />
          <rect x={24} y={20} width={16} height={16} fill={COLORS.goldMid} />
          <rect x={28} y={24} width={8} height={8} fill={COLORS.goldLight} />
          
          <rect x={236} y={16} width={24} height={24} fill={COLORS.goldDark} />
          <rect x={240} y={20} width={16} height={16} fill={COLORS.goldMid} />
          <rect x={244} y={24} width={8} height={8} fill={COLORS.goldLight} />

          {/* ===== TOP WATER JAR (PIXEL) ===== */}
          
          {/* Jar rim */}
          <rect x={108} y={40} width={64} height={8} fill={COLORS.outline} />
          <rect x={112} y={44} width={56} height={4} fill={COLORS.glassMid} />
          
          {/* Jar body - pixelated rounded shape */}
          <rect x={88} y={48} width={104} height={8} fill={COLORS.outline} />
          <rect x={80} y={56} width={120} height={8} fill={COLORS.outline} />
          <rect x={76} y={64} width={128} height={48} fill={COLORS.outline} />
          <rect x={80} y={112} width={120} height={8} fill={COLORS.outline} />
          <rect x={88} y={120} width={104} height={8} fill={COLORS.outline} />
          
          {/* Jar glass fill */}
          <rect x={92} y={52} width={96} height={4} fill={COLORS.glassLight} />
          <rect x={84} y={56} width={112} height={4} fill={COLORS.glassLight} />
          <rect x={80} y={60} width={120} height={56} fill={COLORS.glassMid} />
          <rect x={84} y={116} width={112} height={4} fill={COLORS.glassMid} />
          
          {/* Jar highlight */}
          <rect x={84} y={64} width={8} height={40} fill={COLORS.glassHighlight} />

          {/* ===== FUNNEL WITH WATER (PIXEL) ===== */}
          
          {/* Funnel outline */}
          <rect x={76} y={132} width={128} height={8} fill={COLORS.outline} />
          <rect x={84} y={140} width={112} height={8} fill={COLORS.outline} />
          <rect x={92} y={148} width={96} height={8} fill={COLORS.outline} />
          <rect x={100} y={156} width={80} height={8} fill={COLORS.outline} />
          <rect x={108} y={164} width={64} height={8} fill={COLORS.outline} />
          <rect x={116} y={172} width={48} height={8} fill={COLORS.outline} />
          <rect x={124} y={180} width={32} height={8} fill={COLORS.outline} />
          
          {/* Funnel glass */}
          <rect x={80} y={136} width={120} height={4} fill={COLORS.glassLight} />
          <rect x={88} y={140} width={104} height={4} fill={COLORS.glassLight} />
          <rect x={96} y={144} width={88} height={8} fill={COLORS.glassMid} />
          <rect x={104} y={152} width={72} height={8} fill={COLORS.glassMid} />
          <rect x={112} y={160} width={56} height={8} fill={COLORS.glassMid} />
          <rect x={120} y={168} width={40} height={8} fill={COLORS.glassMid} />
          
          {/* Water in funnel - drains over time */}
          {waterLevel > 10 && (
            <>
              <rect x={88 + (100-waterLevel)*0.3} y={140} width={104 - (100-waterLevel)*0.6} height={4} fill={COLORS.waterMid} style={{opacity: waterLevel/100}} />
              <rect x={96 + (100-waterLevel)*0.4} y={144} width={88 - (100-waterLevel)*0.8} height={8} fill={COLORS.waterDark} style={{opacity: waterLevel/100}} />
              {waterLevel > 40 && (
                <rect x={104 + (100-waterLevel)*0.3} y={152} width={72 - (100-waterLevel)*0.6} height={8} fill={COLORS.waterDark} style={{opacity: waterLevel/100}} />
              )}
              <rect x={100 + (100-waterLevel)*0.2} y={142} width={16} height={4} fill={COLORS.waterLight} style={{opacity: waterLevel/100}} />
            </>
          )}
          
          {/* Drip spout */}
          <rect x={132} y={188} width={16} height={20} fill={COLORS.outline} />
          <rect x={136} y={192} width={8} height={12} fill={COLORS.waterDark} />

          {/* ===== SMALL RECEIVING CUP (PIXEL) ===== */}
          
          <rect x={116} y={216} width={48} height={8} fill={COLORS.outline} />
          <rect x={112} y={224} width={56} height={16} fill={COLORS.outline} />
          <rect x={120} y={220} width={40} height={4} fill={COLORS.glassLight} />
          <rect x={116} y={224} width={48} height={12} fill={COLORS.glassMid} />
          <rect x={120} y={228} width={8} height={8} fill={COLORS.glassHighlight} />

          {/* ===== COFFEE GROUNDS CONTAINER (PIXEL) ===== */}
          
          <rect x={108} y={248} width={64} height={52} fill={COLORS.outline} />
          <rect x={112} y={252} width={56} height={44} fill={COLORS.coffeeMid} />
          <rect x={116} y={256} width={48} height={8} fill={COLORS.coffeeLight} />
          <rect x={116} y={264} width={48} height={4} fill={COLORS.coffeeDark} />
          
          {/* Drip spout from grounds */}
          <rect x={132} y={300} width={16} height={16} fill={COLORS.outline} />
          <rect x={136} y={304} width={8} height={8} fill={COLORS.coffeeDark} />

          {/* ===== SPIRAL TUBING (PIXEL) ===== */}
          
          {/* Spiral coils - pixelated */}
          <rect x={136} y={316} width={8} height={12} fill={COLORS.outline} />
          <rect x={136} y={328} width={48} height={8} fill={COLORS.outline} />
          <rect x={176} y={336} width={8} height={24} fill={COLORS.outline} />
          <rect x={128} y={352} width={56} height={8} fill={COLORS.outline} />
          <rect x={96} y={360} width={40} height={8} fill={COLORS.outline} />
          <rect x={96} y={368} width={8} height={24} fill={COLORS.outline} />
          <rect x={96} y={384} width={56} height={8} fill={COLORS.outline} />
          <rect x={144} y={392} width={8} height={16} fill={COLORS.outline} />
          <rect x={112} y={400} width={40} height={8} fill={COLORS.outline} />
          <rect x={112} y={408} width={8} height={16} fill={COLORS.outline} />
          <rect x={112} y={416} width={32} height={8} fill={COLORS.outline} />
          <rect x={136} y={424} width={8} height={20} fill={COLORS.outline} />
          
          {/* Spiral glass fill */}
          <rect x={140} y={320} width={4} height={8} fill={COLORS.glassLight} />
          <rect x={140} y={332} width={40} height={4} fill={COLORS.glassLight} />
          <rect x={180} y={340} width={4} height={16} fill={COLORS.glassLight} />
          <rect x={132} y={356} width={48} height={4} fill={COLORS.glassLight} />
          <rect x={100} y={364} width={32} height={4} fill={COLORS.glassLight} />
          <rect x={100} y={372} width={4} height={16} fill={COLORS.glassLight} />
          <rect x={100} y={388} width={48} height={4} fill={COLORS.glassLight} />
          <rect x={148} y={396} width={4} height={8} fill={COLORS.glassLight} />
          <rect x={116} y={404} width={32} height={4} fill={COLORS.glassLight} />
          <rect x={116} y={412} width={4} height={8} fill={COLORS.glassLight} />
          <rect x={116} y={420} width={24} height={4} fill={COLORS.glassLight} />
          <rect x={140} y={428} width={4} height={12} fill={COLORS.glassLight} />

          {/* ===== BOTTOM FLASK (PIXEL) ===== */}
          
          {/* Flask neck */}
          <rect x={124} y={444} width={32} height={16} fill={COLORS.outline} />
          <rect x={128} y={448} width={24} height={8} fill={COLORS.glassMid} />
          <rect x={132} y={448} width={8} height={8} fill={COLORS.glassLight} />
          
          {/* Flask body - pixelated round bottom */}
          <rect x={108} y={460} width={64} height={8} fill={COLORS.outline} />
          <rect x={92} y={468} width={96} height={8} fill={COLORS.outline} />
          <rect x={84} y={476} width={112} height={20} fill={COLORS.outline} />
          <rect x={92} y={496} width={96} height={4} fill={COLORS.outline} />
          
          {/* Flask glass */}
          <rect x={112} y={464} width={56} height={4} fill={COLORS.glassLight} />
          <rect x={96} y={468} width={88} height={4} fill={COLORS.glassLight} />
          <rect x={88} y={472} width={104} height={20} fill={COLORS.glassMid} />
          
          {/* Coffee in flask */}
          {cupFill > 0 && (
            <>
              <rect 
                x={92} 
                y={492 - cupFill * 0.2} 
                width={96} 
                height={Math.min(cupFill * 0.24, 24)} 
                fill={COLORS.coffeeDark} 
              />
              <rect 
                x={96} 
                y={490 - cupFill * 0.2} 
                width={88} 
                height={4} 
                fill={COLORS.coffeeMid} 
              />
            </>
          )}
          
          {/* Flask highlight */}
          <rect x={92} y={476} width={8} height={16} fill={COLORS.glassHighlight} />

          {/* ===== DRIP ANIMATIONS ===== */}
          
          {/* Water drip from funnel */}
          {waterLevel > 0 && (stage === 'dripping' || stage === 'brewing' || stage === 'filling') && (
            <rect 
              x={136} 
              y={208 + dripY * 0.3} 
              width={8} 
              height={8} 
              fill={COLORS.waterMid}
            />
          )}
          
          {/* Coffee drip through spiral */}
          {(stage === 'brewing' || stage === 'filling') && (
            <rect 
              x={136} 
              y={320 + (frame % 40) * 2.5} 
              width={8} 
              height={8} 
              fill={COLORS.coffeeMid}
              opacity={0.9}
            />
          )}
          
          {/* Coffee drip into flask */}
          {stage === 'filling' && (
            <rect 
              x={136} 
              y={440 + (dripY % 16)} 
              width={8} 
              height={8} 
              fill={COLORS.coffeeMid}
            />
          )}
          
          {/* ===== STEAM (when complete) ===== */}
          {stage === 'complete' && (
            <>
              {[0, 1, 2].map((i) => {
                const steamFrame = Math.floor((frame + i * 4) / 4) % 6;
                const yOffset = steamFrame * 8;
                const opacity = 1 - steamFrame / 6;
                return (
                  <g key={`steam-${i}`} opacity={opacity}>
                    <rect x={120 + i * 16} y={456 - yOffset} width={8} height={8} fill="#c0c8d0" />
                    <rect x={124 + i * 16} y={448 - yOffset} width={4} height={8} fill="#d0d8e0" />
                  </g>
                );
              })}
            </>
          )}
        </svg>

        {/* Link Reveal - Pokemon Ruby Style Button */}
        {showLink && (
          <div className="mt-12 text-center space-y-6 animate-fade-in">
            <a
              href="https://www.linkedin.com/in/elliotttchang/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-8 py-4 bg-[#e8e0d0] border-4 border-[#303840] rounded shadow-[4px_4px_0_0_#303840] hover:shadow-[2px_2px_0_0_#303840] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 group"
              style={{ imageRendering: 'pixelated' }}
            >
              <span className="text-xl font-bold text-[#303840]" style={{ fontFamily: 'monospace' }}>
                Thanks for your patience
              </span>
              <ArrowRight
                size={24}
                className="text-[#303840] group-hover:translate-x-1 transition-transform"
                weight="bold"
              />
            </a>

            <button
              onClick={resetAnimation}
              className="block mx-auto px-6 py-3 bg-[#5a3820] border-4 border-[#303840] rounded shadow-[4px_4px_0_0_#303840] hover:shadow-[2px_2px_0_0_#303840] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-100 text-lg font-bold text-[#f8f0e0]"
              style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}
            >
              More coffee please
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
