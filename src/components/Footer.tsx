import { Instagram, Youtube, Twitter, Facebook, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenCart: () => void;
}

export function Footer({ onNavigate, onOpenCart }: FooterProps) {
  return (
    <footer className="w-full bg-[#141414] text-white pt-16 pb-12 px-4 text-center">
      <div className="max-w-md mx-auto flex flex-col items-center">
        
        {/* White Spiral Swirl Logo matching reference screenshot 11 (c3eb6a1e) */}
        <div className="w-16 h-16 flex items-center justify-center text-white mb-6">
          <svg viewBox="0 0 24 24" className="w-14 h-14 fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>

        {/* "DESIGNED WITH ❤️ IN CALIFORNIA" -> for Thane Rivers */}
        <p className="text-xs font-black tracking-widest uppercase text-white flex items-center justify-center gap-1.5 mb-8">
          <span>DESIGNED WITH</span>
          <Heart className="w-3.5 h-3.5 text-white fill-white inline" />
          <span>FOR WARRIORS</span>
        </p>

        {/* Social Icons row matching reference screenshot 11 */}
        <div className="flex items-center justify-center gap-6 text-white mb-12">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-blue-400">
            <Instagram className="w-6 h-6 stroke-[2]" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-blue-400">
            <Youtube className="w-6 h-6 stroke-[2]" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-blue-400">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.19 2.06 2.34 2.24.77.14 1.58.04 2.28-.32.74-.37 1.29-1.05 1.5-1.84.11-.47.16-.95.16-1.43V.02h-2.02z" />
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-blue-400">
            <Facebook className="w-6 h-6 stroke-[2]" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-blue-400">
            <Twitter className="w-6 h-6 stroke-[2]" />
          </a>
        </div>

        {/* Stacked Uppercase Links matching reference screenshots 11, 2, and 1 */}
        {/* Strictly respecting instruction: "no login and sign in no store locations" */}
        <div className="w-full space-y-6 text-xs font-black tracking-widest uppercase text-white mb-14">
          <div className="space-y-4">
            <button onClick={() => onNavigate('products')} className="block w-full hover:text-blue-400">
              THANE RIVERS 2
            </button>
            <button onClick={() => onNavigate('products')} className="block w-full hover:text-blue-400">
              PINJAMAS AND CUP COMBO
            </button>
            <button onClick={() => onNavigate('products')} className="block w-full hover:text-blue-400">
              VIP TITAN MEMBERSHIP CARD
            </button>
            <button onClick={() => onNavigate('products')} className="block w-full hover:text-blue-400">
              ONE WEEK WITH THE SUPERSTAR
            </button>
          </div>

          <div className="w-full border-t border-white/10 pt-6 space-y-4">
            <button onClick={() => onNavigate('journal')} className="block w-full hover:text-blue-400 text-blue-300">
              JOURNAL (50 ARTICLES)
            </button>
            <button onClick={() => onNavigate('our-story')} className="block w-full hover:text-blue-400">
              OUR STORY
            </button>
            <button onClick={() => onNavigate('reviews')} className="block w-full hover:text-blue-400">
              REVIEWS
            </button>
            <button onClick={() => onNavigate('lovers-gifting')} className="block w-full hover:text-blue-400">
              LOVERS GIFTING
            </button>
          </div>
        </div>

        {/* Legal Links and Copyright matching reference screenshot 1 */}
        <div className="w-full border-t border-white/10 pt-6 text-[10px] text-slate-400 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span className="hover:text-white cursor-pointer">Patents</span>
            <span className="hover:text-white cursor-pointer">Trademarks</span>
            <span className="hover:text-white cursor-pointer">Terms of Use</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          </div>
          <p className="font-mono text-slate-500">
            ©2026 Thane Rivers
          </p>
        </div>

      </div>
    </footer>
  );
}
