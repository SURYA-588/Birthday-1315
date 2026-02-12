
import React, { useEffect, useState } from 'react';
import { Particle } from '../types';

const HeartShape: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const FloatingHearts: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const heartColors = ['#fda4af', '#f43f5e', '#fb7185', '#e11d48'];
      const confettiColors = ['#fde68a', '#fbcfe8', '#ddd6fe', '#fecdd3'];

      const newParticles: Particle[] = Array.from({ length: 30 }).map((_, i) => {
        const isHeart = Math.random() > 0.4;
        const colorPalette = isHeart ? heartColors : confettiColors;

        return {
          id: i,
          x: Math.random() * 100,
          size: isHeart ? (Math.random() * 14 + 10) : (Math.random() * 6 + 4),
          duration: Math.random() * 8 + 6,
          delay: Math.random() * 10,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
          type: isHeart ? 'heart' : 'confetti',
          sway: (Math.random() - 0.5) * 150,
          rotation: (Math.random() - 0.5) * 720,
          borderRadius: !isHeart ? (Math.random() > 0.5 ? '50%' : '2px') : '0'
        };
      });
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle absolute bottom-[-60px]"
          style={{
            left: `${p.x}%`,
            '--sway': p.sway,
            '--rotation': p.rotation,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        >
          {p.type === 'heart' ? (
            <HeartShape size={p.size} color={p.color} />
          ) : (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                borderRadius: p.borderRadius || '2px',
                opacity: 0.8,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
