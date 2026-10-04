import { Product } from '../types';
import { PRODUCTS, LUXURY_IMAGES } from '../data/products';

interface WireframeGridProps {
  onSelectProduct: (product: Product) => void;
  onOpenLoversGifting: () => void;
}

export function WireframeGrid({ onSelectProduct }: WireframeGridProps) {
  const pinjamasProduct = PRODUCTS.find((p) => p.id === 'pyjamas-mug-combo') || PRODUCTS[0];
  const vipProduct = PRODUCTS.find((p) => p.id === 'vip-member-card') || PRODUCTS[1];

  return (
    <section className="w-full bg-white py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-md sm:max-w-2xl md:max-w-4xl mx-auto">
        
        {/* Exactly TWO DIVS displaying only the uploaded cup and pinjamas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          
          {/* DIV 1: The Cup (Artisanal Ceramic Cup) */}
          <div
            onClick={() => onSelectProduct(pinjamasProduct)}
            className="relative rounded-3xl overflow-hidden bg-slate-100 aspect-[3/4] sm:aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
          >
            <img
              src={LUXURY_IMAGES.ceramicMugs}
              alt="Thane Rivers Artisan Ceramic Mug"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-xs text-[#1C2C60] text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                THE CUP
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <h3 className="text-white text-lg sm:text-xl font-black tracking-wide drop-shadow-md">
                  Artisan Ceramic Mug
                </h3>
                <p className="text-white/80 text-xs mt-0.5 font-medium">
                  Morning Ritual Stoneware (400ml)
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProduct(pinjamasProduct);
                }}
                className="px-5 py-2 rounded-full bg-white hover:bg-slate-100 text-[#1C2C60] font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
              >
                SHOP
              </button>
            </div>
          </div>

          {/* DIV 2: The Pinjamas (Pure Silk Loungewear Suit) */}
          <div
            onClick={() => onSelectProduct(pinjamasProduct)}
            className="relative rounded-3xl overflow-hidden bg-slate-100 aspect-[3/4] sm:aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
          >
            <img
              src={LUXURY_IMAGES.silkPyjamasModel}
              alt="Thane Rivers Pure Silk Pinjamas"
              className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-xs text-[#1C2C60] text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                THE PINJAMAS
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <h3 className="text-white text-lg sm:text-xl font-black tracking-wide drop-shadow-md">
                  Sky Blue Silk Pinjamas
                </h3>
                <p className="text-white/80 text-xs mt-0.5 font-medium">
                  22-Momme Pure Mulberry Silk
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProduct(pinjamasProduct);
                }}
                className="px-5 py-2 rounded-full bg-white hover:bg-slate-100 text-[#1C2C60] font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
              >
                SHOP
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
