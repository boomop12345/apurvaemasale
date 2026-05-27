import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { User, ShoppingBag, LogOut, CheckCircle, Clock, Store, ChevronRight, Sparkles, Heart, Truck, ArrowRight, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../data';

export const AccountPage: React.FC = () => {
  const {
    user,
    updateUser,
    orders,
    setCurrentPage,
    setSelectedProductId,
    wishlist,
    currentPage,
    cartCount
  } = useApp();

  // If navigated from 'wishlist' route, default to wishlist tab
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'orders' | 'wishlist'>(
    currentPage === 'wishlist' ? 'wishlist' : 'profile'
  );

  // Sync when currentPage changes
  useEffect(() => {
    if (currentPage === 'wishlist') {
      setActiveSubTab('wishlist');
    }
  }, [currentPage]);

  const [profileName, setProfileName] = useState<string>(user.name);
  const [profileEmail, setProfileEmail] = useState<string>(user.email);
  const [profilePhone, setProfilePhone] = useState<string>(user.phone);
  const [updateSaved, setUpdateSaved] = useState<boolean>(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: profileName,
      email: profileEmail,
      phone: profilePhone
    });
    setUpdateSaved(true);
    setTimeout(() => setUpdateSaved(false), 2000);
  };

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('detail');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-150 via-brand-55 to-gold-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] space-y-6 text-left sticky top-28"
          >
            {/* Profile Display */}
            <div className="space-y-3 pb-5 border-b border-brand-200/40 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-800 to-brand-950 text-white flex items-center justify-center font-bold font-serif text-2xl shadow-lg">
                {user.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-serif font-bold text-brand-950 text-lg leading-tight">{user.name}</h3>
                <p className="text-[10px] font-mono tracking-widest text-gold-600 uppercase mt-1">Heritage Member</p>
                <p className="text-xs text-brand-400 mt-1 font-sans">{user.email}</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1 text-sm font-sans text-brand-600">
              <button
                onClick={() => setActiveSubTab('profile')}
                className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl transition-all duration-200 ${
                  activeSubTab === 'profile'
                    ? 'bg-brand-950 text-white font-bold shadow-md'
                    : 'hover:bg-white/60 hover:text-brand-950'
                }`}
              >
                <User className="w-4 h-4" />
                My Profile
              </button>
              <button
                onClick={() => setActiveSubTab('orders')}
                className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl transition-all duration-200 relative ${
                  activeSubTab === 'orders'
                    ? 'bg-brand-950 text-white font-bold shadow-md'
                    : 'hover:bg-white/60 hover:text-brand-950'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                My Orders
                {orders.length > 0 && (
                  <span className={`ml-auto text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    activeSubTab === 'orders' ? 'bg-gold-500 text-brand-950' : 'bg-brand-100 text-brand-700'
                  }`}>
                    {orders.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveSubTab('wishlist')}
                className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl transition-all duration-200 ${
                  activeSubTab === 'wishlist'
                    ? 'bg-brand-950 text-white font-bold shadow-md'
                    : 'hover:bg-white/60 hover:text-brand-950'
                }`}
              >
                <Heart className="w-4 h-4" />
                Wishlist
                {wishlist.length > 0 && (
                  <span className={`ml-auto text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    activeSubTab === 'wishlist' ? 'bg-gold-500 text-brand-950' : 'bg-brand-100 text-brand-700'
                  }`}>
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrentPage('cart')}
                className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl transition-all duration-200 hover:bg-white/60 hover:text-brand-950 relative"
              >
                <ShoppingCart className="w-4 h-4" />
                My Bag
                {cartCount > 0 && (
                  <span className="ml-auto text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-brand-100 text-brand-700">
                    {cartCount}
                  </span>
                )}
              </button>
            </nav>

            <button
              onClick={() => {
                alert('Signed out successfully.');
                setCurrentPage('home');
              }}
              className="w-full flex items-center gap-3 py-2.5 px-3.5 text-rose-600 hover:bg-rose-50/60 rounded-xl transition text-sm font-sans border border-rose-100/60"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </motion.aside>

          {/* RIGHT: Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-9 backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl p-6 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] text-left min-h-[500px]"
          >
            
            {/* PROFILE TAB */}
            {activeSubTab === 'profile' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-brand-200/40">
                  <h3 className="font-serif text-2xl font-bold text-brand-950">My Profile</h3>
                  <p className="text-xs text-brand-500 font-sans mt-1">Manage your personal information</p>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-5 max-w-lg">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-mono text-brand-500 block font-semibold">Full Name</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-white/80 border border-brand-200/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-mono text-brand-500 block font-semibold">Email</label>
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full bg-white/80 border border-brand-200/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-mono text-brand-500 block font-semibold">Phone</label>
                      <input
                        type="tel"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="w-full bg-white/80 border border-brand-200/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex items-center gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-brand-950 hover:bg-brand-900 text-white font-mono text-xs uppercase tracking-widest rounded-full transition shadow-md"
                    >
                      Save Changes
                    </button>
                    {updateSaved && (
                      <p className="text-xs text-emerald-700 font-sans font-medium flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Saved!
                      </p>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeSubTab === 'orders' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-brand-200/40">
                  <h3 className="font-serif text-2xl font-bold text-brand-950">My Orders</h3>
                  <p className="text-xs text-brand-500 font-sans mt-1">Track your bookings and pickup status</p>
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-5">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-brand-200/40 bg-white/40 rounded-2xl p-5 space-y-4">
                        {/* Order header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-200/30 pb-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-mono text-xs font-bold text-brand-950 bg-white/80 px-2.5 py-1 rounded-lg border border-brand-200/40">
                              {order.id}
                            </span>
                            <span className="text-xs text-brand-400 font-sans">{order.date}</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {order.status === 'Picked Up' && (
                              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg border border-emerald-100">
                                <CheckCircle className="w-3.5 h-3.5" />
                                Picked Up
                              </span>
                            )}
                            {order.status === 'Ready for Pickup' && (
                              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg border border-blue-100">
                                <Store className="w-3.5 h-3.5" />
                                Ready for Pickup
                              </span>
                            )}
                            {order.status === 'Booked' && (
                              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg border border-amber-100 animate-pulse">
                                <Clock className="w-3.5 h-3.5" />
                                Preparing
                              </span>
                            )}
                            {order.status === 'Cancelled' && (
                              <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-800 font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg border border-rose-100">
                                Cancelled
                              </span>
                            )}
                            <span className="text-sm font-serif font-bold text-brand-950">₹{order.total.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="divide-y divide-brand-200/20">
                          {order.items.map((it) => (
                            <div key={`${it.product.id}-${it.selectedWeight}`} className="py-2.5 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={it.product.images[0]}
                                  alt={it.product.title}
                                  className="w-10 h-10 object-cover rounded-lg border border-brand-100/60 cursor-pointer"
                                  onClick={() => handleProductSelect(it.product.id)}
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <h5
                                    onClick={() => handleProductSelect(it.product.id)}
                                    className="font-serif text-sm font-bold text-brand-950 hover:text-gold-600 transition cursor-pointer"
                                  >
                                    {it.product.title}
                                  </h5>
                                  <p className="text-[10px] font-mono text-brand-400">
                                    {it.selectedWeight} • Qty: {it.quantity}
                                  </p>
                                </div>
                              </div>
                              <span className="font-serif text-xs font-bold text-brand-900">
                                ₹{(it.priceAtSelection * it.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="pt-3 border-t border-brand-200/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            {order.fulfillment === 'Pickup' ? (
                              <span className="text-brand-500 font-sans flex items-center gap-1">
                                <Store className="w-3.5 h-3.5 text-brand-400" />
                                Store Pickup
                              </span>
                            ) : (
                              <span className="text-brand-500 font-sans flex items-center gap-1">
                                <Truck className="w-3.5 h-3.5 text-brand-400" />
                                Delivery Requested
                              </span>
                            )}
                          </div>
                          {order.bookingContact && (
                            <span className="font-mono text-[10px] text-brand-400">
                              Contact: {order.bookingContact.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-brand-250 mx-auto mb-4" />
                    <p className="text-sm text-brand-500 font-sans">You haven't placed any orders yet.</p>
                    <button
                      onClick={() => setCurrentPage('shop')}
                      className="mt-4 px-6 py-2.5 bg-brand-950 text-white rounded-full text-xs font-mono uppercase tracking-widest"
                    >
                      Browse Catalog
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeSubTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-brand-200/40">
                  <h3 className="font-serif text-2xl font-bold text-brand-950">My Wishlist</h3>
                  <p className="text-xs text-brand-500 font-sans mt-1">Items you've saved for later</p>
                </div>

                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PRODUCTS.filter((p) => wishlist.includes(p.id)).map((p) => (
                      <div key={p.id} className="p-4 bg-white/50 rounded-2xl border border-brand-200/30 flex gap-4 items-center justify-between group hover:shadow-md transition-all duration-200">
                        <div className="flex gap-4 items-center min-w-0">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-16 h-16 object-cover rounded-xl border border-brand-100/60 cursor-pointer group-hover:scale-105 transition-transform"
                            onClick={() => handleProductSelect(p.id)}
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h4
                              onClick={() => handleProductSelect(p.id)}
                              className="font-serif font-bold text-brand-950 text-sm hover:text-gold-600 transition truncate cursor-pointer"
                            >
                              {p.title}
                            </h4>
                            <p className="text-[10px] font-mono text-gold-600 mt-0.5 truncate">{p.origin.split(',')[0]}</p>
                            <span className="text-sm font-serif font-bold text-brand-950 mt-1 block">₹{p.price}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleProductSelect(p.id)}
                          className="px-3 py-2 bg-brand-950 text-white rounded-xl text-[10px] font-mono uppercase hover:bg-gold-600 hover:text-brand-950 transition flex items-center gap-1 shrink-0"
                        >
                          View
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-brand-250 mx-auto mb-4" />
                    <p className="text-sm text-brand-500 font-sans">Your wishlist is empty.</p>
                    <p className="text-xs text-brand-400 font-sans mt-1">Click the heart icon on any product to save it here.</p>
                    <button
                      onClick={() => setCurrentPage('shop')}
                      className="mt-4 px-6 py-2.5 bg-brand-950 text-white rounded-full text-xs font-mono uppercase tracking-widest"
                    >
                      Browse Catalog
                    </button>
                  </div>
                )}
              </div>
            )}

          </motion.main>
        </div>
      </div>
    </div>
  );
};
