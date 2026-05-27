import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { Sliders, Check, Compass, Star, MapPin, Sparkles, Filter, RotateCcw, Heart, ArrowRight, Flame, Leaf } from 'lucide-react';

export const ProductListingPage: React.FC = () => {
  const {
    filters,
    setFilter,
    resetFilters,
    sortBy,
    setSortBy,
    setCurrentPage,
    setSelectedProductId,
    toggleWishlist,
    wishlist
  } = useApp();

  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  // Extract unique origins from PRODUCTS
  const availableOrigins = useMemo(() => {
    const list = new Set<string>();
    PRODUCTS.forEach((p) => {
      if (p.origin.includes('Kashmir')) list.add('Kashmir');
      else if (p.origin.includes('Malabar') || p.origin.includes('Kerala')) list.add('Malabar Coast');
      else if (p.origin.includes('Meghalaya')) list.add('Meghalaya');
      else if (p.origin.includes('Andhra') || p.origin.includes('Guntur')) list.add('Andhra Pradesh');
      else if (p.origin.includes('Sri Lanka')) list.add('Sri Lanka');
    });
    return Array.from(list);
  }, []);

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (filters.category !== 'All' && p.category !== filters.category) return false;
      if (filters.heatLevel !== 'All' && p.heatLevel !== filters.heatLevel) return false;
      if (filters.origin !== 'All') {
        const originL = filters.origin.toLowerCase();
        const pOriginL = p.origin.toLowerCase();
        if (originL === 'kashmir' && !pOriginL.includes('kashmir')) return false;
        if (originL === 'malabar coast' && !pOriginL.includes('malabar') && !pOriginL.includes('kerala')) return false;
        if (originL === 'meghalaya' && !pOriginL.includes('meghalaya')) return false;
        if (originL === 'andhra pradesh' && !pOriginL.includes('andhra') && !pOriginL.includes('guntur')) return false;
        if (originL === 'sri lanka' && !pOriginL.includes('sri lanka')) return false;
      }
      if (p.price > filters.priceRange) return false;
      return true;
    });
  }, [filters]);

  // Sort products dynamically
  const sortedAndFilteredProducts = useMemo(() => {
    const arr = [...filteredProducts];
    if (sortBy === 'price-asc') {
      arr.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      arr.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      arr.sort((a, b) => b.rating - a.rating);
    }
    return arr;
  }, [filteredProducts, sortBy]);

  const displayedProducts = useMemo(() => {
    return sortedAndFilteredProducts.slice(0, visibleCount);
  }, [sortedAndFilteredProducts, visibleCount]);

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 3, sortedAndFilteredProducts.length));
      setLoadingMore(false);
    }, 800);
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('detail');
  };

  const heatColorMap: Record<string, string> = {
    'None': 'text-brand-400',
    'Mild': 'text-amber-500',
    'Medium': 'text-orange-500',
    'Hot': 'text-red-500',
    'Extra Hot': 'text-red-700',
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Rich gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-150 via-brand-55 to-gold-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-100/40 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Banner Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-3 mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-brand-950/5 backdrop-blur-md text-brand-800 px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-mono border border-brand-200/60">
            <Leaf className="w-3.5 h-3.5 text-gold-600" />
            Heritage Catalog
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-950 tracking-tight">The Heritage Catalog</h2>
          <p className="text-sm font-sans text-brand-600 max-w-md mx-auto">Browse single-origin crops & pan-roasted blends, each traced to their ancestral soil.</p>
        </motion.div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Glassmorphism Filters Sidebar */}
          <motion.aside 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-3 backdrop-blur-xl bg-white/60 p-6 rounded-3xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)] space-y-6 sticky top-28 z-10"
          >
            <div className="flex items-center justify-between border-b border-brand-200/40 pb-4">
              <span className="font-serif font-bold text-brand-950 text-lg flex items-center gap-2">
                <Filter className="w-4 h-4 text-gold-600" />
                Refine
              </span>
              <button
                onClick={resetFilters}
                className="text-[10px] font-mono text-brand-500 hover:text-brand-950 flex items-center gap-1.5 transition-all duration-200 hover:bg-brand-100/50 px-2 py-1 rounded-lg"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2.5">
              <p className="text-[10px] font-mono uppercase tracking-wider text-brand-500 font-semibold">Archival Type</p>
              <div className="flex flex-col gap-1">
                {['All', 'Single Origin', 'Signature Blends'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter('category', cat)}
                    className={`flex items-center justify-between text-left py-2 px-3 rounded-xl text-xs font-sans transition-all duration-200 ${
                      filters.category === cat
                        ? 'bg-brand-950 text-white shadow-md'
                        : 'text-brand-700 hover:text-brand-950 hover:bg-white/70'
                    }`}
                  >
                    <span>{cat}</span>
                    {filters.category === cat && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Origin Filter */}
            <div className="space-y-2.5">
              <p className="text-[10px] font-mono uppercase tracking-wider text-brand-500 font-semibold">Plantation Origin</p>
              <div className="flex flex-col gap-1">
                {['All', ...availableOrigins].map((origin) => (
                  <button
                    key={origin}
                    onClick={() => setFilter('origin', origin)}
                    className={`flex items-center justify-between text-left py-2 px-3 rounded-xl text-xs font-sans transition-all duration-200 ${
                      filters.origin === origin
                        ? 'bg-brand-950 text-white shadow-md'
                        : 'text-brand-700 hover:text-brand-950 hover:bg-white/70'
                    }`}
                  >
                    <span>{origin}</span>
                    {filters.origin === origin && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Heat Level Filter */}
            <div className="space-y-2.5">
              <p className="text-[10px] font-mono uppercase tracking-wider text-brand-500 font-semibold">Spiciness</p>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'None', 'Mild', 'Medium', 'Hot'].map((heat) => (
                  <button
                    key={heat}
                    onClick={() => setFilter('heatLevel', heat)}
                    className={`px-3 py-1.5 text-[10px] rounded-xl transition-all duration-200 font-mono tracking-wider uppercase ${
                      filters.heatLevel === heat
                        ? 'bg-brand-950 text-white shadow-md'
                        : 'bg-white/50 text-brand-700 hover:bg-white/80 border border-brand-200/40'
                    }`}
                  >
                    {heat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-brand-500 uppercase tracking-wider font-semibold">Max Price</span>
                <span className="text-brand-950 font-bold bg-gold-100/60 px-2.5 py-0.5 rounded-lg border border-gold-200/50">₹{filters.priceRange}</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                step="20"
                value={filters.priceRange}
                onChange={(e) => setFilter('priceRange', Number(e.target.value))}
                className="w-full h-1.5 bg-brand-200/50 rounded-lg appearance-none cursor-pointer accent-brand-950 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-brand-400">
                <span>₹100</span>
                <span>₹500</span>
              </div>
            </div>

            {/* Footnote */}
            <div className="p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/50 flex items-start gap-2.5">
              <Compass className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-brand-600 leading-relaxed font-sans">
                Each shipment contains a printed verification document mapping the precise harvest date, elevation, and batch grower coordinates.
              </p>
            </div>
          </motion.aside>

          {/* RIGHT: Grid & Sort */}
          <main className="lg:col-span-9 space-y-8">
            
            {/* Sorting Row - Glassmorphism */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center backdrop-blur-xl bg-white/60 p-4 rounded-2xl border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)] gap-4"
            >
              <span className="text-xs font-mono text-brand-600">
                Showing <strong className="text-brand-950">{displayedProducts.length}</strong> of <strong className="text-brand-950">{sortedAndFilteredProducts.length}</strong> artifacts
              </span>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-brand-400 uppercase tracking-wider">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/70 backdrop-blur-sm border border-brand-200/50 text-brand-850 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition"
                >
                  <option value="heritage">Heritage Selection</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Specialist Rating</option>
                </select>
              </div>
            </motion.div>

            {/* Grid listings */}
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedProducts.map((p, index) => {
                  const isWishlisted = wishlist.includes(p.id);
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                      whileHover={{ y: -6 }}
                      className="group relative backdrop-blur-xl bg-white/65 rounded-3xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-shadow duration-500 flex flex-col h-full overflow-hidden"
                    >
                      {/* Tag badge */}
                      {p.tag && (
                        <span className="absolute top-5 left-5 z-20 backdrop-blur-md bg-brand-950/80 text-gold-400 text-[9px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-xl border border-gold-600/20 font-semibold shadow-lg">
                          {p.tag}
                        </span>
                      )}

                      {/* Heart icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(p);
                        }}
                        className="absolute top-5 right-5 z-20 p-2.5 rounded-2xl backdrop-blur-md bg-white/60 hover:bg-white/90 border border-white/50 shadow-lg hover:scale-110 transition-all duration-300"
                        aria-label="Save To Archive"
                      >
                        <Heart className={`w-4 h-4 transition-colors duration-200 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-brand-500'}`} />
                      </button>

                      {/* Top image layout */}
                      <div
                        onClick={() => handleProductClick(p.id)}
                        className="aspect-[4/3] overflow-hidden cursor-pointer relative"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Glass info panel */}
                      <div className="p-6 flex-1 flex flex-col justify-between text-left relative">
                        {/* Subtle top decoration line */}
                        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
                        
                        <div className="space-y-3">
                          {/* Origin + Category */}
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono tracking-wider uppercase text-gold-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {p.origin.split(',')[0]}
                            </span>
                            <span className="text-[9px] font-mono tracking-wider uppercase backdrop-blur-sm bg-brand-100/50 text-brand-600 px-2 py-0.5 rounded-lg">{p.category === 'Single Origin' ? 'Single' : 'Blend'}</span>
                          </div>

                          <h3
                            onClick={() => handleProductClick(p.id)}
                            className="font-serif text-xl font-bold text-brand-950 hover:text-gold-600 transition-colors cursor-pointer leading-tight"
                          >
                            {p.title}
                          </h3>
                          <p className="text-xs text-brand-500 line-clamp-2 leading-relaxed font-sans">
                            {p.description}
                          </p>

                          {/* Ratings + Heat */}
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-1 text-xs font-bold backdrop-blur-sm bg-gold-50/80 text-gold-600 px-2.5 py-1 rounded-xl border border-gold-200/50">
                              <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                              {p.rating}
                            </div>
                            <span className="text-[10px] font-mono text-brand-400">({p.reviewsCount})</span>
                            {p.heatLevel !== 'None' && (
                              <span className={`text-[10px] font-mono flex items-center gap-1 ${heatColorMap[p.heatLevel]}`}>
                                <Flame className="w-3 h-3" />
                                {p.heatLevel}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Bottom pricing + CTA */}
                        <div className="flex items-center justify-between pt-5 mt-5 border-t border-brand-200/30">
                          <div>
                            <span className="text-[9px] font-mono text-brand-400 uppercase tracking-widest block">From</span>
                            <span className="font-serif text-lg font-bold text-brand-950">₹{p.price}<span className="text-[10px] text-brand-400 font-sans font-normal ml-1">/ {p.weightOptions[0]}</span></span>
                          </div>
                          
                          <button
                            onClick={() => handleProductClick(p.id)}
                            className="group/btn flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-brand-950 hover:bg-gold-600 text-brand-50 hover:text-brand-950 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            View
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="backdrop-blur-xl bg-white/50 border border-white/40 rounded-3xl py-16 px-6 text-center space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
              >
                <Compass className="w-12 h-12 text-brand-300 mx-auto animate-pulse" />
                <h4 className="font-serif text-2xl font-bold text-brand-950">No catalog matching criteria</h4>
                <p className="text-sm font-sans text-brand-500 max-w-sm mx-auto">
                  Adjust your origin, category type filters, or price slider markers to restore active items.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-brand-950 text-white text-xs font-mono uppercase tracking-widest rounded-full transition hover:bg-brand-900 shadow-lg"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}

            {/* Bottom Load More */}
            {sortedAndFilteredProducts.length > visibleCount && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center pt-6 pb-12"
              >
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  id="shop-load-more"
                  className="px-8 py-3.5 backdrop-blur-xl bg-white/60 border border-white/50 hover:bg-white/80 text-xs font-mono tracking-widest text-brand-850 hover:text-brand-950 uppercase rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] inline-flex items-center gap-3 disabled:opacity-75"
                >
                  {loadingMore ? (
                    <>
                      <div className="w-4 h-4 border-2 border-brand-950 border-t-transparent rounded-full animate-spin"></div>
                      Reviewing Archives...
                    </>
                  ) : (
                    'Review Expanded Catalog'
                  )}
                </button>
              </motion.div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};
