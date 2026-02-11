
import React, { useState, useEffect, useRef } from 'react';
import FloatingHearts from './FloatingHearts.tsx';
import { GALLERY_IMAGES, TRANSFORMATION, HEARTFELT_LETTER, ROMANTIC_VIDEO_URL, ROMANTIC_SONG_URL, FINAL_MESSAGE, CONTACT_INFO, ABOUT_HER } from '../constants.tsx';

const MemoryCard: React.FC<{ item: { url: string; caption: string }; index: number }> = ({ item, index }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  
  const isVideo = item.url.toLowerCase().endsWith('.mp4') || 
                  item.url.toLowerCase().endsWith('.mov') || 
                  item.url.toLowerCase().endsWith('.webm');

  return (
    <>
      <div 
        onClick={() => setIsRevealed(!isRevealed)}
        className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-1000 cursor-pointer h-[400px] bg-white border border-rose-100/50 ${isRevealed ? 'shadow-2xl scale-[1.02]' : 'hover:shadow-xl hover:-translate-y-2'}`}
      >
        <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-8 transition-all duration-700 bg-white ${isRevealed ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100'}`}>
          <div className="text-gold text-xs tracking-[0.4em] uppercase mb-4 opacity-60">Memory {index + 1}</div>
          <h3 className="text-2xl md:text-3xl font-cursive text-rose-800 text-center leading-relaxed">
            {item.caption}
          </h3>
          <div className="mt-8 w-12 h-[1px] bg-gold/30"></div>
          <div className="mt-4 text-[10px] tracking-[0.2em] text-rose-300 uppercase font-bold animate-pulse">Touch to reveal</div>
        </div>

        <div className={`absolute inset-0 z-10 transition-all duration-1000 transform ${isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
          {isVideo ? (
            <video 
              src={item.url} 
              className="w-full h-full object-cover" 
              autoPlay 
              muted 
              loop 
              playsInline
            />
          ) : (
            <img 
              src={item.url} 
              alt={item.caption} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x800/fff1f2/be123c?text=Missing+Memory';
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <button onClick={(e) => { e.stopPropagation(); setIsZoomed(true); }} className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition-colors">🔍</button>
        </div>
      </div>

      {isZoomed && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 transition-all animate-in fade-in duration-500" onClick={() => setIsZoomed(false)}>
          <button className="absolute top-8 right-8 text-white/50 hover:text-white text-4xl font-light transition-colors">&times;</button>
          <div className="max-w-5xl w-full h-full flex flex-col items-center justify-center gap-8">
            {isVideo ? (
              <video 
                src={item.url} 
                controls 
                autoPlay 
                className="max-h-[80vh] w-auto rounded-lg shadow-2xl animate-in zoom-in-95 duration-500"
              />
            ) : (
              <img 
                src={item.url} 
                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-500" 
                alt={item.caption} 
              />
            )}
            <div className="text-center">
              <p className="text-3xl md:text-5xl font-romantic text-gold mb-2">{item.caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SurprisePage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowFinalMessage(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(err => console.log("Audio play blocked: ", err));
      setIsPlaying(!isPlaying);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent to Surya's heart! ❤️");
  };

  return (
    <div className="min-h-screen bg-rose-50/30 pb-32 relative selection:bg-rose-200">
      <FloatingHearts />
      <audio ref={audioRef} src={ROMANTIC_SONG_URL} autoPlay loop />

      <button onClick={toggleMusic} className="fixed top-8 right-8 z-50 p-4 glass-card rounded-full shadow-xl hover:scale-110 transition-all group border-rose-100">
        <span className="text-xl group-hover:animate-pulse">{isPlaying ? '🔊' : '🔇'}</span>
      </button>

      {/* Header */}
      <section className="pt-32 pb-16 text-center px-4 relative z-10">
        <h3 className="text-rose-400 uppercase tracking-[0.4em] text-sm mb-4 font-semibold">A Celebration</h3>
        <h1 className="text-6xl md:text-9xl font-romantic text-rose-600 mb-6 animate-luxury-glow">Happy Birthday to My Child🥹</h1>
        <p className="text-2xl md:text-3xl font-cursive text-rose-500">From the depths of my heart, By Your Fraud</p>
      </section>

      {/* About She Section */}
      <section className="max-w-6xl mx-auto px-6 mt-20 relative z-10">
        <div className="glass-card rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-center shadow-2xl border-white">
          <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] overflow-hidden">
             <img 
               src={ABOUT_HER.image} 
               alt="Praveena" 
               className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-110"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000';
               }}
             />
          </div>
          <div className="w-full lg:w-1/2 p-12 lg:p-20 text-center lg:text-left flex flex-col justify-center">
            <div className="inline-block w-12 h-[1px] bg-rose-300 mb-8 mx-auto lg:mx-0"></div>
            <h2 className="text-4xl md:text-6xl font-luxury text-rose-950 mb-8 italic">
              {ABOUT_HER.title}
            </h2>
            <p className="text-xl md:text-2xl font-light text-rose-900 leading-relaxed italic mb-12">
              "{ABOUT_HER.description}"
            </p>
            <div className="flex items-center gap-4 justify-center lg:justify-start">
               <span className="text-rose-400 font-romantic text-3xl">Simply Magical</span>
               <div className="h-[1px] flex-grow bg-rose-100 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Heart Transformation Section */}
      <section className="max-w-6xl mx-auto px-6 mt-32 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury text-rose-900 mb-4 italic">Through the Years</h2>
          <p className="text-rose-500 font-cursive text-2xl animate-luxury-glow">"{TRANSFORMATION.text}"</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/5] bg-white p-4">
            <div className="absolute top-8 left-8 z-20 glass-card px-4 py-2 rounded-full text-xs tracking-widest text-rose-800 uppercase font-bold">Then</div>
            <img src={TRANSFORMATION.childhood} alt="Childhood" className="w-full h-full object-cover rounded-[1.5rem]" onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/400x500?text=Childhood+Photo'} />
          </div>
          <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/5] bg-white p-4">
            <div className="absolute top-8 left-8 z-20 glass-card px-4 py-2 rounded-full text-xs tracking-widest text-rose-800 uppercase font-bold">Now</div>
            <img src={TRANSFORMATION.current} alt="Current" className="w-full h-full object-cover rounded-[1.5rem]" onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/400x500?text=Current+Photo'} />
          </div>
        </div>
      </section>

      {/* Heartfelt Letter Section */}
      <section className="max-w-4xl mx-auto px-6 mt-48 relative z-10">
        <div className="glass-card p-12 md:p-24 rounded-[3rem] shadow-[0_40px_100px_rgba(190,18,60,0.1)] border-white relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-100/30 rounded-full blur-[80px]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-romantic text-rose-700 mb-12 text-center">{HEARTFELT_LETTER.title}</h2>
            <div className="space-y-8">
              {HEARTFELT_LETTER.paragraphs.map((p, idx) => (
                <p key={idx} className="text-xl md:text-2xl font-light text-rose-900 leading-relaxed indent-8 first:indent-0">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-16 pt-8 border-t border-rose-100">
              <p className="text-3xl md:text-4xl font-cursive text-rose-600 text-right pr-8">
                {HEARTFELT_LETTER.signature}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 mt-48 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury text-rose-900 mb-4 italic">Captured Moments</h2>
          <p className="text-gray-500 font-light tracking-widest uppercase text-xs">A visual history of our love</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {GALLERY_IMAGES.map((item, idx) => (
            <MemoryCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </section>

      {/* Reveal Video Surprise */}
      <section className="max-w-5xl mx-auto px-6 mt-48 text-center relative z-10">
        {!isVideoVisible ? (
          <div className="py-20 flex flex-col items-center">
            <div className="w-24 h-24 mb-8 text-rose-500 animate-bounce">
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
            <h2 className="text-3xl font-luxury text-rose-900 mb-8 italic">I have one final surprise for you...</h2>
            <button 
              onClick={() => setIsVideoVisible(true)}
              className="gold-shimmer-btn px-16 py-6 bg-rose-700 text-white rounded-full text-xl font-bold tracking-[0.3em] hover:bg-rose-800 transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              REVEAL THE SECRET
            </button>
          </div>
        ) : (
          <div className="glass-card p-4 rounded-[3rem] shadow-2xl border-rose-100/50 animate-in fade-in zoom-in duration-1000">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-black aspect-video shadow-inner">
              <video controls autoPlay className="w-full h-full object-cover" src={ROMANTIC_VIDEO_URL} />
              <div className="absolute top-4 left-6 pointer-events-none">
                <span className="text-xs tracking-[0.3em] text-white/50 uppercase font-bold">A Personal Message for You</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Final Love Note */}
      <section className={`max-w-3xl mx-auto px-8 mt-48 text-center transition-all duration-1500 transform ${showFinalMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="glass-card p-16 rounded-[4rem] shadow-2xl border-white relative">
          <p className="text-3xl md:text-4xl font-luxury leading-relaxed text-rose-900 italic font-medium">
            {FINAL_MESSAGE}
          </p>
          <div className="mt-12 flex items-center justify-center gap-6">
             <div className="w-16 h-[1px] bg-rose-200"></div>
             <span className="text-4xl animate-pulse">💎</span>
             <div className="w-16 h-[1px] bg-rose-200"></div>
          </div>
        </div>
      </section>

      {/* Connect with Surya Section */}
      <section className="max-w-5xl mx-auto px-6 mt-48 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-luxury text-rose-950 mb-4 italic">Reach Out to My Heart</h2>
          <div className="w-24 h-[1px] bg-gold mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Social Links */}
          <div className="space-y-12">
            <h3 className="text-2xl font-luxury text-rose-800 italic">Always Connected</h3>
            <div className="flex flex-col gap-6">
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-rose-500 transition-all group-hover:bg-rose-500 group-hover:text-white group-hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.82 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] text-rose-300 uppercase font-bold">Call Me</p>
                  <p className="text-xl font-light text-rose-900">{CONTACT_INFO.phone}</p>
                </div>
              </a>

              <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-green-500 transition-all group-hover:bg-green-500 group-hover:text-white group-hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.503-2.961-2.617-.087-.114-.708-.941-.708-1.792 0-.85.445-1.268.604-1.437.158-.169.346-.213.462-.213.117 0 .231.001.332.006.108.004.254-.042.398.305.144.35.493 1.202.535 1.287.043.085.071.184.014.298-.057.114-.085.184-.171.284l-.258.301c-.085.097-.175.203-.075.375.1.171.445.733.955 1.187.656.585 1.21.766 1.382.852.172.085.271.071.372-.043.102-.114.428-.497.544-.668.114-.171.229-.143.385-.085.158.057 1 .471 1.171.557.171.085.285.128.328.2.043.072.043.415-.1.821z"/></svg>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] text-rose-300 uppercase font-bold">WhatsApp</p>
                  <p className="text-xl font-light text-rose-900">Send a Heart</p>
                </div>
              </a>

              <a href={`https://instagram.com/${CONTACT_INFO.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-rose-600 transition-all group-hover:bg-gradient-to-tr group-hover:from-[#f9ce34] group-hover:via-[#ee2a7b] group-hover:to-[#6228d7] group-hover:text-white group-hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.337 3.608 1.312.975.975 1.25 2.242 1.312 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.337 2.633-1.312 3.608-.975.975-2.242 1.25-3.608 1.312-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.337-3.608-1.312-.975-.975-1.25-2.242-1.312-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.337-2.633 1.312-3.608.975-.975 2.242-1.25 3.608-1.312 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] text-rose-300 uppercase font-bold">Instagram</p>
                  <p className="text-xl font-light text-rose-900">@{CONTACT_INFO.instagram}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-10 rounded-[2.5rem] shadow-xl border-white">
            <h3 className="text-2xl font-luxury text-rose-800 italic mb-8">Send a Comments About Wishes</h3>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold ml-4">Your Beautiful Name</label>
                <input required type="text" placeholder="Praveena" className="w-full bg-white/50 border border-rose-100 rounded-2xl px-6 py-4 outline-none focus:border-rose-400 focus:bg-white transition-all text-rose-900 placeholder:text-rose-200" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold ml-4">Email Address</label>
                <input required type="email" placeholder="queen@heart.com" className="w-full bg-white/50 border border-rose-100 rounded-2xl px-6 py-4 outline-none focus:border-rose-400 focus:bg-white transition-all text-rose-900 placeholder:text-rose-200" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold ml-4">Subject</label>
                <input required type="text" placeholder="Our Forever" className="w-full bg-white/50 border border-rose-100 rounded-2xl px-6 py-4 outline-none focus:border-rose-400 focus:bg-white transition-all text-rose-900 placeholder:text-rose-200" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold ml-4">Your Message</label>
                <textarea required rows={4} placeholder="Write something from your heart..." className="w-full bg-white/50 border border-rose-100 rounded-2xl px-6 py-4 outline-none focus:border-rose-400 focus:bg-white transition-all text-rose-900 placeholder:text-rose-200 resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-5 bg-rose-600 text-white rounded-2xl font-bold tracking-[0.2em] shadow-lg hover:bg-rose-700 transition-all active:scale-[0.98]">
                SEND 
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="mt-40 border-t border-rose-100 pt-10 text-center text-rose-300">
        <p className="tracking-[0.4em] text-xs font-bold uppercase mb-2">Designed for the Queen of My Heart And My Child</p>
        <p className="font-cursive text-lg text-rose-400"> For My Vennamavah by Her Fraud </p>
      </footer>
    </div>
  );
};

export default SurprisePage;
