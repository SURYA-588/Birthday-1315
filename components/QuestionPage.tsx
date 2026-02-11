
import React, { useState, useRef, useEffect } from 'react';

interface QuestionPageProps {
  onYes: () => void;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ onYes }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const moveButton = () => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const padding = 120;
    
    // Calculate a random position within the container bounds
    const newX = (Math.random() - 0.5) * (rect.width - padding * 2);
    const newY = (Math.random() - 0.5) * (rect.height - padding * 2);

    setNoPosition({ x: newX, y: newY });
    setHasMoved(true);
  };

  return (
    <div ref={containerRef} className="min-h-screen luxury-mesh-bg flex flex-col items-center justify-center p-8 relative overflow-hidden selection:bg-rose-100">
      {/* Decorative Background Bokeh */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-200/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className={`z-10 text-center max-w-3xl transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Luxury Ornament */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-rose-300"></div>
          <span className="text-2xl text-gold filter drop-shadow-sm">✧</span>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-rose-300"></div>
        </div>

        <h2 className="text-5xl md:text-8xl font-luxury text-rose-950 mb-4 tracking-tight leading-tight italic">
          A Moment of <span className="text-rose-700">Truth</span>
        </h2>
        
        <p className="text-lg md:text-xl font-light text-rose-800/60 uppercase tracking-[0.5em] mb-16">
          Exclusive for Praveena
        </p>
        
        <div className="glass-card p-12 md:p-16 rounded-[3rem] shadow-[0_20px_60px_rgba(190,18,60,0.05)] border border-white/80">
          <p className="text-3xl md:text-4xl font-luxury text-rose-900 mb-16 leading-relaxed italic">
            "Will you hold space in your heart to recieve the wish <br className="hidden md:block"/> from Surya, now?"
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center min-h-[120px]">
            {/* Professional Primary CTA */}
            <button
              onClick={onYes}
              className="gold-shimmer-btn group px-20 py-6 bg-rose-700 text-white rounded-full text-lg font-semibold tracking-[0.2em] shadow-2xl hover:bg-rose-800 transition-all transform hover:scale-105 active:scale-95 border-2 border-rose-600/50"
            >
              <span className="relative z-10">YES</span>
            </button>

            {/* Professional Ghost Avoidance Button */}
            <button
              onMouseEnter={moveButton}
              onClick={moveButton}
              style={{
                transform: hasMoved ? `translate(${noPosition.x}px, ${noPosition.y}px)` : 'none',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
              className="px-14 py-6 border border-rose-200 text-rose-400 rounded-full text-lg font-light tracking-[0.2em] hover:bg-white/50 transition-all whitespace-nowrap backdrop-blur-sm"
            >
              NO
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer Note */}
      <p className="fixed bottom-12 text-rose-300/60 italic font-light tracking-[0.3em] text-xs uppercase animate-pulse">
        Choose with grace
      </p>
    </div>
  );
};

export default QuestionPage;
