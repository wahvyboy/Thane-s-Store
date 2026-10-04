import { Instagram, CheckCircle2 } from 'lucide-react';

export function SocialSection() {
  return (
    <section className="w-full bg-white pt-14 pb-8 px-4 text-center select-none">
      <div className="max-w-md mx-auto">
        
        {/* Instagram Handle with Blue Verified Checkmark */}
        <div className="flex items-center justify-center gap-1.5">
          <h2 className="text-3xl sm:text-4xl font-black italic tracking-tight text-[#2B449C]">
            @thanerivers
          </h2>
          {/* Blue Verified Badge */}
          <div className="w-6 h-6 rounded-full bg-[#1D9BF0] flex items-center justify-center text-white shrink-0">
            <CheckCircle2 className="w-4 h-4 fill-white text-[#1D9BF0]" />
          </div>
        </div>

        {/* Follower Count */}
        <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#24356E] mt-2">
          715K FOLLOWERS ON INSTAGRAM
        </p>

        {/* Copy */}
        <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
          Get inspired with daily training, mindset, and backstage life with Thane Rivers.
        </p>
        <p className="text-xs font-bold text-[#24356E] mt-0.5">
          #ThaneWarriors
        </p>

        {/* Display Badge (No external link) */}
        <div className="mt-5 flex flex-col items-center">
          <div className="w-full max-w-[280px] py-2.5 rounded-full border-2 border-[#24356E] text-[#24356E] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-default bg-slate-50/50">
            <Instagram className="w-4 h-4" />
            <span>OFFICIAL COMMUNITY</span>
          </div>
        </div>

      </div>
    </section>
  );
}
