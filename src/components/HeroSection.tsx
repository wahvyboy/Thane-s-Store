interface HeroSectionProps {
  onQuickOrder: () => void;
}

export function HeroSection({ onQuickOrder }: HeroSectionProps) {
  return (
    <section id="hero" className="w-full bg-white select-none">
      
      {/* 1. Hero Video Section matching Screenshot_20260929_131546_Firefox.jpg 100% */}
      <div className="relative w-full h-[52vh] sm:h-[62vh] min-h-[420px] max-h-[620px] bg-slate-900 overflow-hidden flex items-center justify-center">
        
        {/* Background Video / Close-up Product Footage - Absolute positioned to fill entire hero */}
        <img
          src="/src/assets/images/thane_silk_pyjamas_model_1790860264040.jpg"
          alt="The Original Viking Celebrity"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] filter brightness-[0.72] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />

        {/* Soft vignette scrim over image for crisp text contrast */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />

        {/* Centered Overlay Content: Exactly matching Screenshot_20260929_131546_Firefox.jpg */}
        <div className="relative z-10 w-full max-w-lg mx-auto px-4 text-center flex flex-col items-center justify-center">
          
          {/* "The Original" */}
          <h1 className="text-white text-2xl sm:text-4xl font-normal tracking-wide drop-shadow-sm font-sans leading-tight">
            The Original
          </h1>

          {/* "Portable Blender" -> "Viking Celebrity" */}
          <h2 className="text-white text-3xl sm:text-5xl font-black italic tracking-wide drop-shadow-md font-sans mt-0.5 sm:mt-1 leading-tight">
            Viking Celebrity
          </h2>

          {/* THE BUTTON: Modern, Stylish, Crisp White Pill Button matching reference */}
          <button
            onClick={onQuickOrder}
            className="mt-6 sm:mt-8 px-10 sm:px-14 py-3.5 sm:py-4 rounded-full bg-white hover:bg-slate-50 text-[#1C2C60] font-black text-xs sm:text-sm uppercase tracking-[0.18em] shadow-[0_6px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.45)] transition-all duration-200 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            GET YOURS TODAY
          </button>
        </div>
      </div>

      {/* 2. Iconic Sales Offer Banner matching Screenshot_20260929_131546_Firefox.jpg */}
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

          {/* "MINT AND LAVENDER / AUTOMATICALLY APPLIED" -> for Thane Rivers */}
          <div className="mt-2.5 text-[11px] sm:text-xs font-black tracking-[0.16em] uppercase text-[#1C2640] space-y-0.5">
            <p>PINJAMAS AND CUP</p>
            <p>AUTOMATICALLY APPLIED</p>
          </div>
        </div>

        {/* Ocean Waves graphic transition into Royal Blue with starfish on the right edge */}
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

          {/* Illustrated Starfish on the right beach bank matching reference screenshot 1 */}
          <div className="absolute right-4 sm:right-12 bottom-4 sm:bottom-6 pointer-events-none z-10">
            <svg viewBox="0 0 40 40" className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF6347] fill-current drop-shadow-sm transform rotate-12">
              <path d="M20 2 L24.5 14 L37.5 15 L27.5 23 L31 36 L20 28.5 L9 36 L12.5 23 L2.5 15 L15.5 14 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. "AS SEEN ON" Media Proof Bar on Midnight Royal Blue (#28367A) */}
      <div className="w-full bg-[#28367A] text-white py-3.5 px-4 border-t border-[#00C4CC]/30">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-2 text-center">
          
          {/* "AS SEEN ON:" */}
          <p className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.25em] text-[#9AA6DE]">
            AS SEEN ON:
          </p>

          {/* Media Brand Logos matching exact screenshot */}
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

            {/* Living (Martha Stewart Living) */}
            <span className="font-serif font-bold text-xs text-white/90 tracking-wide">
              Living
            </span>
          </div>

        </div>
      </div>

    </section>
  );
}
