import { useState, useEffect } from 'react';
import { REVIEWS } from '../data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ReviewSlider() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic side-to-side rotation (as requested: "should be moving from side to side")
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % REVIEWS.length);
  };

  const review = REVIEWS[currentIdx];

  return (
    <section
      id="reviews"
      className="w-full bg-white pt-8 pb-16 px-4 text-center border-t border-slate-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-md sm:max-w-lg md:max-w-xl mx-auto">
        
        {/* Title matching reference screenshot 4 bottom */}
        <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#24356E] mb-10 px-4 leading-normal">
          WHAT OUR CUSTOMERS THINK OF OUR CELEBRITY MERCHANDISE
        </h2>

        {/* Slideshow Container matching reference screenshot 3 (8baeac44) */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          
          {/* Circular Left Arrow Button matching reference */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 w-9 h-9 rounded-full border border-[#24356E] text-[#24356E] hover:bg-[#24356E] hover:text-white flex items-center justify-center transition-colors active:scale-95"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Quote Text in Royal Blue Italic matching reference screenshot 3 */}
          <div className="px-12 sm:px-14">
            <blockquote className="text-base sm:text-xl md:text-2xl font-black italic text-[#2E438D] leading-relaxed">
              "{review.quote}"
            </blockquote>

            {/* Author matching reference screenshot 3: "-MICHELE C." */}
            <p className="mt-6 text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#24356E]">
              —{review.author.toUpperCase()}
            </p>
          </div>

          {/* Circular Right Arrow Button matching reference */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 w-9 h-9 rounded-full border border-[#24356E] text-[#24356E] hover:bg-[#24356E] hover:text-white flex items-center justify-center transition-colors active:scale-95"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </div>

        {/* Carousel Pagination Dots row matching reference screenshot 3 */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`rounded-full transition-all ${
                currentIdx === idx
                  ? 'w-2.5 h-2.5 bg-[#24356E]'
                  : 'w-2 h-2 border border-[#24356E] bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
