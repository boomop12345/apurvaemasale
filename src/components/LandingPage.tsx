import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data';
import { ArrowRight, MapPin, Sparkles, Anchor, Globe, Scroll, ArrowUpRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentPage, setSelectedProductId, setFilter } = useApp();
  const [activeCurationTab, setActiveCurationTab] = useState<'New In' | 'Signature Blends' | 'Heritage Reserve'>('New In');

  // Filter products according to selected landing curation tab
  const curatedProducts = PRODUCTS.filter(p => {
    if (activeCurationTab === 'New In') return p.tag === 'Limited Crop' || p.tag === 'Fierce Heat' || p.id === 'true-ceylon-cinnamon';
    if (activeCurationTab === 'Signature Blends') return p.category === 'Signature Blends';
    return p.tag === 'Heritage Reserve' || p.id === 'lakadong-turmeric';
  });

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('detail');
  };

  const handleCategorySelect = (category: string) => {
    setFilter('category', category);
    setCurrentPage('shop');
  };

  return (
    <div className="bg-brand-50/50 min-h-screen">
      
      {/* 1. Hero Block: Spices That Tell Stories */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-7xl mx-auto overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-900 px-3.5 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-mono border border-brand-200">
              <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
              Direct Trade • Pure Botanical Estates
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-950 leading-[1.1] tracking-tight">
                Spices That Tell <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-900 via-gold-600 to-brand-800">
                  Heritage Stories
                </span>
              </h2>
              <p className="font-sans text-brand-700 text-base sm:text-lg max-w-xl leading-relaxed">
                At Apurvae Masale, we procure exclusive single-origin crops and custom hand-roasted mixtures that trace back centuries. Hand-plucked, mill-ground, and packed at source.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => {
                  setFilter('category', 'All');
                  setCurrentPage('shop');
                }}
                id="hero-collect-crops"
                className="px-8 py-4 bg-brand-950 hover:bg-brand-900 text-brand-50 text-xs font-mono tracking-widest uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 group"
              >
                Collect Selected Crops
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleProductClick('kashmiri-saffron')}
                id="hero-explore-saffron"
                className="px-8 py-4 bg-white hover:bg-brand-50 text-brand-950 text-xs font-mono tracking-widest uppercase rounded-full border border-brand-200 hover:border-brand-300 shadow-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                Explore Saffron Reserve
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-brand-100">
              <div>
                <p className="font-serif text-2xl font-bold text-brand-950">240+</p>
                <p className="text-[10px] font-mono tracking-wider uppercase text-brand-500 mt-1">Crocin Potency</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-brand-950">1,620m</p>
                <p className="text-[10px] font-mono tracking-wider uppercase text-brand-500 mt-1">Max Elevation</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-brand-950">100%</p>
                <p className="text-[10px] font-mono tracking-wider uppercase text-brand-500 mt-1">Single Origin</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-3xl border border-brand-100 shadow-2xl relative group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGqtKDwaVPhrPOoYcIWyS4_vdEEEal0IXNl9p5v26F8mNpQoHaw5JD8Vxtdt6zsJ2RPMOXhnq1s6BD0QqNB-E2HpeYNGke34zA3N62qtRJ418gb6PMY4sbKyMt72AbjoBAXBLsnd-LQaLfesrwHbHeB3oPgaEJiisrpOjRXaSFyO04a2QlqbH34JfUM9zVdfY6gLCpV9G6ZusTXQua2KDnYoIL9xKy7zHxi1J-O4ZyZyW7mhW0_gbV7ygI9FuCXpi0WvmvS4dMvGM"
                alt="Heritage Spices Curation Setup"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Decorative subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent flex items-end p-8">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gold-400 bg-brand-950/70 px-2.5 py-1 rounded">Visual Record</span>
                  <h3 className="text-white font-serif text-xl sm:text-2xl font-semibold">The Mortar & Pestle Ritual</h3>
                  <p className="text-brand-200 text-xs max-w-sm font-sans">
                    Traditional dry roasting coaxes volatile medicinal oils before manual pulverization.
                  </p>
                </div>
              </div>
            </div>

            {/* Overlapping small decorative coordinate badge */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-brand-100 rounded-2xl p-4 shadow-xl hidden md:flex items-center gap-3 max-w-[240px]">
              <div className="bg-gold-100 p-2.5 rounded-xl">
                <Globe className="w-5 h-5 text-gold-600 animate-spin-slow" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-mono uppercase tracking-widest text-brand-500">Live Archives</p>
                <p className="text-xs font-serif font-bold text-brand-950 truncate">Pampore Glacial Plains</p>
                <p className="text-[10px] font-mono text-brand-400">34.02° N, 74.93° E</p>
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 2. Curation Select Block: New In, Signature Blends, Heritage Resourced */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="px-4 sm:px-6 lg:px-8 py-16 bg-white border-y border-brand-100"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Headers */}
          <div className="text-center space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950 tracking-tight">Curated Masterpieces</h3>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold-600">Pure Batches Hand-Signed by Masters</p>
            
            {/* Smooth Selectors */}
            <div className="flex justify-center pt-4">
              <div className="inline-flex p-1 bg-brand-50 rounded-full border border-brand-100">
                {(['New In', 'Signature Blends', 'Heritage Reserve'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCurationTab(tab)}
                    className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                      activeCurationTab === tab
                        ? 'bg-brand-950 text-brand-50 shadow-md'
                        : 'text-brand-600 hover:text-brand-950 hover:bg-brand-100/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {curatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => handleProductClick(p.id)}
                className="group bg-brand-50/25 rounded-2xl border border-brand-100 hover:border-gold-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-100 border-b border-brand-100">
                  {p.tag && (
                    <span className="absolute top-4 left-4 z-10 bg-brand-950 text-gold-400 text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded border border-gold-600/30 font-semibold shadow-md">
                      {p.tag}
                    </span>
                  )}
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] font-mono text-gold-600 tracking-wider uppercase">{p.origin}</span>
                      <span className="text-xs font-mono text-brand-400">{p.category}</span>
                    </div>
                    <h4 className="font-serif text-xl font-bold text-brand-950 group-hover:text-gold-600 transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-xs text-brand-600 font-sans line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                  
                  {/* Price Actions */}
                  <div className="flex items-center justify-between border-t border-brand-100/60 pt-4 mt-6">
                    <div>
                      <span className="text-[9px] font-mono text-brand-400 uppercase tracking-wider block">Price starts at</span>
                      <span className="font-serif text-base font-bold text-brand-950">₹{p.price} <span className="text-xs text-brand-500 font-sans font-normal">/ {p.weightOptions[0]}</span></span>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-brand-800 flex items-center gap-1 group-hover:text-gold-600 transition-colors">
                      Acquire Selection
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Link */}
          <div className="text-center pt-4">
            <button
              onClick={() => {
                setFilter('category', 'All');
                setCurrentPage('shop');
              }}
              id="curated-explore-all"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-brand-950 hover:text-gold-600 duration-200 border-b border-brand-950 hover:border-gold-600 pb-1 font-semibold"
            >
              Explore Entire Heritage Catalogue
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </motion.section>

      {/* 3. Discover the Heritage: Category Bento Grid Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card Left: Whole Spices */}
          <div
            onClick={() => handleCategorySelect('Single Origin')}
            className="group relative h-[450px] rounded-3xl overflow-hidden border border-brand-100 shadow-xl cursor-pointer flex flex-col justify-end p-8 sm:p-12 transition-all duration-500"
          >
            {/* Image backdrop hotlinked from googleusercontent as instructed */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGqtKDwaVPhrPOoYcIWyS4_vdEEEal0IXNl9p5v26F8mNpQoHaw5JD8Vxtdt6zsJ2RPMOXhnq1s6BD0QqNB-E2HpeYNGke34zA3N62qtRJ418gb6PMY4sbKyMt72AbjoBAXBLsnd-LQaLfesrwHbHeB3oPgaEJiisrpOjRXaSFyO04a2QlqbH34JfUM9zVdfY6gLCpV9G6ZusTXQua2KDnYoIL9xKy7zHxi1J-O4ZyZyW7mhW0_gbV7ygI9FuCXpi0WvmvS4dMvGM"
                alt="Whole Spices"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
            </div>

            <div className="relative z-10 space-y-4 text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 bg-brand-950/60 px-3 py-1 rounded border border-gold-600/20 inline-block">Category Index I</span>
              <h4 className="font-serif text-3xl sm:text-4xl font-bold text-white">Whole Spices</h4>
              <p className="text-brand-200 text-sm max-w-md font-sans leading-relaxed">
                Sun-dried bold berries, delicate pods, and hand-scraped sweet barks sorted meticulously to precise physical size mandates.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold-400 group-hover:text-white duration-200 pt-2">
                Browse Whole Crops
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Card Right: Ground Masalas */}
          <div
            onClick={() => handleCategorySelect('Signature Blends')}
            className="group relative h-[450px] rounded-3xl overflow-hidden border border-brand-100 shadow-xl cursor-pointer flex flex-col justify-end p-8 sm:p-12 transition-all duration-500"
          >
            {/* Image backdrop hotlinked from googleusercontent as instructed */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVM54H-8s9GkE_VeKmaWuFUpkLHS8OHOnMTjBgvFSyE-ulwdjokaB6C6uXNJ7j0gfqmkO65NXx48WwDD6ALC1HA2-Gb8qW0Xbn1CjZtoke-iFTXDvdJk4lLam5UNgmUwOjxKlEb-mkD_iwixg8U_sA_uCucfOAk9ydELex4pOQvSDmT0ZPWlAcFgSYoEBCmjVokDHkBVlP-uvxZceZgh2JLq95SOG-6rs6RCvDS90q1Om7f9B1aX6e1p-C9QcQ70xnLkvKo5gDuYk"
                alt="Ground Masalas"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
            </div>

            <div className="relative z-10 space-y-4 text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 bg-brand-950/60 px-3 py-1 rounded border border-gold-600/20 inline-block">Category Index II</span>
              <h4 className="font-serif text-3xl sm:text-4xl font-bold text-white">Ground Masalas</h4>
              <p className="text-brand-200 text-sm max-w-md font-sans leading-relaxed">
                Low-temperature roasted whole spice formulas, ground stone pulverization, recreating ancient royal palace kitchen dynasties.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold-400 group-hover:text-white duration-200 pt-2">
                Browse Ground Formations
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

        </div>
      </motion.section>



      {/* 5. Clean, Minimalist Footer */}
      <footer className="bg-brand-950 text-brand-100 py-16 border-t border-brand-900 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          
          <div className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-[0.2em] text-white">APURVAE MASALE</h2>
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-500">The Heritage Spice Archivist</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-mono uppercase tracking-widest text-brand-300">
            <button onClick={() => { setFilter('category', 'All'); setCurrentPage('shop'); }} className="hover:text-gold-400 duration-200">Catalog</button>
            <button onClick={() => { setFilter('category', 'Single Origin'); setCurrentPage('shop'); }} className="hover:text-gold-400 duration-200">Single Origin</button>
            <button onClick={() => { setFilter('category', 'Signature Blends'); setCurrentPage('shop'); }} className="hover:text-gold-400 duration-200">Signature Blends</button>
            <button onClick={() => setCurrentPage('account')} className="hover:text-gold-400 duration-200">Archivist Account</button>
            <button onClick={() => setCurrentPage('wishlist')} className="hover:text-gold-400 duration-200">Curated Saved</button>
          </div>

          <div className="border-t border-brand-900 pt-8 max-w-sm mx-auto flex flex-col gap-2">
            <p className="text-[10px] font-mono text-brand-500">
              © 2026 Apurvae Masale. All rights reserved.
            </p>
            <p className="text-[9px] font-mono text-brand-600">
              Sourced directly from certified local biodiversity farmsteads.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};
