
import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const messages = ["Welcome, Praveena.", "A Whishes made for you..."];
  const [isDeleting, setIsDeleting] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleTyping = () => {
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
    };

    const timer = setTimeout(handleTyping, isDeleting ? 50 : 120);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Cinematic Background */}
      <div className="absolute inset-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=2000" 
          className="w-full h-full object-cover blur-sm" 
          alt="bg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90"></div>
      </div>

      <div className="text-center z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-luxury tracking-widest text-white mb-12 min-h-[1.5em] italic">
          {displayedText}
          <span className="w-1 h-12 bg-rose-500 inline-block ml-2 animate-pulse align-middle"></span>
        </h1>
        
        <div className={`transition-all duration-1000 transform ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={onEnter}
            className="group relative px-12 py-4 overflow-hidden rounded-full bg-transparent border border-rose-400 text-white text-lg tracking-[0.2em] transition-all duration-500 hover:border-gold"
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
