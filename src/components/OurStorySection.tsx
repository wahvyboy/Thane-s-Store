import { useState, useEffect } from 'react';
import { MARQUEE_WORDS, LUXURY_IMAGES } from '../data/products';
import { Youtube, Sparkles, X, RotateCcw, ShieldCheck, Award, Flame, Check, ExternalLink } from 'lucide-react';

interface OurStorySectionProps {
  onExploreVault: () => void;
}

export const OFFICIAL_YOUTUBE_CHANNEL = 'https://www.youtube.com/@TheThaneRivers';
const DEFAULT_VIDEO_ID = 'L61p2uyiMSo'; // Official cinematic Scandinavian/Norse documentary showcase

// Universal parser for YouTube URLs (supports @channel, watch?v=, youtu.be/, shorts/, embed/, or direct ID)
function parseYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim().replace(/^https?:\/\/m\./, 'https://www.');

  // Regex handles: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = trimmed.match(regExp);

  if (match && match[1]) {
    return match[1];
  }

  // Bare 11-character video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function OurStorySection({ onExploreVault }: OurStorySectionProps) {
  // Load saved video ID or use official documentary showcase
  const [videoId, setVideoId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('thane_rivers_story_video_id');
      return saved || DEFAULT_VIDEO_ID;
    } catch {
      return DEFAULT_VIDEO_ID;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Slideshow for Explore Merch section featuring the cup and editorial pj shot
  const [activeSlide, setActiveSlide] = useState(0);
  const merchSlides = [
    {
      title: 'Artisan Ceramic Cup & Morning Ritual',
      image: LUXURY_IMAGES.ceramicMugs,
      subtitle: 'Double-fired stoneware with signature royal blue insignia',
    },
    {
      title: 'Editorial Sky Blue Silk Pyjama Suit',
      image: LUXURY_IMAGES.silkPyjamasModel,
      subtitle: '22-Momme Grade 6A Mulberry silk with contrast piping',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % merchSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [merchSlides.length]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const detectedId = parseYouTubeId(inputUrl);
    if (detectedId) {
      setVideoId(detectedId);
      try {
        localStorage.setItem('thane_rivers_story_video_id', detectedId);
      } catch {
        // Storage fallback
      }
      setIsModalOpen(false);
      setInputUrl('');
      setError(null);
      showToast('YouTube video successfully updated!');
    } else if (inputUrl.includes('@TheThaneRivers') || inputUrl.includes('TheThaneRivers')) {
      // If user pasted the channel link, direct to channel
      window.open(OFFICIAL_YOUTUBE_CHANNEL, '_blank');
      setIsModalOpen(false);
      setInputUrl('');
      showToast('Opened official @TheThaneRivers channel!');
    } else {
      setError('Invalid link. Please paste a valid YouTube watch link, youtu.be link, or video ID.');
    }
  };

  const handleResetToDefault = () => {
    setVideoId(DEFAULT_VIDEO_ID);
    try {
      localStorage.removeItem('thane_rivers_story_video_id');
    } catch {
      // Storage fallback
    }
    setIsModalOpen(false);
    setInputUrl('');
    setError(null);
    showToast('Reset to default documentary video.');
  };

  return (
    <section id="our-story" className="w-full bg-white select-none">
      
      {/* 1. CINEMA THEATER: "OUR STORY" with YouTube Video Embed */}
      <div className="pt-12 sm:pt-16 pb-12 px-4 max-w-5xl mx-auto text-center">
        
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C2C60]/8 text-[#1C2C60] text-[11px] font-bold tracking-[0.25em] uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Official Documentary & Biography</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1C2640] font-sans">
          THE STORY OF <span className="text-[#009EA8]">THANE RIVERS</span>
        </h2>
        
        <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto font-medium">
          From the ancient fjords of Norway to international stardom. Discover how Viking endurance and bespoke craftsmanship forged the world's most sought-after loungewear.
        </p>

        {/* Official Channel Link Badge */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <a
            href={OFFICIAL_YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>Watch On YouTube @TheThaneRivers</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-90" />
          </a>
        </div>

        {/* Theater Player Container */}
        <div className="mt-7 relative max-w-4xl mx-auto">
          {/* Subtle ambient colored glow behind the video player */}
          <div className="absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#1C2C60]/20 via-[#00C4CC]/30 to-[#1C2C60]/20 blur-xl opacity-70 pointer-events-none" />

          {/* Video Player Box with 16:9 responsive aspect ratio */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(28,44,96,0.22)] border-2 border-[#1C2C60]/15 bg-black">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
                title="The Story of Thane Rivers"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Player Bar Actions: Channel handle + Update Link Button */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-2">
            <a
              href={OFFICIAL_YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-slate-700 hover:text-red-600 font-semibold transition-colors"
            >
              <Youtube className="w-4 h-4 text-red-600" />
              <span>Official Channel: <strong>@TheThaneRivers</strong></span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-normal">
                45.5K+ Subscribers
              </span>
            </a>

            <button
              onClick={() => {
                setInputUrl(videoId ? `https://www.youtube.com/watch?v=${videoId}` : '');
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#1C2C60] text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
            >
              <span>Update Video Link</span>
            </button>
          </div>
        </div>

        {/* Storytelling Pillars (3 luxury cards below the player) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-blue-100/70 text-[#1C2C60] flex items-center justify-center mb-3">
              <Flame className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1">
              The Norse Icon
            </h4>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Born from generations of Scandinavian grit and modern charisma, Thane Rivers bridges ancient Viking strength with contemporary global celebrity style.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-cyan-100/70 text-[#009EA8] flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-[#009EA8]" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1">
              22-Momme Grade 6A Silk
            </h4>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              We refused ordinary materials. Every loungewear suit uses long-strand Mulberry silk engineered for thermal perfection and deep restorative recovery.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-indigo-100/70 text-[#28367A] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-[#28367A]" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1">
              Numbered Limited Editions
            </h4>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              From double-fired ceramic stoneware to serialized VIP cards, each piece is limited and recorded with individual certificates of authenticity.
            </p>
          </div>

        </div>

      </div>

      {/* 2. Text Moving Slowly Automatically on Cyan/Blue */}
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

      {/* Modal for updating YouTube Video Link */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setError(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Update Story Video</h3>
                <p className="text-xs text-slate-500">Paste any YouTube video link or @TheThaneRivers</p>
              </div>
            </div>

            <form onSubmit={handleSaveUrl} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  YouTube Video Link
                </label>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => {
                    setInputUrl(e.target.value);
                    setError(null);
                  }}
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C2C60] focus:border-transparent transition-all"
                  autoFocus
                />
                {error && <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>}
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Supports YouTube watch links, youtu.be, shorts, and embed links.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Default</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setError(null);
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-[#1C2C60] hover:bg-[#15234d] rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Save & Embed
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1C2C60] text-white px-4 py-3 rounded-xl shadow-xl text-xs font-semibold animate-in slide-in-from-bottom duration-300">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </section>
  );
}
