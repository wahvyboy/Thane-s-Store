import { useState, useMemo } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts';
import { Search, X, BookOpen, Clock, Calendar, ArrowRight, Share2, Check } from 'lucide-react';

interface BlogSectionProps {
  onQuickOrder?: (productId: string) => void;
}

export function BlogSection({ onQuickOrder }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = ['All', 'Biography', 'Viking Lore', 'Discipline & Mindset', 'World Tours', 'Interviews', 'Philosophy'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const handleShare = () => {
    if (activePost) {
      navigator.clipboard.writeText(`${window.location.origin}/#blog-${activePost.slug}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section id="journal" className="w-full bg-[#FAF9F6] py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200 select-none">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#2E4BC6]">
            THE THANE RIVERS ARCHIVES
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            The Life, Lore & Chronicles of Thane Rivers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            50 in-depth biographical dispatches: Arctic origins in Tromsø, ancient Norse warrior stoicism, 4:30 AM discipline protocols, and unscripted world tour chronicles.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(8);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2E4BC6] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat} {cat === 'All' && `(50)`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 50 articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(8);
              }}
              className="w-full bg-white border border-slate-200 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2E4BC6]"
            />
          </div>
        </div>

        {/* Article Grid - Clean Text-Only Cards (NO IMAGES) */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-bold text-slate-700">No articles match your query.</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search or switching categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setActivePost(post)}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#2E4BC6] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2.5">
                    <span className="font-bold text-[#2E4BC6] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="font-mono text-slate-400">
                      #{post.id.replace('post-', '')}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-sm text-slate-900 group-hover:text-[#2E4BC6] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="font-bold text-[#2E4BC6] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read Essay <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredPosts.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 12, filteredPosts.length))}
              className="px-8 py-3 rounded-full bg-white hover:bg-slate-50 border-2 border-[#2E4BC6] text-[#2E4BC6] font-black text-xs uppercase tracking-widest shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              Load More Dispatches ({visibleCount} of {filteredPosts.length})
            </button>
          </div>
        )}

      </div>

      {/* Full Article Reading Modal - Clean Text-Only (NO IMAGES) */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActivePost(null)} />
          
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl text-slate-900 overflow-hidden my-auto max-h-[90vh] flex flex-col z-10 border border-slate-200">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <span className="text-xs font-black uppercase tracking-wider text-[#2E4BC6]">
                {activePost.category} · Archive #{activePost.id.replace('post-', '')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-1.5 text-slate-600 hover:text-[#2E4BC6] rounded-full hover:bg-white transition-colors cursor-pointer"
                  title="Copy article link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setActivePost(null)}
                  className="p-1.5 text-slate-600 hover:text-black rounded-full hover:bg-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content Body - Pure Clean Typography, No Images */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span>{activePost.date}</span>
                <span>·</span>
                <span>{activePost.readTime}</span>
                <span>·</span>
                <span className="text-emerald-700 font-semibold">Verified Biography & Dispatches</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {activePost.title}
              </h2>

              <blockquote className="text-xs sm:text-sm font-medium text-slate-700 mt-4 p-4 bg-slate-50 rounded-2xl border-l-4 border-[#2E4BC6] italic leading-relaxed">
                "{activePost.excerpt}"
              </blockquote>

              <div className="mt-6 text-sm sm:text-base text-slate-800 space-y-4 leading-relaxed whitespace-pre-line font-normal">
                {activePost.content}
              </div>

              {/* Tag indexing */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Archival Keywords:</span>
                {activePost.keywords.map((kw) => (
                  <span key={kw} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                    #{kw}
                  </span>
                ))}
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
