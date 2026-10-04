import { Instagram, Youtube, Twitter, Facebook, Heart, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionOrView: string) => void;
  onOpenCart: () => void;
  onSelectProductById?: (productId: string) => void;
}

export function Footer({ onNavigate, onOpenCart, onSelectProductById }: FooterProps) {
  return (
    <footer className="w-full bg-[#141414] text-white pt-16 pb-12 px-4 text-center select-none">
      <div className="max-w-md mx-auto flex flex-col items-center">
        
        {/* White Spiral Vortex Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="w-16 h-16 flex items-center justify-center text-white mb-6 group cursor-pointer"
          aria-label="Thane Rivers Home"
        >
          <img
            src="/logo.svg"
            alt="Thane Rivers Vortex Logo"
            className="w-14 h-14 brightness-200 transition-transform group-hover:rotate-90 duration-500"
          />
        </button>

        {/* Brand Tagline */}
        <p className="text-xs font-black tracking-widest uppercase text-white flex items-center justify-center gap-1.5 mb-8">
          <span>DESIGNED WITH</span>
          <Heart className="w-3.5 h-3.5 text-white fill-white inline" />
          <span>FOR WARRIORS</span>
        </p>

        {/* Social Icons placeholder (no external links) */}
        <div className="flex items-center justify-center gap-6 text-white/70 mb-12 select-none">
          <span className="p-1 cursor-default">
            <Instagram className="w-6 h-6 stroke-[2]" />
          </span>
          <span className="p-1 cursor-default">
            <Youtube className="w-6 h-6 stroke-[2]" />
          </span>
          <span className="p-1 cursor-default">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.19 2.06 2.34 2.24.77.14 1.58.04 2.28-.32.74-.37 1.29-1.05 1.5-1.84.11-.47.16-.95.16-1.43V.02h-2.02z" />
            </svg>
          </span>
          <span className="p-1 cursor-default">
            <Facebook className="w-6 h-6 stroke-[2]" />
          </span>
          <span className="p-1 cursor-default">
            <Twitter className="w-6 h-6 stroke-[2]" />
          </span>
        </div>

        {/* Stacked Uppercase Links */}
        <div className="w-full space-y-6 text-xs font-black tracking-widest uppercase text-white mb-10">
          <div className="space-y-4">
            <button onClick={() => onNavigate('shop')} className="block w-full hover:text-blue-400 transition-colors cursor-pointer text-[#4C75F2]">
              OFFICIAL VAULT (3 SIGNATURE RELEASES)
            </button>
            <button
              onClick={() => onSelectProductById ? onSelectProductById('pyjamas-mug-combo') : onNavigate('shop')}
              className="block w-full hover:text-blue-400 transition-colors cursor-pointer"
            >
              PINJAMAS AND CERAMIC MUG COMBO ($999)
            </button>
            <button
              onClick={() => onSelectProductById ? onSelectProductById('vip-member-card') : onNavigate('shop')}
              className="block w-full hover:text-blue-400 transition-colors cursor-pointer"
            >
              VIP MEMBER CARD ($2,099)
            </button>
            <button
              onClick={() => onSelectProductById ? onSelectProductById('10-day-stay') : onNavigate('shop')}
              className="block w-full hover:text-blue-400 transition-colors cursor-pointer"
            >
              10-DAY STAY WITH THANE RIVERS ($4,999)
            </button>
          </div>

          <div className="w-full border-t border-white/10 pt-6 space-y-4">
            <button onClick={() => onNavigate('journal')} className="block w-full hover:text-blue-400 text-blue-300 transition-colors cursor-pointer">
              JOURNAL (50 ARTICLES)
            </button>
            <button onClick={() => onNavigate('our-story')} className="block w-full hover:text-blue-400 transition-colors cursor-pointer">
              OUR STORY
            </button>
            <button onClick={() => onNavigate('reviews')} className="block w-full hover:text-blue-400 transition-colors cursor-pointer">
              REVIEWS
            </button>
            <button onClick={() => onNavigate('lovers-gifting')} className="block w-full hover:text-blue-400 transition-colors cursor-pointer">
              LOVERS GIFTING
            </button>
          </div>
        </div>

        {/* Concierge Desk Contacts */}
        <div className="w-full border-t border-white/10 pt-6 pb-6 text-xs text-slate-300 space-y-2">
          <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
            VIP Client Concierge Desk
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-slate-300">
            <a href="mailto:order@thaneriver.shop" className="hover:text-blue-400 flex items-center gap-1.5 transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#233EB6]" />
              <span>Orders: order@thaneriver.shop</span>
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <a href="mailto:support@thaneriver.shop" className="hover:text-blue-400 flex items-center gap-1.5 transition-colors">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inquiries: support@thaneriver.shop</span>
            </a>
          </div>
        </div>

        {/* Legal Links and Copyright */}
        <div className="w-full border-t border-white/10 pt-6 text-[10px] text-slate-400 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span className="hover:text-white cursor-pointer">Patents</span>
            <span className="hover:text-white cursor-pointer">Trademarks</span>
            <span className="hover:text-white cursor-pointer">Terms of Use</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          </div>
          <p className="font-mono text-slate-500">
            ©2026 Thane Rivers. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
