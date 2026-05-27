import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data';
import { Star, Shield, HelpCircle, Truck, RefreshCw, ChevronDown, ChevronUp, MapPin, Heart, Sparkles, Check } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    setCurrentPage,
    toggleWishlist,
    wishlist,
    getWeightPrice
  } = useApp();

  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  }, [selectedProductId]);

  const [activeImage, setActiveImage] = useState<string>(product.images[0]);
  const [selectedWeight, setSelectedWeight] = useState<string>(product.weightOptions[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedMessage, setAddedMessage] = useState<boolean>(false);
  
  // Accordion active flags
  const [openSection, setOpenSection] = useState<'provenance' | 'usage' | 'shipping' | null>('provenance');

  // Sync active image when selected product changes
  React.useEffect(() => {
    setActiveImage(product.images[0]);
    setSelectedWeight(product.weightOptions[0]);
    setQuantity(1);
    setAddedMessage(false);
  }, [product]);

  const displayedPrice = useMemo(() => {
    return getWeightPrice(product, selectedWeight);
  }, [product, selectedWeight, getWeightPrice]);

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedWeight);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedWeight);
    setCurrentPage('checkout');
  };

  const toggleSection = (section: 'provenance' | 'usage' | 'shipping') => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-brand-50/30 min-h-screen py-10 md:py-16">
      
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-left">
        <ul className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase text-brand-500 tracking-wider">
          <li>
            <button onClick={() => setCurrentPage('home')} className="hover:text-brand-950 transition">Home</button>
          </li>
          <li className="select-none">/</li>
          <li>
            <button onClick={() => setCurrentPage('shop')} className="hover:text-brand-950 transition">Shop Catalog</button>
          </li>
          <li className="select-none">/</li>
          <li>
            <span className="text-brand-400 capitalize">{product.category}</span>
          </li>
          <li className="select-none">/</li>
          <li className="text-brand-950 font-bold">{product.title}</li>
        </ul>
      </nav>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Multi Image Gallery Visuals */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Primary Big Frame */}
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-brand-100 bg-white shadow-md relative">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              {product.tag && (
                <div className="absolute top-4 left-4 bg-brand-950 border border-gold-600/30 text-gold-400 text-[10px] font-mono uppercase tracking-widest py-1 px-3 rounded shadow">
                  {product.tag}
                </div>
              )}
            </div>

            {/* Sub-thumbnails (dynamically maps images) */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border transition duration-200 ${
                    activeImage === imgUrl ? 'border-gold-600 scale-[0.98]' : 'border-brand-200 hover:border-brand-400'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.title} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-2 py-4 bg-white/60 border border-brand-100 rounded-2xl text-center">
              <div className="space-y-1">
                <Shield className="w-5 h-5 text-gold-600 mx-auto" />
                <p className="text-[10px] font-mono uppercase tracking-wider text-brand-950 font-bold">100% Secure</p>
                <p className="text-[9px] text-brand-400 font-sans">Lab Certified Pure</p>
              </div>
              <div className="space-y-1 border-x border-brand-100">
                <Truck className="w-5 h-5 text-gold-600 mx-auto" />
                <p className="text-[10px] font-mono uppercase tracking-wider text-brand-950 font-bold">Fast Ingress</p>
                <p className="text-[9px] text-brand-400 font-sans">Free Above ₹300</p>
              </div>
              <div className="space-y-1">
                <RefreshCw className="w-5 h-5 text-gold-600 mx-auto" />
                <p className="text-[10px] font-mono uppercase tracking-wider text-brand-950 font-bold">Origin Trace</p>
                <p className="text-[9px] text-brand-400 font-sans">Verifiable Batch ID</p>
              </div>
            </div>

          </div>

          {/* RIGHT: High-Information Panels */}
          <div className="lg:col-span-6 space-y-8 text-left bg-white p-6 sm:p-10 rounded-3xl border border-brand-100">
            
            {/* Header section info */}
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-4">
                <span className="text-xs font-mono text-gold-600 tracking-widest uppercase font-bold bg-brand-50 border border-brand-100 px-3 py-1 rounded">
                  {product.origin}
                </span>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-2.5 rounded-full border border-brand-100 hover:border-gold-500 hover:bg-brand-50 text-brand-800 transition duration-200"
                  aria-label="Add to private archive"
                >
                  <Heart className={`w-4 h-4 transition-transform duration-300 ${isWishlisted ? 'fill-red-500 text-red-500 scale-110' : 'text-brand-500 hover:scale-105'}`} />
                </button>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950 leading-tight">
                {product.title}
              </h3>
              <p className="text-sm font-sans font-medium text-brand-500">{product.subtitle}</p>

              {/* Stars rating panel */}
              <div className="flex items-center gap-3.5 pt-1">
                <div className="flex items-center text-xs text-gold-600 font-bold bg-gold-50 px-2.5 py-1 rounded border border-gold-25">
                  <Star className="w-3.5 h-3.5 fill-gold-600 text-gold-600 mr-1 shrink-0" />
                  {product.rating} / 5.00
                </div>
                <span className="text-xs font-mono text-brand-400">Archived from {product.reviewsCount} verified connoisseurs</span>
              </div>
            </div>

            {/* Core botanical description */}
            <div className="space-y-4 pt-4 border-t border-brand-100/60">
              <p className="text-sm text-brand-700 leading-relaxed font-sans">
                {product.longDescription}
              </p>
              
              <div className="grid grid-cols-2 gap-4 bg-brand-50 py-3 px-4 rounded-xl border border-brand-100">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono text-brand-400 block">Estate Curators</span>
                  <span className="text-xs font-serif font-bold text-brand-950">{product.provenance.grower}</span>
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono text-brand-400 block">Botanical Heat</span>
                  <span className="text-xs font-mono font-bold text-brand-950">{product.heatLevel} Level</span>
                </div>
              </div>
            </div>

            {/* Weight Choices block */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] uppercase tracking-wider font-mono text-brand-400 block">Acquisition Weight Target</span>
              <div className="flex flex-wrap gap-3">
                {product.weightOptions.map((wtOption) => {
                  const itemWtPrice = getWeightPrice(product, wtOption);
                  return (
                    <button
                      key={wtOption}
                      onClick={() => { setSelectedWeight(wtOption); setAddedMessage(false); }}
                      className={`flex-1 min-w-[80px] p-3 rounded-xl border-2 transition text-left ${
                        selectedWeight === wtOption
                          ? 'border-brand-950 bg-brand-950 text-white shadow-md'
                          : 'border-brand-200 bg-white hover:border-brand-400 text-brand-800'
                      }`}
                    >
                      <span className="block text-xs font-mono uppercase tracking-widest">{wtOption}</span>
                      <span className={`block font-serif font-bold text-sm mt-1 whitespace-nowrap ${selectedWeight === wtOption ? 'text-gold-400' : 'text-brand-950'}`}>
                        ₹{itemWtPrice}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Increment quantities and Add box */}
            <div className="pt-4 border-y border-brand-100/60 pb-6 space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="space-y-1.5 flex flex-col items-start">
                  <span className="text-[10px] font-mono uppercase text-brand-400">Lot Units</span>
                  <div className="flex items-center border border-brand-250 bg-white rounded-full overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-4 py-2 hover:bg-brand-50 text-brand-800 active:scale-95 duration-100 font-mono text-base font-bold"
                      aria-label="Decrease Units"
                    >
                      -
                    </button>
                    <span className="px-5 text-sm font-mono font-bold text-brand-950">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-4 py-2 hover:bg-brand-50 text-brand-800 active:scale-95 duration-100 font-mono text-base font-bold"
                      aria-label="Increase Units"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-brand-400 block uppercase">Archival Transaction Cost</span>
                  <span className="text-2xl font-serif font-bold text-brand-950">₹{(displayedPrice * quantity).toLocaleString()}</span>
                </div>
              </div>

              {/* Add and Buy Now row */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  id="det-add-to-bag"
                  className="flex-1 py-4 bg-brand-50 text-brand-950 border border-brand-950 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-brand-100 active:scale-98 transition duration-200"
                >
                  Add To Heritage Bag
                </button>
                <button
                  onClick={handleBuyNow}
                  id="det-buy-now"
                  className="flex-1 py-4 bg-brand-950 text-brand-50 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-brand-900 active:scale-98 transition duration-300 shadow"
                >
                  Acquire Instantly
                </button>
              </div>

              {/* Toast response message */}
              {addedMessage && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-250 flex items-center justify-center gap-2 animate-fade-in text-xs font-sans">
                  <Check className="w-4 h-4 text-emerald-800 shrink-0" />
                  Successfully archived {quantity}x {product.title} ({selectedWeight}) into your shopping heritage bag.
                </div>
              )}
            </div>

            {/* EXPANDABLE ACCORDIONS */}
            <div className="space-y-3">
              
              {/* Provenance Accordion */}
              <div className="border border-brand-100 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleSection('provenance')}
                  className="w-full flex items-center justify-between p-4 text-left font-serif font-bold text-brand-950 text-sm hover:bg-brand-50 transition"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-600" />
                    Provenance & Botany Registry
                  </span>
                  {openSection === 'provenance' ? <ChevronUp className="w-4 h-4 text-brand-500" /> : <ChevronDown className="w-4 h-4 text-brand-500" />}
                </button>
                {openSection === 'provenance' && (
                  <div className="p-4 bg-brand-50 border-t border-brand-100 text-xs font-sans text-brand-700 space-y-3">
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                      <div>
                        <span className="text-[9px] font-mono uppercase text-brand-400">Cooperative Farmer</span>
                        <p className="font-medium text-brand-950">{product.provenance.grower}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase text-brand-400">Altitude Matrix</span>
                        <p className="font-medium text-brand-950">{product.provenance.altitude}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase text-brand-400">Plucking Window</span>
                        <p className="font-medium text-brand-950">{product.provenance.harvest}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase text-brand-400">Soil/Processing Method</span>
                        <p className="font-medium text-brand-950">{product.provenance.process}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Usage & Prep Accordion */}
              <div className="border border-brand-100 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleSection('usage')}
                  className="w-full flex items-center justify-between p-4 text-left font-serif font-bold text-brand-950 text-sm hover:bg-brand-50 transition"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-600" />
                    Gastronomy & Protection Guidance
                  </span>
                  {openSection === 'usage' ? <ChevronUp className="w-4 h-4 text-brand-500" /> : <ChevronDown className="w-4 h-4 text-brand-500" />}
                </button>
                {openSection === 'usage' && (
                  <div className="p-4 bg-brand-50 border-t border-brand-100 text-xs font-sans text-brand-700 space-y-3">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-brand-400 block">Volatile Aroma Registry</span>
                      <p className="font-medium text-brand-950">{product.usageStorage.aroma}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-brand-400 block">Culinary Parings</span>
                      <p className="font-medium text-brand-950">{product.usageStorage.pairing}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-brand-400 block">Protective Storage</span>
                      <p className="font-medium text-brand-950">{product.usageStorage.storage}</p>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
