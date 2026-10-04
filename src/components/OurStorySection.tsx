import { useState, useEffect } from 'react';
import { MARQUEE_WORDS, LUXURY_IMAGES } from '../data/products';
import { Link2 } from 'lucide-react';

interface OurStorySectionProps {
  onExploreVault: () => void;
}

export function OurStorySection({ onExploreVault }: OurStorySectionProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [customInput, setCustomInput] = useState('');

  // Slideshow for Explore Merch section featuring the cup and editorial pj shot
  const [activeSlide, setActiveSlide] = useState(0);
  const merchSlides = [
    {
      title: 'Artisan Ceramic Cup & Morning Ritual',
      image: LUXURY_IMAGES.ceramicMugs,
      subtitle: 'Double-fired stoneware with signature royal blue insignia'
    },
    {
      title: 'Editorial Sky Blue Silk Pyjama Suit',
      image: LUXURY_IMAGES.silkPyjamasModel,
      subtitle: '22-Momme Grade 6A Mulberry silk with contrast piping'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % merchSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [merchSlides.length]);

  const handleUpdateUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    let embedUrl = customInput.trim();
    if (embedUrl.includes('watch?v=')) {
      const videoId = embedUrl.split('watch?v=')[1]?.split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (embedUrl.includes('youtu.be/')) {
      const videoId = embedUrl.split('youtu.be/')[1]?.split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    setYoutubeUrl(embedUrl);
    setIsEditingUrl(false);
  };

  return (
    <section id="our-story" className="w-full bg-white select-none">
      
      {/* 1. "OUR STORY" with YouTube Video Embed matching reference screenshot 7 (5f93d6af) */}
      <div className="pt-10 pb-8 px-4 text-center">
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-[#24356E] mb-6">
          OUR STORY
        </h2>

        {/* Real YouTube Video Player 16:9 ratio */}
        <div className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto aspect-video rounded-none sm:rounded-xl overflow-hidden shadow-md bg-black">
          <iframe
            src={youtubeUrl}
            title="Thane Rivers Documentary"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Change YouTube Link Input (Requested: "we will give you a youtube link") */}
        <div className="mt-3">
          {!isEditingUrl ? (
            <button
              onClick={() => setIsEditingUrl(true)}
              className="text-[11px] font-bold text-slate-500 hover:text-[#264BD8] inline-flex items-center gap-1 cursor-pointer"
            >
              <Link2 className="w-3 h-3" />
              <span>Paste YouTube Link</span>
            </button>
          ) : (
            <form onSubmit={handleUpdateUrl} className="flex items-center justify-center gap-2 max-w-sm mx-auto mt-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Paste YouTube URL..."
                className="text-xs border border-slate-300 rounded-lg px-2.5 py-1 w-full focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-1 bg-[#264BD8] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditingUrl(false)}
                className="text-xs text-slate-400 hover:text-slate-600 px-1 cursor-pointer"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 2. Text Moving Slowly Automatically on Cyan/Blue matching reference screenshot 6 (4b72adae) */}
      <div className="w-full bg-[#0099DE] text-white pt-8 pb-12 px-4 text-center relative overflow-hidden">
        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white mb-6">
          NEVER. ENDING. POWER.
        </p>

        {/* Moving slowly automatically vertical marquee */}
        <div className="h-60 overflow-hidden relative flex justify-center items-center">
          <div className="animate-marquee-v flex flex-col items-center gap-4 text-center">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
              <span
                key={i}
                className="font-sans text-2xl sm:text-4xl font-black italic tracking-wide uppercase text-white drop-shadow-sm select-none"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Explore Merch Section: Slideshow featuring the cup and editorial pj shot */}
      <div className="relative w-full h-[400px] sm:h-[480px] overflow-hidden flex items-center justify-center bg-black">
        {merchSlides.map((slide, idx) => (
          <div
            key={slide.title}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              activeSlide === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-[center_35%] filter brightness-[0.62]"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        {/* Overlay Text & EXPLORE MERCH Button */}
        <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-200 block mb-1">
            THE THANE RIVERS VAULT
          </span>

          <h3 className="text-white text-2xl sm:text-4xl font-black uppercase tracking-wider drop-shadow-md">
            CONQUER <span className="italic font-bold">ENDLESSLY</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-200 mt-2 font-medium">
            {merchSlides[activeSlide].subtitle}
          </p>

          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              onClick={onExploreVault}
              className="px-8 sm:px-10 py-3.5 rounded-full border-2 border-white hover:bg-white hover:text-[#24356E] text-white text-xs sm:text-sm font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              EXPLORE MERCH
            </button>

            {/* Slideshow pagination dots */}
            <div className="flex items-center gap-2 mt-1">
              {merchSlides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveSlide(dotIdx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeSlide === dotIdx ? 'w-6 bg-white' : 'w-2 bg-white/40'
                  }`}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
