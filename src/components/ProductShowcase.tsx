import { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { Globe, Zap, Sparkles, Droplets } from 'lucide-react';

interface ProductShowcaseProps {
  onAddToCart: (product: Product, variant: string, size: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export function ProductShowcase({ onAddToCart, onSelectProduct }: ProductShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeProduct = PRODUCTS[currentIndex] || PRODUCTS[0];

  // Automatic product rotation without moving buttons
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
      setSelectedVariantIndex(0);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(activeProduct);
    } else {
      onAddToCart(activeProduct, activeProduct.variants[selectedVariantIndex], 'L');
    }
  };

  return (
    <section
      id="products"
      className="w-full bg-[#233EB6] text-white pt-10 sm:pt-14 pb-16 px-4 relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-md mx-auto flex flex-col items-center text-center">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white font-sans">
          THANE RIVERS 2
        </h2>

        {/* Subhead */}
        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-blue-200 mt-1">
          NEXT-GEN CELEBRITY MERCHANDISE
        </p>

        {/* Center Product Image standing upright */}
        <div
          onClick={handleCardClick}
          className="w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] my-6 flex items-center justify-center relative cursor-pointer group"
        >
          <img
            key={activeProduct.id}
            src={activeProduct.images[0] || activeProduct.image}
            alt={activeProduct.name}
            className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.45)] transition-all duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Circular Variant Swatches with white active ring */}
        <div className="flex items-center justify-center gap-3 mb-2">
          {PRODUCTS.map((prod, idx) => (
            <button
              key={prod.id}
              onClick={() => {
                setCurrentIndex(idx);
                setSelectedVariantIndex(0);
              }}
              className={`w-10 h-10 rounded-full p-0.5 border-2 transition-all overflow-hidden cursor-pointer ${
                currentIndex === idx
                  ? 'border-white ring-2 ring-white/60 scale-110 shadow-lg'
                  : 'border-white/30 opacity-70 hover:opacity-100'
              }`}
              title={prod.name}
            >
              <img
                src={prod.images[0] || prod.image}
                alt={prod.name}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>

        {/* Selected Variant / Color Name */}
        <h3 className="text-base sm:text-lg font-bold text-white tracking-wide mt-2">
          {activeProduct.variants[selectedVariantIndex] || activeProduct.name}
        </h3>

        {/* Price Tag */}
        <p className="text-sm font-black text-amber-300 font-mono tracking-wider mt-0.5">
          ${activeProduct.price.toLocaleString()} USD
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-blue-100 max-w-sm mt-3 leading-relaxed font-normal">
          {activeProduct.description}
        </p>

        {/* 4 Feature Cards Grid */}
        <div className="w-full grid grid-cols-2 gap-3 mt-6 text-left">
          
          {/* Card 1: Pure Silk */}
          <div className="bg-[#3855D2] rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-2 text-white">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-white">
              Pure Silk
            </h4>
            <p className="text-[10px] sm:text-[11px] text-blue-100 mt-1 leading-tight">
              22-Momme Mulberry silk for royal comfort
            </p>
          </div>

          {/* Card 2: Titanium Cup */}
          <div className="bg-[#3855D2] rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-2 text-white">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-white">
              Titanium NFC
            </h4>
            <p className="text-[10px] sm:text-[11px] text-blue-100 mt-1 leading-tight">
              Cryptographic serialized VIP verification
            </p>
          </div>

          {/* Card 3: VIP Access */}
          <div className="bg-[#3855D2] rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-2 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-white">
              VIP Access
            </h4>
            <p className="text-[10px] sm:text-[11px] text-blue-100 mt-1 leading-tight">
              Direct access pass to Thane's inner circle
            </p>
          </div>

          {/* Card 4: Indestructible */}
          <div className="bg-[#3855D2] rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-2 text-white">
              <Droplets className="w-5 h-5 fill-current" />
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-white">
              Artisan Stoneware
            </h4>
            <p className="text-[10px] sm:text-[11px] text-blue-100 mt-1 leading-tight">
              Double-fired ceramic keeping drinks warm 24h
            </p>
          </div>

        </div>

        {/* Big White Rounded Button: "VIEW PRODUCT DETAILS" / "SHOP NOW" */}
        <div className="w-full mt-6 flex gap-2">
          <button
            onClick={() => onSelectProduct ? onSelectProduct(activeProduct) : onAddToCart(activeProduct, activeProduct.variants[selectedVariantIndex], 'L')}
            className="flex-1 py-4 rounded-full bg-white hover:bg-slate-50 text-[#233EB6] font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl active:scale-98 transition-all duration-200 cursor-pointer"
          >
            VIEW PRODUCT DETAILS
          </button>
        </div>

        {/* VIP Member Card Highlight Tile */}
        {PRODUCTS[1] && (
          <div
            onClick={() => onSelectProduct ? onSelectProduct(PRODUCTS[1]) : onAddToCart(PRODUCTS[1], PRODUCTS[1].variants[0], 'L')}
            className="w-full mt-10 rounded-2xl bg-[#182B7A] p-4 flex items-center justify-between text-left shadow-lg border border-white/10 cursor-pointer hover:border-white/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <img
                src={PRODUCTS[1].images[0] || PRODUCTS[1].image}
                alt={PRODUCTS[1].name}
                className="w-14 h-14 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <h5 className="font-extrabold text-xs sm:text-sm text-white leading-tight">
                  {PRODUCTS[1].name}
                </h5>
                <p className="text-[11px] text-blue-200 mt-0.5 font-bold font-mono">
                  ${PRODUCTS[1].price.toLocaleString()} USD
                </p>
              </div>
            </div>
            <span className="px-5 py-2 rounded-full bg-[#233EB6] hover:bg-[#2e52e8] text-white text-xs font-black uppercase tracking-wider transition-colors shrink-0 shadow-md">
              VIEW
            </span>
          </div>
        )}

      </div>
    </section>
  );
}
