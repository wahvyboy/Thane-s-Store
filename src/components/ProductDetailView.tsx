import { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import {
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Minus,
  Plus,
  ShoppingBag,
  Check,
  ChevronDown,
  Gift,
  Lock,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (product: Product, variant: string, size: string, quantity: number) => void;
  onBackToCatalog: () => void;
  onSelectProduct: (product: Product) => void;
}

export function ProductDetailView({
  product,
  onAddToCart,
  onBackToCatalog,
  onSelectProduct,
}: ProductDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || 'Default');
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    included: true,
    craftsmanship: true,
    delivery: false,
  });
  const [justAdded, setJustAdded] = useState(false);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const activeImage = images[selectedImageIndex] || images[0];

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant, selectedSize, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="w-full bg-[#FCFCFC] text-slate-900 py-6 sm:py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Bar & Back Navigation */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8 sm:mb-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <button
              onClick={onBackToCatalog}
              className="hover:text-[#233EB6] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Official Vault</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-md">
              {product.name}
            </span>
          </nav>

          <button
            onClick={onBackToCatalog}
            className="text-xs font-bold text-[#233EB6] hover:text-[#182B7A] tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>← Back to Vault</span>
          </button>
        </div>

        {/* 2-Column Shopify-Style PDP Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* LEFT COLUMN: Interactive Luxury Image Gallery (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnail Strip (Vertical on desktop/tablet, horizontal on mobile) */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 shrink-0 pb-2 sm:pb-0 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-18 h-18 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-100 shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#233EB6] ring-2 ring-[#233EB6]/30 shadow-md'
                      : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Main Interactive Stage */}
            <div className="flex-1 relative aspect-[4/5] bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg group">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Dedicated Badge */}
              <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#233EB6] text-white shadow-md">
                  {product.badge}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {product.editionNumber}
                </span>
              </div>

              {/* Free Insured Shipping Pill */}
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1C2C60] text-[11px] font-black uppercase tracking-wider shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Insured White-Glove Dispatch
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Product Detail Information & Buy Box (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Edition & Stock Badge */}
            <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mb-2">
              <span className="text-[#233EB6] font-mono tracking-tight font-black uppercase">
                {product.editionNumber}
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {product.stockStatus}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 font-sans tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium leading-relaxed">
              {product.subtitle}
            </p>

            {/* Price Box */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Total Investment
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950 font-mono tracking-tight">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-slate-500">USD</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  <Check className="w-3 h-3 stroke-[3]" /> FREE WORLDWIDE SHIPPING
                </span>
              </div>
            </div>

            {/* Brief Narrative Description */}
            <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector for Silk Pyjamas */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Select Silk Pyjama Size: <span className="text-[#233EB6]">{selectedSize}</span>
                </label>
                <span className="text-[11px] font-bold text-slate-400">Athletic Tailored Cut</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 rounded-xl text-xs font-black uppercase transition-all duration-200 cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#233EB6] text-white shadow-md ring-2 ring-[#233EB6]/30 scale-105'
                        : 'bg-white border border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant / Edition Selector */}
            {product.variants.length > 1 && (
              <div className="mt-5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-900 block mb-2">
                  Select Edition Finish: <span className="text-[#233EB6]">{selectedVariant}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedVariant === v
                          ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Primary CTA Button */}
            <div className="mt-7 flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-slate-300 rounded-2xl bg-white p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-sm font-mono text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Prominent / Sticky Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-98 ${
                  justAdded
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                    : 'bg-[#233EB6] hover:bg-[#182B7A] text-white shadow-[#233EB6]/30 hover:shadow-2xl'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>ADDED TO SHOPPING BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG • ${(product.price * quantity).toLocaleString()} USD</span>
                  </>
                )}
              </button>
            </div>

            {/* Concierge Guarantee Tagline */}
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 px-1 font-medium">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#233EB6]" />
                Express DHL Worldwide
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Discreet Concierge Dispatch
              </span>
              <span className="flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-amber-500" />
                Gift Packaging Included
              </span>
            </div>

            {/* Accordion Sections: 1. What's Included, 2. Craftsmanship & Materials, 3. Concierge Delivery & Security */}
            <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
              
              {/* Accordion 1: What's Included */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleAccordion('included')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#233EB6]" />
                    What's Included in the Suite
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openAccordions.included ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordions.included && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/50">
                    <ul className="space-y-2 text-xs text-slate-600">
                      {product.whatsIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Craftsmanship & Materials */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleAccordion('craftsmanship')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    Craftsmanship & Materials
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openAccordions.craftsmanship ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordions.craftsmanship && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/50">
                    <ul className="space-y-2 text-xs text-slate-600">
                      {product.craftsmanship.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#233EB6] shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Concierge Delivery & Security */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    Concierge Delivery & Security
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openAccordions.delivery ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordions.delivery && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/50">
                    <ul className="space-y-2 text-xs text-slate-600">
                      {product.deliverySecurity.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500">
                      For special courier inquiries or customs assistance, please contact:{' '}
                      <a href="mailto:support@thaneriver.shop" className="text-[#233EB6] font-bold hover:underline">
                        support@thaneriver.shop
                      </a>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* RELATED SIGNATURE RELEASES */}
        <div className="mt-20 sm:mt-24 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#233EB6] block">
                Official Vault
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
                Complete Your Thane Rivers Suite
              </h2>
            </div>
            <button
              onClick={onBackToCatalog}
              className="text-xs font-bold text-[#233EB6] hover:underline"
            >
              View All 3 Releases →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectProduct(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer"
              >
                <img
                  src={rel.images[0] || rel.image}
                  alt={rel.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#233EB6]">
                    {rel.badge}
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 truncate group-hover:text-[#233EB6] transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {rel.subtitle}
                  </p>
                  <p className="text-sm font-black font-mono text-slate-950 mt-1">
                    ${rel.price.toLocaleString()} USD
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#233EB6] group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
