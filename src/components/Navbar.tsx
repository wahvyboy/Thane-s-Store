import { useState } from 'react';
import { ChevronRight, Instagram, Youtube, Twitter, Facebook } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ cartCount, onOpenCart, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'THANE RIVERS 2', id: 'products' },
    { label: 'LOVERS GIFTING', id: 'lovers-gifting' },
    { label: 'OUR STORY', id: 'our-story' },
    { label: 'JOURNAL (50)', id: 'journal' },
    { label: 'EXPERIENCE', id: 'vip-experience' },
    { label: 'REVIEWS', id: 'reviews' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Navbar: Pure Crisp White matching exact reference screenshots */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          
          {/* Left: 3-bar Hamburger Icon exactly matching Screenshot_20260929_131546_Firefox.jpg */}
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#1A1A1A] hover:text-[#2E4BC6] transition-colors -ml-2"
              aria-label="Open menu"
            >
              <div className="w-5 h-3.5 flex flex-col justify-between">
                <span className="w-full h-[2px] bg-[#1A1A1A] rounded-full" />
                <span className="w-full h-[2px] bg-[#1A1A1A] rounded-full" />
                <span className="w-full h-[2px] bg-[#1A1A1A] rounded-full" />
              </div>
            </button>
          </div>

          {/* Center: Swirl / Vortex Icon + Wordmark in exact BlendJet Royal Cobalt Blue (#2E4BC6) */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('hero')}
              className="flex items-center gap-1.5 group select-none"
            >
              {/* Custom SVG Swirl Icon matching screenshot 100% */}
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 sm:w-7 sm:h-7 text-[#2E4BC6] fill-current"
                aria-hidden="true"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zm0-14a6 6 0 1 0 6 6 6.007 6.007 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4.004 4.004 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2z" />
              </svg>
              <span className="font-sans text-[22px] sm:text-[25px] font-black tracking-[-0.03em] text-[#2E4BC6] lowercase">
                thane<span className="font-black">rivers</span>
              </span>
            </button>
          </div>

          {/* Right: Accessibility + Search + Shopping Bag Icons matching exact screenshot */}
          <div className="flex items-center gap-3 sm:gap-4 text-[#1A1A1A]">
            
            {/* 1. Accessibility Icon: Stickman in circle */}
            <button
              onClick={() => alert("High contrast & accessibility mode active.")}
              className="p-1 hover:text-[#2E4BC6] transition-colors"
              title="Accessibility"
              aria-label="Accessibility options"
            >
              <svg viewBox="0 0 24 24" className="w-[21px] h-[21px] fill-none stroke-current stroke-[1.8]">
                <circle cx="12" cy="12" r="9.5" />
                <circle cx="12" cy="7.2" r="1.3" fill="currentColor" />
                <path d="M6.5 10.8h11M12 10.8v5.5M9.2 19.5l2.8-3.5 2.8 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* 2. Search Icon: Clean round lens with angled handle matching screenshot */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1 hover:text-[#2E4BC6] transition-colors"
              aria-label="Search"
            >
              <svg viewBox="0 0 24 24" className="w-[21px] h-[21px] fill-none stroke-current stroke-[2.1]">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="M15.8 15.8L21 21" strokeLinecap="round" />
              </svg>
            </button>

            {/* 3. Shopping Bag Icon: Outline tote bag matching screenshot */}
            <button
              onClick={onOpenCart}
              className="p-1 hover:text-[#2E4BC6] transition-colors relative"
              aria-label="Shopping bag"
            >
              <svg viewBox="0 0 24 24" className="w-[21px] h-[21px] fill-none stroke-current stroke-[2.1]">
                <path d="M5.5 8h13l1 12.5H4.5L5.5 8z" strokeLinejoin="round" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#2E4BC6] text-white text-[10px] w-4 h-4 rounded-full font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Quick Search Drawer */}
        {searchOpen && (
          <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
            <div className="max-w-xl mx-auto flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-400 fill-none stroke-current stroke-2">
                <circle cx="11" cy="11" r="7" />
                <path d="M16 16l4 4" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search Thane Rivers Pinjamas, Titan Card, or VIP Experience..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 px-2 py-1"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Slide-out Mobile Menu Drawer matching reference screenshot 3892628f */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white text-slate-900 h-full flex flex-col justify-between shadow-2xl z-10">
            
            {/* Top Bar of Mobile Drawer: Light periwinkle blue #7F95E8 matching reference */}
            <div className="p-4 bg-[#7F95E8] text-white flex items-center justify-between">
              <div className="flex items-center gap-1.5 mx-auto pl-6">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zm0-14a6 6 0 1 0 6 6 6.007 6.007 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4.004 4.004 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2z" />
                </svg>
                <span className="text-xl font-black tracking-tight lowercase">
                  thane<span className="font-extrabold text-blue-100">rivers</span>
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-white hover:bg-white/10"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2.5]">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Menu Items matching reference typography: Bold uppercase text with right arrows */}
            <div className="flex-1 py-8 px-6 space-y-6 overflow-y-auto">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="w-full flex items-center justify-between text-left text-base font-extrabold tracking-wider text-slate-900 hover:text-[#2E4BC6] transition-colors"
                >
                  <span className="uppercase">{link.label}</span>
                  <ChevronRight className="w-5 h-5 text-[#2E4BC6]" />
                </button>
              ))}

              <div className="pt-8">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full py-3.5 px-4 rounded-full bg-[#2E4BC6] text-white font-extrabold text-xs uppercase tracking-widest shadow-md hover:bg-[#253FA7] transition-colors flex items-center justify-center gap-2"
                >
                  <span>VIEW CART ({cartCount})</span>
                </button>
              </div>
            </div>

            {/* Drawer Bottom: Social icons in navy blue matching reference screenshot 3892628f */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-around text-[#23356E]">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-[#2E4BC6]">
                <Instagram className="w-6 h-6 stroke-[2]" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-[#2E4BC6]">
                <Youtube className="w-6 h-6 stroke-[2]" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-[#2E4BC6]">
                <Facebook className="w-6 h-6 stroke-[2]" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-[#2E4BC6]">
                <Twitter className="w-6 h-6 stroke-[2]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
