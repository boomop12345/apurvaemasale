import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data';
import { Trash2, ShoppingBag, ArrowRight, Sparkles, Store, Star, Minus, Plus } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    setCurrentPage,
    setSelectedProductId
  } = useApp();

  const [promoCode, setPromoCode] = useState<string>('');
  const [promoSuccess, setPromoSuccess] = useState<boolean>(false);
  const [promoError, setPromoError] = useState<boolean>(false);

  const discountCost = useMemo(() => {
    if (promoSuccess) return Math.round(cartSubtotal * 0.15);
    return 0;
  }, [promoSuccess, cartSubtotal]);

  const totalCost = cartSubtotal - discountCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.toUpperCase().trim();
    if (clean === 'HERITAGE15' || clean === 'APURVAE') {
      setPromoSuccess(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoSuccess(false);
    }
  };

  const crossSellItems = useMemo(() => {
    const inCartIds = new Set(cart.map((item) => item.product.id));
    return PRODUCTS.filter((p) => !inCartIds.has(p.id)).slice(0, 3);
  }, [cart]);

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('detail');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-150 via-brand-55 to-gold-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 pb-28 md:pb-20">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2 mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-950">Your Bag</h2>
          <p className="text-xs font-mono uppercase tracking-wider text-brand-500">Review your selections before booking</p>
        </motion.div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Item List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-8 space-y-5"
            >
              <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden divide-y divide-brand-200/30">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedWeight}`}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center justify-between text-left relative"
                  >
                    {/* Mobile Remove Button (Absolute top right) */}
                    <button
                      onClick={() => removeFromCart(item.product, item.selectedWeight)}
                      className="sm:hidden absolute top-4 right-4 p-2 text-brand-400 hover:text-red-500 bg-white/80 rounded-full shadow-sm"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Product info */}
                    <div className="flex gap-3 sm:gap-4 items-center flex-1 min-w-0 w-full">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border border-brand-100/60 cursor-pointer hover:scale-105 transition-transform shrink-0"
                        onClick={() => handleProductSelect(item.product.id)}
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1 pr-10 sm:pr-0">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-gold-600 block mb-0.5 truncate">
                          {item.product.origin.split(',')[0]}
                        </span>
                        <h4
                          onClick={() => handleProductSelect(item.product.id)}
                          className="font-serif text-base sm:text-lg font-bold text-brand-950 hover:text-gold-600 transition truncate cursor-pointer"
                        >
                          {item.product.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-[9px] font-mono bg-brand-100/60 font-bold border border-brand-200/40 text-brand-850 px-2 py-0.5 rounded-lg shrink-0">
                            {item.selectedWeight}
                          </span>
                          <span className="text-[10px] font-mono text-brand-400">₹{item.priceAtSelection} each</span>
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-brand-200/30 sm:border-t-0 gap-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-brand-200/50 bg-white/80 rounded-full overflow-hidden shrink-0">
                        <button
                          onClick={() => updateCartQuantity(item.product, item.selectedWeight, item.quantity - 1)}
                          className="p-1.5 sm:p-2 px-2.5 sm:px-3 hover:bg-brand-50 transition"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5 text-brand-700" />
                        </button>
                        <span className="px-2 sm:px-3 text-xs font-mono font-bold text-brand-950 min-w-[20px] sm:min-w-[24px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product, item.selectedWeight, item.quantity + 1)}
                          className="p-1.5 sm:p-2 px-2.5 sm:px-3 hover:bg-brand-50 transition"
                          aria-label="Increase"
                        >
                          <Plus className="w-3.5 h-3.5 text-brand-700" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right sm:mr-2">
                        <p className="font-serif font-bold text-brand-950 text-base">₹{(item.priceAtSelection * item.quantity).toLocaleString()}</p>
                      </div>

                      {/* Desktop Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product, item.selectedWeight)}
                        className="hidden sm:block p-2 text-brand-400 hover:text-red-500 hover:bg-red-50 rounded-full transition shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pickup info */}
              <div className="p-4 backdrop-blur-xl bg-emerald-50/60 border border-emerald-100/60 rounded-2xl flex items-center gap-3 text-left text-xs text-emerald-800">
                <Store className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>All orders are available for <strong>free store pickup</strong>. You can also request delivery while booking.</span>
              </div>

              {/* Cross-sells */}
              {crossSellItems.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h4 className="font-serif text-lg font-bold text-brand-950 text-left flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-600" />
                    You Might Also Like
                  </h4>
                  <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto no-scrollbar pb-4 sm:overflow-visible sm:pb-0">
                    {crossSellItems.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleProductSelect(p.id)}
                        className="min-w-[220px] sm:min-w-0 shrink-0 backdrop-blur-xl bg-white/60 border border-white/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 text-left cursor-pointer group"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-24 object-cover rounded-xl mb-2"
                          referrerPolicy="no-referrer"
                        />
                        <h5 className="font-serif text-sm font-bold text-brand-950 truncate group-hover:text-gold-600 transition">{p.title}</h5>
                        <span className="text-[10px] font-mono text-gold-600 block uppercase truncate">{p.origin.split(',')[0]}</span>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-brand-200/30">
                          <span className="font-serif font-bold text-xs text-brand-950">₹{p.price}</span>
                          <span className="text-[9px] font-mono uppercase tracking-widest text-brand-500 group-hover:text-gold-600 transition">View</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* RIGHT: Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] sticky top-28 space-y-5">
                <h3 className="font-serif text-xl font-bold text-brand-950 text-left pb-3 border-b border-brand-200/40">Order Summary</h3>
                
                {/* Cost Lines */}
                <div className="space-y-3 text-left text-sm font-sans text-brand-600 border-b border-brand-200/40 pb-5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-brand-950 font-medium">₹{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pickup</span>
                    <span className="text-emerald-700 font-mono text-xs font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Free</span>
                  </div>
                  {promoSuccess && (
                    <div className="flex justify-between text-emerald-800 font-medium bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                      <span>15% Discount</span>
                      <span className="font-bold">-₹{discountCost.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Promo code */}
                <form onSubmit={handleApplyPromo} className="space-y-2 text-left">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-brand-400 block">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. HERITAGE15"
                      className="flex-1 bg-white/80 border border-brand-200/50 rounded-xl px-3 py-2.5 text-xs font-mono uppercase focus:outline-none focus:border-gold-500 placeholder-brand-300 transition"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-brand-950 hover:bg-brand-900 text-white font-mono text-xs uppercase tracking-widest rounded-xl transition"
                    >
                      Apply
                    </button>
                  </div>
                  {promoSuccess && (
                    <p className="text-[10px] text-emerald-800 font-sans font-medium flex items-center gap-1">
                      ✓ 15% discount applied!
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[10px] text-rose-600 font-sans font-medium">
                      ✗ Invalid code. Try 'HERITAGE15' or 'APURVAE'.
                    </p>
                  )}
                </form>

                {/* Total */}
                <div className="border-t border-brand-200/40 pt-4 text-left">
                  <span className="text-[10px] uppercase font-mono text-brand-400 block tracking-wider mb-1">Total</span>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-serif font-bold text-brand-950 leading-none">₹{totalCost.toLocaleString()}</span>
                    <span className="text-[9px] text-brand-500 font-mono font-bold uppercase tracking-widest bg-brand-50 px-2 py-0.5 rounded border border-brand-100 mb-0.5">Pay on pickup</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => setCurrentPage('checkout')}
                    id="cart-proceed-checkout"
                    className="w-full py-4 bg-brand-950 hover:bg-brand-900 text-brand-50 font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-lg flex items-center justify-center gap-2.5 group"
                  >
                    Book Your Order
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => setCurrentPage('shop')}
                    className="w-full py-3 bg-transparent hover:bg-brand-50/50 text-brand-950 text-xs font-mono uppercase tracking-widest border border-brand-200/50 hover:border-brand-300 rounded-full transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="backdrop-blur-xl bg-white/60 border border-white/50 rounded-3xl py-20 px-6 text-center space-y-4 max-w-2xl mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
          >
            <ShoppingBag className="w-14 h-14 text-brand-250 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-brand-950">Your bag is empty</h3>
            <p className="text-sm font-sans text-brand-600 max-w-sm mx-auto leading-relaxed">
              Browse our heritage spice collection and add your favorites to the bag.
            </p>
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-7 py-3 bg-brand-950 hover:bg-brand-900 text-brand-50 text-xs font-mono uppercase tracking-widest rounded-full shadow-lg transition"
            >
              Browse Catalog
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
