import { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ShoppingBag, ArrowLeft, Check, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';

interface ShopCatalogProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, variant: string, size: string) => void;
  onBackToHome: () => void;
}

export function ShopCatalog({ onSelectProduct, onAddToCart, onBackToHome }: ShopCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'combo' | 'vip' | 'residency'>('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'combo') return product.id === 'pyjamas-mug-combo';
    if (activeFilter === 'vip') return product.id === 'vip-member-card';
    if (activeFilter === 'residency') return product.id === '10-day-stay';
    return true;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product, product.variants[0], product.sizes[2] || 'L');
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'SIGNATURE COMBO':
        return 'bg-[#233EB6] text-white';
      case 'VIP MEMBERSHIP':
        return 'bg-gradient-to-r from-amber-600 to-amber-500 text-white';
      case 'EXCLUSIVE RESIDENCY':
        return 'bg-gradient-to-r from-emerald-800 to-emerald-600 text-white';
      default:
        return 'bg-slate-900 text-white';
    }
  };

  return (
    <section id="shop-catalog" className="w-full bg-[#FAFAFA] text-slate-900 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs & Back Navigation */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <button
              onClick={onBackToHome}
              className="hover:text-[#233EB6] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-900 font-semibold">Official Vault</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 hidden sm:inline" />
            <span className="text-slate-400 hidden sm:inline">3 Signature Releases</span>
          </nav>

          <button
            onClick={onBackToHome}
            className="text-xs font-bold text-[#233EB6] hover:text-[#182B7A] tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Return to Main Experience</span>
          </button>
        </div>

        {/* Catalog Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#233EB6] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thane Rivers Master Collection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 font-sans uppercase">
            Official Vault • 3 Signature Releases
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Every piece is strictly allocated, authenticated with cryptographic NFC or serialized numbering, and crafted to highest Nordic standards.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {[
            { id: 'all', label: 'All Releases (3)' },
            { id: 'combo', label: 'Signature Combo ($999)' },
            { id: 'vip', label: 'VIP Membership ($2,099)' },
            { id: 'residency', label: 'Private Residency ($4,999)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#233EB6] text-white shadow-md scale-105'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3 Signature Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isHovered = hoveredCardId === product.id;
            const primaryImage = product.images[0] || product.image;
            const secondaryImage = product.images[1] || primaryImage;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                onMouseEnter={() => setHoveredCardId(product.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-400/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Product Card Image Container with Multi-Image Hover / Carousel */}
                  <div className="relative w-full aspect-[4/5] bg-slate-100 overflow-hidden">
                    {/* Primary Image */}
                    <img
                      src={primaryImage}
                      alt={product.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                        isHovered && product.images.length > 1 ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {/* Secondary Image for smooth luxury hover reveal */}
                    {product.images.length > 1 && (
                      <img
                        src={secondaryImage}
                        alt={`${product.name} secondary view`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                          isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                        }`}
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Dedicated Luxury Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-md ${getBadgeStyle(
                          product.badge
                        )}`}
                      >
                        {product.badge}
                      </span>
                    </div>

                    {/* Quick View Pill / Multi-Image Dots */}
                    <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none">
                      {product.images.map((_, dotIdx) => (
                        <span
                          key={dotIdx}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            (isHovered && dotIdx === 1) || (!isHovered && dotIdx === 0)
                              ? 'w-4 bg-white shadow-sm'
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Subtle Gradient Scrim at Bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>

                  {/* Product Information */}
                  <div className="p-6">
                    {/* Edition & Stock Badge */}
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
                      <span className="text-[#233EB6] font-mono tracking-tight">{product.editionNumber}</span>
                      <span className="flex items-center gap-1 text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {product.stockStatus.split('•')[0]}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#233EB6] transition-colors">
                      {product.name}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
                      {product.subtitle}
                    </p>

                    {/* Description excerpt */}
                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Price & Quick Add to Bag Button */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Price USD
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-tight">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Quick Add to Bag Button */}
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95 ${
                        addedProductId === product.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#233EB6] hover:bg-[#182B7A] text-white'
                      }`}
                      title="Add to Shopping Bag"
                    >
                      {addedProductId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Luxury Trust Indicators */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-11 h-11 rounded-full bg-blue-50 text-[#233EB6] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                100% Insured Worldwide Delivery
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Complimentary DHL Express Priority with tracking and tamper-evident packaging.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Grade 6A Mulberry Silk & Stoneware
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Certified 22-Momme pure silk and double-fired artisanal ceramic pottery.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-11 h-11 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                White-Glove VIP Concierge
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Direct client support at <a href="mailto:support@thaneriver.shop" className="text-[#233EB6] font-semibold hover:underline">support@thaneriver.shop</a>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
