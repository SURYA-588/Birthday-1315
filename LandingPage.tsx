import React, { useState, useEffect, useCallback } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const messages = ["Welcome, Praveena.", "A Wish made just for you..."];
  const [isDeleting, setIsDeleting] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleTyping = useCallback(() => {
    const currentMessage = messages[textIndex];
    if (!isDeleting) {
      setDisplayedText(currentMessage.substring(0, displayedText.length + 1));
      if (displayedText.length === currentMessage.length) {
        if (textIndex === messages.length - 1) {
          setShowButton(true);
          return;
        }
        setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      setDisplayedText(currentMessage.substring(0, displayedText.length - 1));
      if (displayedText.length === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => prev + 1);
      }
    }
  }, [displayedText, isDeleting, textIndex]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(handleTyping, isDeleting ? 50 : 120);
    return () => clearTimeout(timer);
  }, [handleTyping, isDeleting]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] transition-all duration-1000 relative ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-rose-950/80 via-[#1a0a10] to-[#0a0a0a]"></div>
        <img 
          src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm" 
          alt="bg"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
      </div>

      <div className="text-center z-10 px-6 sm:px-8 w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-luxury tracking-wider sm:tracking-widest text-white mb-8 sm:mb-12 min-h-[2em] sm:min-h-[1.5em] italic leading-relaxed">
          {displayedText}
          <span className="w-[2px] h-8 sm:h-12 bg-rose-500 inline-block ml-1 sm:ml-2 animate-pulse align-middle"></span>
        </h1>
        
        <div className={`transition-all duration-1000 transform ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <button
            onClick={onEnter}
            className="group relative px-8 sm:px-12 py-3.5 sm:py-4 overflow-hidden rounded-full bg-transparent border border-rose-400/80 text-white text-base sm:text-lg tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-500 hover:border-rose-300 active:scale-95"
          >
            <span className="absolute inset-0 w-0 bg-rose-600 transition-all duration-500 group-hover:w-full"></span>
            <span className="relative z-10 group-hover:text-white uppercase font-light">Begin the Celebration</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
