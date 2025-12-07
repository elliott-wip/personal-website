'use client';

import { useEffect, useMemo, useState, type ReactElement } from 'react';
import { useRouter } from 'next/navigation';

export default function FerrisAnimation() {
  const router = useRouter();
  const P = 6;

  const [frame, setFrame] = useState(0);
  const [t, setT] = useState(0);

  useEffect(() => {
    const f = setInterval(() => setFrame(f => f + 1), 83);
    return () => clearInterval(f);
  }, []);

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const prog = Math.min(1, (now - start) / 2000);
      setT(prog);
      if (prog < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
  const drive = easeOut(t);

  const C = useMemo(() => ({
    carMid: '#c42222',
    carLight: '#dc3838',
    carDark: '#901818',
    black: '#181818',
    grayDark: '#484848',
    grayMid: '#686868',
    grayLight: '#989898',
    grayLighter: '#b0b0b0',
    white: '#f0f0f0',
    cream: '#f0e8c0',
    creamDark: '#d8d0a8',
    yellow: '#e8c820',
    skin: '#f0c8a8',
    skinPink: '#e8a088',
    brownHair: '#785028',
    brownHairDark: '#503818',
    darkHair: '#202020',
    hatGray: '#787878',
    hatLight: '#909090',
    hatDark: '#505050',
    road: '#a08060',
    roadDark: '#806848',
    roadLight: '#b89878',
    sky: '#88c8e8',
    dialogBg: '#f0f8f8',
    dialogBorder: '#404850',
    dialogShadow: '#8ac0d0',
  }), []);

  const px = (x: number, y: number, color: string) => (
    <rect key={`${x}-${y}-${Math.random()}`} x={x * P} y={y * P} width={P} height={P} fill={color} />
  );
  
  const rect = (x: number, y: number, w: number, h: number, color: string) => {
    const pixels: ReactElement[] = [];
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        pixels.push(<rect key={`r${x+i}-${y+j}-${Math.random()}`} x={(x + i) * P} y={(y + j) * P} width={P} height={P} fill={color} />);
      }
    }
    return pixels;
  };
  
  const hLine = (x: number, y: number, len: number, color: string) => {
    const pixels: ReactElement[] = [];
    for (let i = 0; i < len; i++) {
      pixels.push(<rect key={`h${x+i}-${y}-${Math.random()}`} x={(x + i) * P} y={y * P} width={P} height={P} fill={color} />);
    }
    return pixels;
  };

  const carY = -42 + drive * 52 + Math.sin(frame * 0.15) * 0.3;
  const floorShift = (drive * 12) % 4;
  const showStop = drive > 0.8;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden relative" style={{ backgroundColor: C.sky }}>

      <svg width={44 * P} height={50 * P} viewBox={`0 0 ${44 * P} ${50 * P}`} style={{ imageRendering: 'pixelated' }}>
        
        {/* Road */}
        {rect(0, 34, 44, 16, C.road)}
        {hLine(0, 36 + floorShift, 44, C.roadDark)}
        {hLine(0, 40 + floorShift, 44, C.roadLight)}
        {hLine(0, 44 + floorShift, 44, C.roadDark)}
        {hLine(0, 48 + floorShift, 44, C.roadLight)}

        <g transform={`translate(0, ${carY})`}>
          
          {/* ===== WINDSHIELD WITH HORIZONTAL STRIPES ===== */}
          {/* Base gray */}
          {rect(9, 2, 26, 12, C.grayMid)}
          {/* Horizontal stripes - alternating */}
          {hLine(9, 3, 26, C.grayDark)}
          {hLine(9, 5, 26, C.grayDark)}
          {hLine(9, 7, 26, C.grayDark)}
          {hLine(9, 9, 26, C.grayDark)}
          {hLine(9, 11, 26, C.grayDark)}
          {hLine(9, 4, 26, C.grayLight)}
          {hLine(9, 6, 26, C.grayLight)}
          {hLine(9, 8, 26, C.grayLight)}
          {hLine(9, 10, 26, C.grayLight)}
          {hLine(9, 12, 26, C.grayLight)}

          {/* ===== FERRIS (LEFT) - through windshield ===== */}
          {/* Brown hair - dome with vertical texture */}
          {hLine(12, 1, 7, C.brownHair)}
          {hLine(11, 2, 9, C.brownHair)}
          {hLine(11, 3, 9, C.brownHair)}
          {hLine(11, 4, 9, C.brownHair)}
          {/* Hair texture - vertical stripes */}
          {px(12, 2, C.brownHairDark)}
          {px(14, 2, C.brownHairDark)}
          {px(16, 2, C.brownHairDark)}
          {px(18, 2, C.brownHairDark)}
          {px(13, 3, C.brownHairDark)}
          {px(15, 3, C.brownHairDark)}
          {px(17, 3, C.brownHairDark)}
          {px(12, 4, C.brownHairDark)}
          {px(14, 4, C.brownHairDark)}
          {px(16, 4, C.brownHairDark)}
          {px(18, 4, C.brownHairDark)}
          {/* Hair sides framing face */}
          {rect(11, 5, 2, 4, C.brownHair)}
          {rect(18, 5, 2, 4, C.brownHair)}
          {/* Face */}
          {rect(13, 5, 5, 6, C.skin)}
          {/* Pink cheek highlight - prominent */}
          {px(13, 7, C.skinPink)}
          {px(13, 8, C.skinPink)}
          {px(14, 8, C.white)} {/* White glare */}
          {/* Eyes - small black */}
          {px(14, 6, C.black)}
          {px(16, 6, C.black)}
          {/* Nose hint */}
          {px(15, 8, C.skinPink)}

          {/* ===== CAMERON (RIGHT) - through windshield ===== */}
          {/* Gray flat cap */}
          {hLine(26, 1, 7, C.hatGray)}
          {hLine(25, 2, 9, C.hatLight)}
          {hLine(25, 3, 9, C.hatGray)}
          {hLine(24, 4, 11, C.hatDark)} {/* Brim */}
          {/* Cap highlight */}
          {hLine(27, 2, 4, C.grayLighter)}
          {/* Dark hair under cap */}
          {hLine(25, 5, 9, C.darkHair)}
          {hLine(25, 6, 9, C.darkHair)}
          {/* Hair sides */}
          {rect(25, 7, 2, 2, C.darkHair)}
          {rect(32, 7, 2, 2, C.darkHair)}
          {/* Face */}
          {rect(27, 7, 5, 4, C.skin)}
          {/* Eyes */}
          {px(28, 8, C.black)}
          {px(30, 8, C.black)}
          {/* Pink cheek */}
          {px(31, 9, C.skinPink)}

          {/* ===== WINDSHIELD BLACK FRAME ===== */}
          {/* Top curve */}
          {hLine(13, 0, 18, C.black)}
          {hLine(11, 1, 22, C.black)}
          {hLine(9, 2, 26, C.black)}
          {/* Left A-pillar */}
          {rect(7, 2, 2, 12, C.black)}
          {/* Right A-pillar */}
          {rect(35, 2, 2, 12, C.black)}
          {/* Bottom frame */}
          {hLine(7, 14, 30, C.black)}

          {/* ===== SIDE MIRRORS - at face level, stick out ===== */}
          {rect(3, 7, 4, 3, C.grayMid)}
          {px(4, 8, C.grayLight)}
          {rect(37, 7, 4, 3, C.grayMid)}
          {px(39, 8, C.grayLight)}

          {/* ===== TALL HOOD ===== */}
          {rect(7, 15, 30, 8, C.carMid)}
          {/* Hood highlights */}
          {hLine(9, 15, 26, C.carLight)}
          {hLine(8, 16, 28, C.carLight)}
          
          {/* Hood vent - black rectangle at top */}
          {rect(19, 15, 6, 2, C.black)}
          
          {/* Yellow badge - vertical stripe below vent */}
          {rect(21, 18, 2, 3, C.yellow)}

          {/* ===== LARGE HEADLIGHTS - cream with black outline ===== */}
          {/* Left headlight */}
          {rect(3, 17, 6, 6, C.black)} {/* Black outline */}
          {rect(4, 18, 4, 4, C.cream)} {/* Cream fill */}
          {px(4, 18, C.white)} {/* Highlight */}
          {px(5, 18, C.white)}
          {hLine(4, 21, 4, C.creamDark)} {/* Shadow */}
          {/* White outer edge */}
          {px(3, 17, C.grayLight)}
          {px(8, 17, C.grayLight)}
          {px(3, 22, C.grayLight)}
          {px(8, 22, C.grayLight)}
          
          {/* Right headlight */}
          {rect(35, 17, 6, 6, C.black)}
          {rect(36, 18, 4, 4, C.cream)}
          {px(36, 18, C.white)}
          {px(37, 18, C.white)}
          {hLine(36, 21, 4, C.creamDark)}
          {px(35, 17, C.grayLight)}
          {px(40, 17, C.grayLight)}
          {px(35, 22, C.grayLight)}
          {px(40, 22, C.grayLight)}

          {/* ===== GRILLE - chrome frame, yellow signals, checkered center ===== */}
          {/* White/chrome top border */}
          {hLine(10, 23, 24, C.white)}
          
          {/* Left yellow turn signal */}
          {rect(11, 24, 3, 2, C.yellow)}
          
          {/* Checkered grille center - BLACK background */}
          {rect(14, 24, 16, 2, C.black)}
          {/* Checker pattern */}
          {px(15, 24, C.grayDark)}
          {px(17, 24, C.grayDark)}
          {px(19, 24, C.grayDark)}
          {px(21, 24, C.grayDark)}
          {px(23, 24, C.grayDark)}
          {px(25, 24, C.grayDark)}
          {px(27, 24, C.grayDark)}
          {px(16, 25, C.grayDark)}
          {px(18, 25, C.grayDark)}
          {px(20, 25, C.grayDark)}
          {px(22, 25, C.grayDark)}
          {px(24, 25, C.grayDark)}
          {px(26, 25, C.grayDark)}
          {px(28, 25, C.grayDark)}
          
          {/* Right yellow turn signal */}
          {rect(30, 24, 3, 2, C.yellow)}
          
          {/* White/chrome bottom border */}
          {hLine(10, 26, 24, C.white)}

          {/* ===== CHROME BUMPER ===== */}
          {hLine(3, 27, 38, C.grayDark)}
          {hLine(2, 28, 40, C.white)}
          {hLine(3, 29, 38, C.grayMid)}
          
          {/* ===== BLACK BOTTOM ===== */}
          {hLine(2, 30, 40, C.black)}

          {/* ===== TIRES ===== */}
          {rect(2, 31, 4, 2, C.black)}
          {rect(38, 31, 4, 2, C.black)}
        </g>
      </svg>

      {/* Stop sign */}
      {showStop && (
        <button
          onClick={() => router.push('/home')}
          className="mt-4 animate-fade-in cursor-pointer transition-transform hover:scale-110 active:scale-95"
          aria-label="Enter site"
        >
          <svg width={26 * P} height={26 * P} viewBox={`0 0 ${26 * P} ${26 * P}`} style={{ imageRendering: 'pixelated' }}>
            {rect(11, 12, 4, 12, '#505050')}
            {rect(12, 13, 2, 10, '#707070')}
            
            {hLine(7, 2, 12, '#b01010')}
            {hLine(5, 3, 16, '#cc1818')}
            {hLine(4, 4, 18, '#cc1818')}
            {hLine(3, 5, 20, '#cc1818')}
            {hLine(3, 6, 20, '#cc1818')}
            {hLine(3, 7, 20, '#cc1818')}
            {hLine(3, 8, 20, '#cc1818')}
            {hLine(4, 9, 18, '#cc1818')}
            {hLine(5, 10, 16, '#cc1818')}
            {hLine(7, 11, 12, '#b01010')}
            
            {hLine(5, 4, 3, C.white)}
            {px(5, 5, C.white)}
            {hLine(5, 6, 3, C.white)}
            {px(7, 7, C.white)}
            {hLine(5, 8, 3, C.white)}
            
            {hLine(9, 4, 3, C.white)}
            {px(10, 5, C.white)}
            {px(10, 6, C.white)}
            {px(10, 7, C.white)}
            {px(10, 8, C.white)}
            
            {hLine(13, 4, 3, C.white)}
            {px(13, 5, C.white)}
            {px(15, 5, C.white)}
            {px(13, 6, C.white)}
            {px(15, 6, C.white)}
            {px(13, 7, C.white)}
            {px(15, 7, C.white)}
            {hLine(13, 8, 3, C.white)}
            
            {px(17, 4, C.white)}
            {px(17, 5, C.white)}
            {px(17, 6, C.white)}
            {px(17, 7, C.white)}
            {px(17, 8, C.white)}
            {hLine(17, 4, 3, C.white)}
            {px(19, 5, C.white)}
            {hLine(17, 6, 3, C.white)}
            
            <text x={13 * P} y={24 * P} textAnchor="middle" fill="#505050" fontSize="10" fontFamily="monospace">
              click to enter
            </text>
          </svg>
        </button>
      )}

      {/* Quote box */}
      {showStop && (
        <div className="mt-4 max-w-sm animate-fade-in" style={{ imageRendering: 'pixelated' }}>
          <div className="p-4 rounded-lg border-4" style={{
            backgroundColor: C.dialogBg,
            borderColor: C.dialogBorder,
            boxShadow: `4px 4px 0 0 ${C.dialogShadow}`,
            fontFamily: 'monospace',
            fontSize: '13px',
            lineHeight: '1.7',
            color: '#303030',
            textAlign: 'center',
          }}>
            &ldquo;Life moves pretty fast. If you don&apos;t 🛑 and look around once in a while, you could miss it.&rdquo;
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.35s ease-out; }
      `}</style>
    </div>
  );
}
