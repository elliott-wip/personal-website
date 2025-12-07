'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from '@phosphor-icons/react';

// Pokemon Ruby color palette
const COLORS = {
  // Frame (dark teal/green)
  frameDark: '#1a3830',
  frameMid: '#2d5a4a',
  frameLight: '#3d7a62',
  frameHighlight: '#5a9a7a',
  
  // Gold/Brass
  goldDark: '#8a6a10',
  goldMid: '#c49a20',
  goldLight: '#e4c040',
  goldHighlight: '#f4e070',
  
  // Glass
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
  
  // Outlines
  outline: '#101820',
};

export default function CoffeeAnimation() {
  const [frame, setFrame] = useState(0);
  const [stage, setStage] = useState<'dripping' | 'brewing' | 'filling' | 'complete'>('dripping');
  const [cupFill, setCupFill] = useState(0);
  const [showLink, setShowLink] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const resetAnimation = () => {
    setStage('dripping');
    setCupFill(0);
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

  // Fill cup
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

  // Pixel helper - creates a single pixel
  const px = (x: number, y: number, color: string, size: number = 4) => (
    <rect key={`${x}-${y}-${color}`} x={x * size} y={y * size} width={size} height={size} fill={color} />
  );

  // Create pixelated rectangle with outline
  const pixelRect = (x: number, y: number, w: number, h: number, fill: string, outline: string = COLORS.outline) => {
    const pixels = [];
    const size = 4;
    // Fill
    for (let i = 1; i < w - 1; i++) {
      for (let j = 1; j < h - 1; j++) {
        pixels.push(px(x + i, y + j, fill, size));
      }
    }
    // Outline
    for (let i = 0; i < w; i++) {
      pixels.push(px(x + i, y, outline, size));
      pixels.push(px(x + i, y + h - 1, outline, size));
    }
    for (let j = 1; j < h - 1; j++) {
      pixels.push(px(x, y + j, outline, size));
      pixels.push(px(x + w - 1, y + j, outline, size));
    }
    return pixels;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#88a8a8] to-[#607878] px-4 py-8">
      <div className="relative">
        {/* Kyoto Cold Brew - Pokemon Ruby Pixel Art Style */}
        <svg 
          width="280" 
          height="520" 
          viewBox="0 0 280 520"
          style={{ imageRendering: 'pixelated' }}
          className="drop-shadow-lg"
        >
          {/* ===== FRAME STRUCTURE ===== */}
          
          {/* Left post */}
          <rect x="20" y="40" width="16" height="420" fill={COLORS.frameDark} />
          <rect x="24" y="44" width="4" height="412" fill={COLORS.frameLight} />
          <rect x="28" y="44" width="4" height="412" fill={COLORS.frameMid} />
          
          {/* Right post */}
          <rect x="244" y="40" width="16" height="420" fill={COLORS.frameDark} />
          <rect x="248" y="44" width="4" height="412" fill={COLORS.frameLight} />
          <rect x="252" y="44" width="4" height="412" fill={COLORS.frameMid} />
          
          {/* Top crossbar */}
          <rect x="20" y="40" width="240" height="16" fill={COLORS.frameDark} />
          <rect x="24" y="44" width="232" height="4" fill={COLORS.frameLight} />
          <rect x="24" y="48" width="232" height="4" fill={COLORS.frameMid} />
          
          {/* Middle shelf */}
          <rect x="20" y="276" width="240" height="12" fill={COLORS.frameDark} />
          <rect x="24" y="280" width="232" height="4" fill={COLORS.frameLight} />
          
          {/* Base */}
          <rect x="12" y="452" width="256" height="20" fill={COLORS.frameDark} />
          <rect x="16" y="456" width="248" height="4" fill={COLORS.frameLight} />
          <rect x="16" y="460" width="248" height="8" fill={COLORS.frameMid} />

          {/* ===== GOLD DECORATIONS ===== */}
          
          {/* Top left gold */}
          <rect x="16" y="36" width="24" height="24" fill={COLORS.goldDark} />
          <rect x="20" y="40" width="16" height="16" fill={COLORS.goldMid} />
          <rect x="24" y="44" width="8" height="8" fill={COLORS.goldLight} />
          <rect x="28" y="48" width="4" height="4" fill={COLORS.goldHighlight} />
          
          {/* Top right gold */}
          <rect x="240" y="36" width="24" height="24" fill={COLORS.goldDark} />
          <rect x="244" y="40" width="16" height="16" fill={COLORS.goldMid} />
          <rect x="248" y="44" width="8" height="8" fill={COLORS.goldLight} />
          <rect x="252" y="48" width="4" height="4" fill={COLORS.goldHighlight} />

          {/* ===== WATER CHAMBER (SPHERE) ===== */}
          
          {/* Sphere outline */}
          <ellipse cx="140" cy="100" rx="44" ry="40" fill={COLORS.outline} />
          <ellipse cx="140" cy="100" rx="40" ry="36" fill={COLORS.glassDark} />
          <ellipse cx="140" cy="100" rx="36" ry="32" fill={COLORS.glassMid} />
          
          {/* Water inside sphere */}
          <ellipse cx="140" cy="108" rx="32" ry="24" fill={COLORS.waterDark} />
          <ellipse cx="140" cy="108" rx="28" ry="20" fill={COLORS.waterMid} />
          <rect x="116" y="100" width="16" height="8" fill={COLORS.waterLight} />
          
          {/* Glass highlight */}
          <rect x="108" y="76" width="20" height="8" fill={COLORS.glassHighlight} />
          <rect x="112" y="72" width="12" height="4" fill={COLORS.glassHighlight} />

          {/* ===== FUNNEL ===== */}
          
          <polygon points="112,144 168,144 156,176 124,176" fill={COLORS.outline} />
          <polygon points="116,148 164,148 154,172 126,172" fill={COLORS.glassLight} />
          <polygon points="120,152 160,152 152,168 128,168" fill={COLORS.glassHighlight} />

          {/* ===== MIDDLE BULB ===== */}
          
          <ellipse cx="140" cy="204" rx="24" ry="20" fill={COLORS.outline} />
          <ellipse cx="140" cy="204" rx="20" ry="16" fill={COLORS.glassMid} />
          <ellipse cx="140" cy="204" rx="16" ry="12" fill={COLORS.glassLight} />
          <rect x="132" y="192" width="8" height="4" fill={COLORS.glassHighlight} />

          {/* ===== SPIGOT VALVE ===== */}
          
          {/* Vertical part */}
          <rect x="132" y="224" width="16" height="28" fill={COLORS.outline} />
          <rect x="136" y="228" width="8" height="20" fill={COLORS.goldMid} />
          <rect x="138" y="230" width="4" height="16" fill={COLORS.goldLight} />
          
          {/* T-handle */}
          <rect x="104" y="240" width="72" height="12" fill={COLORS.outline} />
          <rect x="108" y="244" width="64" height="4" fill={COLORS.goldMid} />
          <rect x="112" y="244" width="56" height="2" fill={COLORS.goldLight} />
          
          {/* Handle ends */}
          <rect x="100" y="236" width="12" height="20" fill={COLORS.goldDark} />
          <rect x="104" y="240" width="4" height="12" fill={COLORS.goldLight} />
          <rect x="168" y="236" width="12" height="20" fill={COLORS.goldDark} />
          <rect x="172" y="240" width="4" height="12" fill={COLORS.goldLight} />

          {/* ===== COFFEE GROUNDS CHAMBER ===== */}
          
          {/* Glass container */}
          <rect x="84" y="292" width="112" height="108" fill={COLORS.outline} />
          <rect x="88" y="296" width="104" height="100" fill={COLORS.glassDark} />
          <rect x="92" y="300" width="96" height="92" fill={COLORS.glassMid} />
          <rect x="96" y="304" width="88" height="84" fill={COLORS.glassLight} />
          
          {/* Coffee grounds */}
          <rect x="96" y="348" width="88" height="36" fill={COLORS.coffeeDark} />
          <rect x="100" y="352" width="80" height="4" fill={COLORS.coffeeMid} />
          <rect x="104" y="356" width="72" height="4" fill={COLORS.coffeeLight} />
          
          {/* Measurement lines */}
          <rect x="180" y="320" width="12" height="2" fill={COLORS.outline} />
          <rect x="180" y="348" width="12" height="2" fill={COLORS.outline} />
          <rect x="180" y="376" width="12" height="2" fill={COLORS.outline} />
          
          {/* Glass highlight */}
          <rect x="100" y="308" width="8" height="32" fill={COLORS.glassHighlight} />

          {/* ===== CARAFE ===== */}
          
          {/* Carafe body */}
          <polygon points="96,416 88,480 88,488 192,488 192,480 184,416" fill={COLORS.outline} />
          <polygon points="100,420 92,476 92,484 188,484 188,476 180,420" fill={COLORS.glassDark} />
          <polygon points="104,424 96,472 96,480 184,480 184,472 176,424" fill={COLORS.glassMid} />
          
          {/* Coffee fill */}
          {cupFill > 0 && (
            <>
              <polygon 
                points={`100,${484 - cupFill * 0.6} 92,476 92,484 188,484 188,476 180,${484 - cupFill * 0.6}`}
                fill={COLORS.coffeeDark} 
              />
              <rect x="96" y={480 - cupFill * 0.6} width="88" height="4" fill={COLORS.coffeeMid} />
            </>
          )}
          
          {/* Handle */}
          <rect x="184" y="432" width="28" height="8" fill={COLORS.outline} />
          <rect x="208" y="432" width="8" height="48" fill={COLORS.outline} />
          <rect x="184" y="472" width="32" height="8" fill={COLORS.outline} />
          <rect x="188" y="436" width="20" height="4" fill={COLORS.glassMid} />
          <rect x="204" y="436" width="4" height="40" fill={COLORS.glassMid} />
          
          {/* Glass highlight */}
          <rect x="108" y="428" width="8" height="40" fill={COLORS.glassHighlight} />

          {/* ===== DRIP ANIMATIONS ===== */}
          
          {/* Water drip from sphere */}
          {(stage === 'dripping' || stage === 'brewing' || stage === 'filling') && (
            <rect 
              x="136" 
              y={148 + dripY} 
              width="8" 
              height="8" 
              fill={COLORS.waterMid}
            />
          )}
          
          {/* Water drip through valve */}
          {(stage === 'brewing' || stage === 'filling') && (
            <rect 
              x="136" 
              y={256 + ((dripY + 12) % 32)} 
              width="8" 
              height="8" 
              fill={COLORS.waterLight}
            />
          )}
          
          {/* Coffee drip to carafe */}
          {stage === 'filling' && (
            <rect 
              x="136" 
              y={404 + ((dripY + 8) % 20)} 
              width="8" 
              height="8" 
              fill={COLORS.coffeeMid}
            />
          )}
          
          {/* ===== STEAM ===== */}
          
          {stage === 'complete' && (
            <>
              {[0, 1, 2].map((i) => {
                const steamFrame = Math.floor((frame + i * 4) / 4) % 6;
                const yOffset = steamFrame * 8;
                const opacity = 1 - steamFrame / 6;
                return (
                  <g key={`steam-${i}`} opacity={opacity}>
                    <rect x={124 + i * 16} y={408 - yOffset} width="8" height="8" fill="#c0c8d0" />
                    <rect x={128 + i * 16} y={400 - yOffset} width="4" height="8" fill="#d0d8e0" />
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
              className="block mx-auto px-6 py-3 bg-[#c08040] border-4 border-[#303840] rounded shadow-[4px_4px_0_0_#303840] hover:shadow-[2px_2px_0_0_#303840] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-100 text-lg font-bold text-[#f8f0e0]"
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
