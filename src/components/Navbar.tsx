import { useState } from 'react';
import { ChevronRight, Instagram, Youtube, Twitter, Facebook, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionOrView: string) => void;
  onSelectProductById: (productId: string) => void;
}

export function Navbar({ cartCount, onOpenCart, onNavigate, onSelectProductById }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'OFFICIAL VAULT (3)', action: () => onNavigate('shop') },
    { label: 'PINJAMAS & MUG ($999)', action: () => onSelectProductById('pyjamas-mug-combo') },
    { label: 'VIP MEMBER CARD ($2,099)', action: () => onSelectProductById('vip-member-card') },
    { label: '10-DAY STAY ($4,999)', action: () => onSelectProductById('10-day-stay') },
    { label: 'LOVERS GIFTING', action: () => onNavigate('lovers-gifting') },
    { label: 'OUR STORY', action: () => onNavigate('our-story') },
    { label: 'JOURNAL (50)', action: () => onNavigate('journal') },
    { label: 'REVIEWS', action: () => onNavigate('reviews') },
  ];

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  const filteredSearchResults = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Top Navbar: Pure Crisp White matching exact flagship aesthetic */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          
          {/* Left: 3-bar Hamburger Icon & Shop Quick Link */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#1A1A1A] hover:text-[#233EB6] transition-colors -ml-2 cursor-pointer"
              aria-label="Open menu"
            >
              <div className="w-5 h-3.5 flex flex-col justify-between">
                <span className="w-full h-[2px] bg-[#1A1A1A] rounded-full" />
                <span className="w-full h-[2px] bg-[#1A1A1A] rounded-full" />
                <span className="w-full h-[2px] bg-[#1A1A1A] rounded-full" />
              </div>
            </button>

            {/* Direct SHOP navigation link */}
            <button
              onClick={() => onNavigate('shop')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#233EB6] hover:text-[#182B7A] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>SHOP VAULT</span>
            </button>
          </div>

          {/* Center: Concentric Vortex Icon + Wordmark in Royal Cobalt Blue (#233EB6) */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group select-none cursor-pointer"
            >
              <img
                src="/logo.svg"
                alt="Thane Rivers Concentric Vortex"
                className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:rotate-45 duration-300"
              />
              <span className="font-sans text-[22px] sm:text-[25px] font-black tracking-[-0.03em] text-[#233EB6] lowercase">
                thane<span className="font-black">rivers</span>
              </span>
            </button>
          </div>

          {/* Right: Search + Shopping Bag Icons (Cross/accessibility icon removed) */}
          <div className="flex items-center gap-3 sm:gap-4 text-[#1A1A1A]">
            
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1 hover:text-[#233EB6] transition-colors cursor-pointer"
              aria-label="Search catalog"
            >
              <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-none stroke-current stroke-[2.1]">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="M15.8 15.8L21 21" strokeLinecap="round" />
              </svg>
            </button>

            {/* Shopping Bag Icon */}
            <button
              onClick={onOpenCart}
              className="p-1.5 hover:text-[#233EB6] transition-colors relative cursor-pointer"
              aria-label="Shopping bag"
            >
              <svg viewBox="0 0 24 24" className="w-[21px] h-[21px] fill-none stroke-current stroke-[2.1]">
                <path d="M5.5 8h13l1 12.5H4.5L5.5 8z" strokeLinejoin="round" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#233EB6] text-white text-[10px] w-4.5 h-4.5 rounded-full font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Quick Search Drawer */}
        {searchOpen && (
          <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 shadow-inner">
            <div className="max-w-xl mx-auto flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-400 fill-none stroke-current stroke-2">
                <circle cx="11" cy="11" r="7" />
                <path d="M16 16l4 4" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search Mulberry silk pyjamas, ceramic mug, VIP card, or residency..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 px-2 py-1 cursor-pointer"
              >
                Close
              </button>
            </div>

            {searchQuery.trim() && (
              <div className="max-w-xl mx-auto mt-2 pt-2 border-t border-slate-200 space-y-1">
                {filteredSearchResults.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      onSelectProductById(prod.id);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full p-2 rounded-lg bg-white border border-slate-200 hover:border-[#233EB6] text-left text-xs flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-slate-800">{prod.name}</span>
                    <span className="text-[#233EB6] font-mono font-bold">${prod.price.toLocaleString()} USD</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Slide-out Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white text-slate-900 h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-250">
            
            {/* Top Bar of Mobile Drawer: Light periwinkle blue #7F95E8 */}
            <div className="p-4 bg-[#7F95E8] text-white flex items-center justify-between">
              <div className="flex items-center gap-2 pl-2">
                <img src="/logo.svg" alt="Thane Rivers Logo" className="w-6 h-6 brightness-200" />
                <span className="text-xl font-black tracking-tight lowercase">
                  thane<span className="font-extrabold text-blue-100">rivers</span>
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 py-8 px-6 space-y-5 overflow-y-auto">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(link.action)}
                  className="w-full flex items-center justify-between text-left text-sm font-black tracking-wider text-slate-900 hover:text-[#233EB6] transition-colors cursor-pointer py-1 border-b border-slate-100"
                >
                  <span className="uppercase">{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#233EB6]" />
                </button>
              ))}

              <div className="pt-6">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full py-3.5 px-4 rounded-full bg-[#233EB6] text-white font-extrabold text-xs uppercase tracking-widest shadow-md hover:bg-[#182B7A] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>VIEW SHOPPING BAG ({cartCount})</span>
                </button>
              </div>
            </div>

            {/* Drawer Bottom: Social icons placeholder without external links */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-around text-[#23356E]/60 select-none">
              <span className="p-1">
                <Instagram className="w-5 h-5 stroke-[2]" />
              </span>
              <span className="p-1">
                <Youtube className="w-5 h-5 stroke-[2]" />
              </span>
              <span className="p-1">
                <Facebook className="w-5 h-5 stroke-[2]" />
              </span>
              <span className="p-1">
                <Twitter className="w-5 h-5 stroke-[2]" />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
