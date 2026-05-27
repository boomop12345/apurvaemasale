import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Search, X, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../data';

export const SearchOverlay: React.FC = () => {
  const {
    isSearchOverlayOpen,
    setIsSearchOverlayOpen,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    setSelectedProductId
  } = useApp();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOverlayOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOverlayOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOverlayOpen) {
        setIsSearchOverlayOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOverlayOpen, setIsSearchOverlayOpen, setSearchQuery]);

  const handleTrendingClick = (tag: string) => {
    setSearchQuery(tag);
    inputRef.current?.focus();
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return false;
    return (
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('detail');
    setIsSearchOverlayOpen(false);
  };

  return (
    <AnimatePresence>
      {isSearchOverlayOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6"
        >
          {/* Blur Background */}
          <div 
            className="absolute inset-0 bg-brand-950/40 backdrop-blur-md"
            onClick={() => {
              setSearchQuery('');
              setIsSearchOverlayOpen(false);
            }}
          />

          {/* Centered Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
            className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.15)] border border-white/50 overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Search Input Area */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-brand-200/50 bg-white/50 shrink-0">
              <Search className="w-6 h-6 text-brand-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spices, collections..."
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-xl font-serif text-brand-950 placeholder-brand-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 hover:bg-brand-100 rounded-full text-brand-400 hover:text-brand-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className="w-px h-6 bg-brand-200 mx-1 shrink-0" />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOverlayOpen(false);
                }}
                className="text-xs font-mono font-bold uppercase text-brand-500 hover:text-brand-950 px-2 py-1 rounded transition shrink-0"
              >
                ESC
              </button>
            </div>

            {/* Results / Default State Area */}
            <div className="overflow-y-auto no-scrollbar p-6 bg-brand-50/50 flex-1">
              {searchQuery ? (
                // Results State
                <div className="space-y-4">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-brand-500 font-bold px-2">
                    Results ({filteredProducts.length})
                  </p>
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      {filteredProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleProductSelect(p.id)}
                          className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white border border-transparent hover:border-brand-200/60 hover:shadow-sm cursor-pointer transition-all group"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-14 h-14 object-cover rounded-xl border border-brand-100/60"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-base font-bold text-brand-950 truncate group-hover:text-gold-600 transition">
                              {p.title}
                            </h4>
                            <p className="text-xs font-sans text-brand-500 truncate">{p.subtitle}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[9px] font-mono uppercase tracking-widest text-gold-600">{p.category}</span>
                              <span className="text-brand-300">•</span>
                              <span className="text-[9px] font-mono uppercase tracking-widest text-brand-400">{p.origin.split(',')[0]}</span>
                            </div>
                          </div>
                          <span className="font-serif font-bold text-brand-950">₹{p.price}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 opacity-70">
                      <Search className="w-8 h-8 text-brand-300 mx-auto mb-3" />
                      <p className="font-serif text-lg text-brand-900">No items found</p>
                      <p className="text-xs font-mono text-brand-400 mt-1">Try "Saffron" or "Turmeric"</p>
                    </div>
                  )}
                </div>
              ) : (
                // Default Empty State
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Suggestions */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-brand-400 font-bold flex items-center gap-1.5 px-2">
                      <Sparkles className="w-3 h-3 text-gold-500" />
                      Trending Curations
                    </p>
                    <div className="flex flex-col gap-1">
                      {['Saffron Grade Lalgul', 'Lakadong Turmeric', 'Guntur Heat', 'Awadhi Court'].map((item) => (
                        <button
                          key={item}
                          onClick={() => handleTrendingClick(item)}
                          className="text-left px-4 py-2.5 rounded-xl hover:bg-white text-sm font-sans text-brand-700 hover:text-brand-950 hover:shadow-sm border border-transparent hover:border-brand-200/50 transition-all flex justify-between items-center group"
                        >
                          {item}
                          <ArrowUpRight className="w-3 h-3 text-brand-300 group-hover:text-gold-500 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Regions */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-brand-400 font-bold flex items-center gap-1.5 px-2">
                      <MapPin className="w-3 h-3 text-brand-400" />
                      Explore by Region
                    </p>
                    <div className="flex flex-wrap gap-2 px-2">
                      {['Kashmir', 'Malabar Coast', 'Meghalaya', 'Andhra Pradesh'].map((region) => (
                        <button
                          key={region}
                          onClick={() => handleTrendingClick(region)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-brand-200/60 hover:border-gold-400 text-xs font-mono text-brand-600 hover:text-brand-950 transition-colors shadow-sm"
                        >
                          {region}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-brand-100/50 border-t border-brand-200/50 px-6 py-3 flex justify-between items-center text-[10px] font-mono text-brand-400 shrink-0">
              <span className="hidden sm:inline">Press <kbd className="font-sans px-1.5 py-0.5 bg-white border border-brand-200 rounded text-brand-600 shadow-sm mx-1">Esc</kbd> to close</span>
              <span>Apurvae Masale</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
