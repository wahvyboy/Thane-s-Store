import { useState } from 'react';
import { Instagram, CheckCircle2, Edit2 } from 'lucide-react';

export function SocialSection() {
  const [handle, setHandle] = useState('thanerivers');
  const [isEditing, setIsEditing] = useState(false);
  const [tempHandle, setTempHandle] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempHandle.trim()) {
      setHandle(tempHandle.trim().replace('@', ''));
      setIsEditing(false);
    }
  };

  return (
    <section className="w-full bg-white pt-14 pb-8 px-4 text-center">
      <div className="max-w-md mx-auto">
        
        {/* Instagram Handle with Blue Verified Checkmark matching reference screenshot 4 */}
        <div className="flex items-center justify-center gap-1.5">
          <h2 className="text-3xl sm:text-4xl font-black italic tracking-tight text-[#2B449C]">
            @{handle}
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

        {/* Rounded Outline Button matching reference screenshot 4: "[Instagram] FOLLOW US" */}
        <div className="mt-5 flex flex-col items-center gap-2">
          <a
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[280px] py-2.5 rounded-full border-2 border-[#24356E] hover:bg-[#24356E] hover:text-white text-[#24356E] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>FOLLOW US</span>
          </a>

          {!isEditing ? (
            <button
              onClick={() => {
                setTempHandle(handle);
                setIsEditing(true);
              }}
              className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
            >
              <Edit2 className="w-2.5 h-2.5" />
              <span>Change Instagram dummy handle</span>
            </button>
          ) : (
            <form onSubmit={handleSave} className="flex items-center gap-1 mt-1 text-xs">
              <input
                type="text"
                value={tempHandle}
                onChange={(e) => setTempHandle(e.target.value)}
                placeholder="new handle..."
                className="border border-slate-300 rounded px-2 py-0.5 text-xs w-28"
              />
              <button type="submit" className="bg-[#24356E] text-white px-2 py-0.5 rounded text-xs">
                OK
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="text-slate-400 px-1">
                ✕
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
