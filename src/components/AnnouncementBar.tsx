export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-black py-2 px-4 text-center text-xs md:text-sm font-semibold tracking-wider uppercase border-b border-amber-400/30 flex items-center justify-center gap-2">
      <span className="font-extrabold tracking-widest text-slate-950">SALE SALE SALE</span>
      <span className="opacity-60">·</span>
      <span>15% OFF SELECT BUNDLES</span>
      <span className="opacity-60 hidden sm:inline">·</span>
      <span className="hidden sm:inline font-medium text-slate-950">VIP MEMBERSHIP AUTOMATICALLY APPLIED</span>
    </div>
  );
}
