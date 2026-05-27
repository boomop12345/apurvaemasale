import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Heart, ShoppingBag, User, Sparkles, Home } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    setCurrentPage, 
    cartCount, 
    wishlist, 
    setIsSearchOverlayOpen 
  } = useApp();

  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // On mobile only: hide header on scroll down, show on scroll up
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-100 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      {/* Top micro-banner */}
      <div className="bg-brand-950 text-brand-100 py-1.5 px-4 text-center text-[10px] tracking-widest uppercase font-mono flex items-center justify-center gap-1.5">
        <Sparkles className="w-3 h-3 text-gold-500 animate-pulse" />
        Order Online • Pickup In Store • Handcrafted Heritage Spices
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Actions: Home & Search */}
          <div className="flex-1 flex justify-start items-center gap-0 sm:gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full hover:bg-brand-50 text-brand-800 transition duration-200 group"
              aria-label="Home"
            >
              <Home className="w-[18px] h-[18px] sm:w-5 sm:h-5 group-hover:scale-105 transition" />
              <span className="hidden lg:inline text-xs font-mono tracking-widest uppercase text-brand-600">Home</span>
            </button>

            <button
              onClick={() => setIsSearchOverlayOpen(true)}
              id="header-search-btn"
              className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full hover:bg-brand-50 text-brand-800 transition duration-200 group"
              aria-label="Search Collection"
            >
              <Search className="w-[18px] h-[18px] sm:w-5 sm:h-5 group-hover:scale-105 transition" />
              <span className="hidden lg:inline text-xs font-mono tracking-widest uppercase text-brand-600">Discover</span>
            </button>
          </div>

          {/* Centered Brand Signature */}
          <div className="flex-shrink-0 text-center flex flex-col items-center px-1 md:px-4 max-w-[50%]">
            <button
              onClick={() => setCurrentPage('home')}
              id="header-logo-btn"
              className="group focus:outline-none flex flex-col items-center justify-center"
            >
              <h1 className="font-serif text-[11px] sm:text-sm md:text-2xl lg:text-3xl font-bold tracking-[0.05em] md:tracking-[0.2em] text-brand-950 transition-colors duration-300 group-hover:text-gold-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                APURVAE MASALE
              </h1>
              <p className="hidden md:block text-[9px] font-mono tracking-[0.3em] uppercase text-gold-500 mt-0.5 group-hover:text-brand-950 transition-colors">
                The Heritage Spice Archivist
              </p>
            </button>
          </div>

          {/* Right Actions: Account, Saved, Bag */}
          <div className="flex-1 flex justify-end items-center gap-0 sm:gap-4">
            
            {/* Account */}
            <button
              onClick={() => setCurrentPage('account')}
              id="header-account-btn"
              className="p-1.5 sm:p-2 rounded-full hover:bg-brand-50 text-brand-800 transition duration-200"
              aria-label="My Account"
            >
              <User className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setCurrentPage('wishlist')}
              id="header-wishlist-btn"
              className="p-1.5 sm:p-2 rounded-full hover:bg-brand-50 text-brand-800 transition duration-200 relative group"
              aria-label="Wishlist Archive"
            >
              <Heart className={`w-[18px] h-[18px] sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold-500 text-brand-950 text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-full border border-white animate-bounce-slow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setCurrentPage('cart')}
              id="header-bag-btn"
              className="p-1.5 sm:p-2 sm:px-3 sm:py-1.5 rounded-full bg-brand-950 hover:bg-brand-900 text-brand-50 flex items-center gap-2 transition duration-300 shadow-sm relative group"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-6 transition-transform" />
              <span className="hidden sm:inline text-xs font-mono tracking-widest uppercase">Bag</span>
              {cartCount > 0 && (
                <span className="bg-gold-500 text-brand-950 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ml-1 sm:ml-0 shadow-inner">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
