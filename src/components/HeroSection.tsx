import { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import heroVideo from '../assets/images/hero video.mp4';

interface HeroSectionProps {
  onExploreShop: () => void;
}

export function HeroSection({ onExploreShop }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Guaranteed continuous looping video playback using hero video from assets folder
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce DOM-level muted and loop attributes required by browser autoplay policies
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');

    const playVideo = () => {
      video.muted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // If browser restricted automatic start, listen for first touch/click
          const unlock = () => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => {});
            }
          };
          window.addEventListener('click', unlock, { once: true });
          window.addEventListener('touchstart', unlock, { once: true, passive: true });
          window.addEventListener('scroll', unlock, { once: true, passive: true });
        });
      }
    };

    // If video is already loaded, start playing immediately
    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo, { once: true });
      video.addEventListener('canplay', playVideo, { once: true });
    }

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
    };
  }, []);

  const toggleAudio = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section id="hero" className="w-full bg-white select-none">
      
      {/* 1. Hero Video Section with dynamic multi-device responsive height (dvh for mobile address bar stability) */}
      <div className="relative w-full min-h-[520px] sm:min-h-[640px] h-[75dvh] sm:h-[85dvh] max-h-[880px] bg-slate-950 overflow-hidden flex items-center justify-center">
        
        {/* Continuous Looping HTML5 Background Video using asset hero video with rock-solid multi-device support */}
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          loop
          muted
          // @ts-ignore
          defaultMuted
          playsInline
          // @ts-ignore
          webkit-playsinline="true"
          // @ts-ignore
          x5-playsinline="true"
          preload="auto"
          poster="/mansion.jpeg"
          onEnded={(e) => {
            // Guaranteed seamless repeat across browsers
            const v = e.currentTarget;
            v.currentTime = 0;
            v.play().catch(() => {});
          }}
          onCanPlay={(e) => {
            e.currentTarget.muted = true;
            e.currentTarget.play().catch(() => {});
          }}
          className="absolute inset-0 w-full h-full object-cover object-[center_30%] sm:object-[center_35%] filter brightness-[0.72] contrast-[1.05] pointer-events-none"
        >
          <source src={heroVideo} type="video/mp4" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Soft vignette scrim over video for crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60 pointer-events-none" />

        {/* Centered Overlay Content: Luxury Norse branding */}
        <div className="relative z-10 w-full max-w-xl mx-auto px-4 text-center flex flex-col items-center justify-center pointer-events-auto">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.25em] mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Official Flagship Store
          </div>

          {/* "The Original" */}
          <h1 className="text-white/90 text-2xl sm:text-4xl font-normal tracking-wide drop-shadow-sm font-sans leading-tight">
            The Original
          </h1>

          {/* "Viking Celebrity" */}
          <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-black italic tracking-wide drop-shadow-md font-sans mt-0.5 sm:mt-1 leading-tight">
            Viking Celebrity
          </h2>

          <p className="text-blue-100 text-xs sm:text-sm font-medium tracking-wider max-w-md mx-auto mt-3 drop-shadow">
            Grade 6A Mulberry Silk Loungewear • Double-Fired Stoneware • Serialized VIP Access
          </p>

          {/* THE BUTTON: Modern, Stylish, Crisp White Pill Button navigating to Shop View */}
          <button
            onClick={onExploreShop}
            className="mt-6 sm:mt-8 px-10 sm:px-14 py-3.5 sm:py-4 rounded-full bg-white hover:bg-slate-50 text-[#1C2C60] font-black text-xs sm:text-sm uppercase tracking-[0.18em] shadow-[0_6px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-200 active:scale-95 whitespace-nowrap cursor-pointer hover:ring-2 hover:ring-white/80"
          >
            GET YOURS TODAY
          </button>
        </div>

        {/* Luxury Audio Toggle Button (Mute/Unmute) with glassmorphic pill design */}
        <button
          onClick={toggleAudio}
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-white/90" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          )}
          <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
        </button>

      </div>

      {/* 2. Sales Offer Banner */}
      <div className="w-full bg-[#FFF6DC] text-[#1C2640] pt-6 sm:pt-8 pb-0 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto px-4">
          
          {/* "SALE SALE SALE" */}
          <h3 className="font-sans font-black text-xl sm:text-2xl tracking-[0.25em] uppercase text-[#1C2640]">
            SALE SALE SALE
          </h3>

          {/* "15% OFF SELECT BUNDLES" rounded peach pill */}
          <div className="mt-2.5 inline-block bg-[#FFE0B5] text-[#1C2640] px-4 sm:px-5 py-1 rounded-md text-xs sm:text-sm font-black italic tracking-wide">
            15% OFF SELECT BUNDLES
          </div>

          {/* "PINJAMAS AND CUP / AUTOMATICALLY APPLIED" */}
          <div className="mt-2.5 text-[11px] sm:text-xs font-black tracking-[0.16em] uppercase text-[#1C2640] space-y-0.5">
            <p>PINJAMAS AND CUP</p>
            <p>AUTOMATICALLY APPLIED</p>
          </div>
        </div>

        {/* Ocean Waves graphic transition into Royal Blue */}
        <div className="w-full h-12 sm:h-16 mt-3 relative">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-full preserve-3d" preserveAspectRatio="none">
            {/* Back Wave: Darker Teal */}
            <path
              d="M0,45 C320,80 500,20 820,55 C1120,85 1300,30 1440,45 L1440,80 L0,80 Z"
              fill="#009EA8"
              opacity="0.6"
            />
            {/* Front Wave: Vibrant Turquoise */}
            <path
              d="M0,30 C300,75 520,10 850,50 C1100,75 1320,15 1440,35 L1440,80 L0,80 Z"
              fill="#00C4CC"
            />
          </svg>
        </div>
      </div>

      {/* 3. "AS SEEN ON" Media Proof Bar on Midnight Royal Blue (#28367A) */}
      <div className="w-full bg-[#28367A] text-white py-3.5 px-4 border-t border-[#00C4CC]/30">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-2 text-center">
          
          <p className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.25em] text-[#9AA6DE]">
            AS SEEN ON:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white font-sans text-sm tracking-wider opacity-90 pt-0.5">
            
            {/* MSN */}
            <div className="flex items-center gap-1 font-bold lowercase text-base text-white/90">
              <span className="text-[#00C4CC] text-xs">🦋</span> msn
            </div>

            {/* NBC NEWS */}
            <div className="flex items-center gap-1 font-bold text-xs uppercase tracking-tight text-white/90">
              <span className="text-amber-300 text-xs">🦚</span> NBC NEWS
            </div>

            {/* People */}
            <span className="font-serif italic font-bold text-base text-white/90">
              People
            </span>

            {/* USA TODAY */}
            <div className="flex items-center gap-1.5 font-bold text-xs text-white/90">
              <span className="w-2.5 h-2.5 rounded-full bg-[#64B5F6] inline-block" /> USA TODAY
            </div>

            {/* Rolling Stone */}
            <span className="font-serif font-black uppercase text-xs tracking-tight text-white/90">
              Rolling Stone
            </span>

            {/* Living */}
            <span className="font-serif font-bold text-xs text-white/90 tracking-wide">
              Living
            </span>
          </div>

        </div>
      </div>

    </section>
  );
}
