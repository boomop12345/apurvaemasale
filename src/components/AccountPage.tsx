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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: 'profile' | 'orders' | 'wishlist') => {
    setActiveSubTab(tab);
    setMobileMenuOpen(false);
  };

  const sidebarContent = (
    <>
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
          onClick={() => handleTabChange('profile')}
          className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl ${
            activeSubTab === 'profile'
              ? 'bg-brand-950 text-white font-bold shadow-md'
              : 'hover:bg-white/60 hover:text-brand-950'
          }`}
        >
          <User className="w-4 h-4" />
          My Profile
        </button>
        <button
          onClick={() => handleTabChange('orders')}
          className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl relative ${
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
          onClick={() => handleTabChange('wishlist')}
          className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl ${
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
          onClick={() => { setCurrentPage('cart'); setMobileMenuOpen(false); }}
          className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl hover:bg-white/60 hover:text-brand-950 relative"
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
    </>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-150 via-brand-55 to-gold-50" />
      </div>

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-brand-950/40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        {/* Drawer */}
        <motion.div 
          className="absolute left-0 top-0 bottom-0 w-[280px] bg-white/95 backdrop-blur-xl border-r border-brand-100 p-6 space-y-6 shadow-2xl overflow-y-auto"
          initial={false}
          animate={{ x: mobileMenuOpen ? 0 : -300 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        >
          {/* Close button */}
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-50 text-brand-600 transition"
            aria-label="Close menu"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          {sidebarContent}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile menu toggle */}
        <div className="lg:hidden mb-4 flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-950 text-white text-sm font-mono tracking-wider uppercase shadow-md hover:bg-brand-900 transition"
          >
            <User className="w-4 h-4" />
            Menu
          </button>
          <span className="text-xs font-mono tracking-widest uppercase text-brand-400">
            {activeSubTab === 'profile' ? 'My Profile' : activeSubTab === 'orders' ? 'My Orders' : 'Wishlist'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Sidebar (desktop only) */}
          <aside
            className="hidden lg:block lg:col-span-3 min-w-0 backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] space-y-6 text-left"
          >
            {sidebarContent}
          </aside>

          {/* RIGHT: Content */}
          <div
            className="lg:col-span-9 min-w-0 backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl p-6 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] text-left min-h-[500px]"
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
                <div className="pb-4 border-b border-brand-200/40 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-brand-950">My Orders</h3>
                    <p className="text-xs text-brand-500 font-sans mt-1">Track your bookings and pickup status</p>
                  </div>
                  {orders.length > 0 && (
                    <span className="text-[10px] font-mono tracking-widest uppercase text-brand-400">
                      {orders.length} order{orders.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-5">
                    {orders.map((order) => {
                      const statusColor = 
                        order.status === 'Picked Up' ? 'emerald' :
                        order.status === 'Ready for Pickup' ? 'blue' :
                        order.status === 'Booked' ? 'amber' : 'rose';
                      
                      return (
                        <div 
                          key={order.id} 
                          className={`border border-brand-200/40 bg-white/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-l-${statusColor}-400`}
                        >
                          {/* Order Header */}
                          <div className="px-5 pt-5 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-xl bg-${statusColor}-50 flex items-center justify-center`}>
                                {order.status === 'Picked Up' && <CheckCircle className={`w-4.5 h-4.5 text-emerald-600`} />}
                                {order.status === 'Ready for Pickup' && <Store className={`w-4.5 h-4.5 text-blue-600`} />}
                                {order.status === 'Booked' && <Clock className={`w-4.5 h-4.5 text-amber-600`} />}
                                {order.status === 'Cancelled' && <ShoppingBag className={`w-4.5 h-4.5 text-rose-600`} />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-bold text-brand-950">{order.id}</span>
                                  <span className={`inline-flex items-center gap-1 bg-${statusColor}-50 text-${statusColor}-700 font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded-md border border-${statusColor}-100`}>
                                    {order.status}
                                  </span>
                                </div>
                                <p className="text-[10px] font-sans text-brand-400 mt-0.5">{order.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-serif text-lg font-bold text-brand-950">₹{order.total.toLocaleString()}</p>
                              <p className="text-[10px] font-mono text-brand-400 flex items-center gap-1 justify-end">
                                {order.fulfillment === 'Pickup' ? (
                                  <><Store className="w-3 h-3" /> Store Pickup</>
                                ) : (
                                  <><Truck className="w-3 h-3" /> Delivery Requested</>
                                )}
                              </p>
                            </div>
                          </div>

                          {/* Items */}
                          <div className="px-5 pb-4">
                            <div className="bg-brand-50/40 rounded-xl p-3 divide-y divide-brand-200/20">
                              {order.items.map((it) => (
                                <div key={`${it.product.id}-${it.selectedWeight}`} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-3 min-w-0">
                                    <img
                                      src={it.product.images[0]}
                                      alt={it.product.title}
                                      className="w-14 h-14 object-cover rounded-xl border border-brand-100/60 cursor-pointer hover:scale-105 transition-transform flex-shrink-0"
                                      onClick={() => handleProductSelect(it.product.id)}
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="min-w-0">
                                      <h5
                                        onClick={() => handleProductSelect(it.product.id)}
                                        className="font-serif text-sm font-bold text-brand-950 hover:text-gold-600 transition cursor-pointer truncate"
                                      >
                                        {it.product.title}
                                      </h5>
                                      <p className="text-[10px] font-mono text-brand-400 mt-0.5">
                                        {it.selectedWeight} • Qty: {it.quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="font-serif text-sm font-bold text-brand-900 flex-shrink-0">
                                    ₹{(it.priceAtSelection * it.quantity).toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Footer with estimated date */}
                          {order.estimatedReady && (
                            <div className="px-5 py-3 bg-brand-50/30 border-t border-brand-200/20 flex items-center justify-between">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-400">
                                {order.status === 'Picked Up' ? 'Completed' : 'Est. Ready'}
                              </span>
                              <span className="text-xs font-mono font-bold text-brand-700">
                                {order.estimatedReady}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-5">
                      <ShoppingBag className="w-10 h-10 text-brand-250" />
                    </div>
                    <p className="font-serif text-lg text-brand-700 mb-1">No orders yet</p>
                    <p className="text-xs text-brand-400 font-sans mb-5">Your order history will appear here once you place your first booking.</p>
                    <button
                      onClick={() => setCurrentPage('shop')}
                      className="px-8 py-3 bg-brand-950 text-white rounded-full text-xs font-mono uppercase tracking-widest hover:bg-brand-900 transition shadow-md"
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

          </div>
        </div>
      </div>
    </div>
  );
};
