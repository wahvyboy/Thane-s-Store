import { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface LoversGiftingProps {
  onSelectProduct: (product: Product) => void;
}

export function LoversGifting({ onSelectProduct }: LoversGiftingProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Automatically cycle through lovers gifting products sliding up
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % PRODUCTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const currentProduct = PRODUCTS[activeSlide];

  return (
    <section id="lovers-gifting" className="w-full bg-[#3B54D6] text-white py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Side: Title, Subtitle, and GET STARTED Button matching reference screenshot 8 */}
        <div className="flex-1 space-y-4 pr-2">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-wider text-white leading-none">
            LOVERS <br />GIFTING
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 font-normal leading-snug">
            Why blend in when you can stand out?
          </p>

          <button
            onClick={() => onSelectProduct(currentProduct)}
            className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#2B3E9E] font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            GET STARTED
          </button>
        </div>

        {/* Right Side: Products sliding up automatically matching reference screenshot 8 */}
        <div className="w-40 sm:w-52 h-64 sm:h-72 relative flex flex-col items-center justify-center shrink-0">
          
          {/* Sliding up container */}
          <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center">
            {PRODUCTS.map((prod, idx) => {
              const isCurrent = idx === activeSlide;
              const isPrev = idx === (activeSlide - 1 + PRODUCTS.length) % PRODUCTS.length;

              return (
                <div
                  key={prod.id}
                  className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-all duration-700 ease-out transform ${
                    isCurrent
                      ? 'translate-y-0 opacity-100'
                      : isPrev
                      ? '-translate-y-full opacity-0'
                      : 'translate-y-full opacity-0'
                  }`}
                >
                  {/* Tilted product image matching Absolut angle in screenshot 8 */}
                  <div className="w-32 h-44 sm:w-36 sm:h-52 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-contain filter drop-shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Brand name below product in bold white caps matching reference: "ABSOLUT." */}
                  <span className="font-sans font-black text-xs sm:text-sm tracking-wider uppercase text-white mt-1">
                    THANE RIVERS.
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
