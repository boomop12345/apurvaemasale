import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Phone, User, MessageSquare, MapPin, ShoppingBag, Send, Store, Truck } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    bookingContact,
    setBookingContact,
    createBooking,
    setCurrentPage
  } = useApp();

  const [formErrors, setFormErrors] = useState<string>('');
  const [wantsDelivery, setWantsDelivery] = useState<boolean>(false);

  const handleInputChange = (field: keyof typeof bookingContact, value: string) => {
    setBookingContact((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Format the WhatsApp message
  const formatWhatsAppMessage = (): string => {
    let msg = `🌿 *New Order from Apurvae Masale*\n\n`;
    msg += `👤 *Name:* ${bookingContact.fullName}\n`;
    msg += `📞 *Phone:* ${bookingContact.phone}\n`;
    msg += `📦 *Fulfillment:* ${wantsDelivery ? 'Delivery Requested' : 'Store Pickup'}\n`;
    if (wantsDelivery && bookingContact.deliveryNote.trim()) {
      msg += `📍 *Delivery Note:* ${bookingContact.deliveryNote}\n`;
    }
    msg += `\n─────────────────\n`;
    msg += `🛒 *Order Items:*\n\n`;
    cart.forEach((item) => {
      msg += `• ${item.product.title} (${item.selectedWeight}) × ${item.quantity} — ₹${(item.priceAtSelection * item.quantity).toLocaleString()}\n`;
    });
    msg += `\n─────────────────\n`;
    msg += `💰 *Total: ₹${cartSubtotal.toLocaleString()}*\n`;
    msg += `\n_Payment on pickup/delivery. Please confirm this order._`;
    return msg;
  };

  const handleBookOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingContact.fullName || !bookingContact.phone) {
      setFormErrors('Please enter your name and phone number.');
      return;
    }
    if (bookingContact.phone.replace(/\D/g, '').length < 10) {
      setFormErrors('Please enter a valid 10-digit phone number.');
      return;
    }
    if (wantsDelivery && !bookingContact.deliveryNote.trim()) {
      setFormErrors('Please add a delivery address or note so we know where to deliver.');
      return;
    }

    setFormErrors('');
    
    // Create the order in local state
    const contact = { ...bookingContact };
    if (!wantsDelivery) contact.deliveryNote = '';
    createBooking(contact);

    // Open WhatsApp with pre-filled message
    const whatsappNumber = '910000000000'; // Replace with your actual number
    const encodedMsg = encodeURIComponent(formatWhatsAppMessage());
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, '_blank');

    setCurrentPage('confirmation');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50/50">
        <div className="text-center space-y-4">
          <ShoppingBag className="w-16 h-16 text-brand-250 mx-auto" />
          <p className="font-serif text-xl text-brand-900">Your bag is empty.</p>
          <button onClick={() => setCurrentPage('shop')} className="px-6 py-2.5 bg-brand-950 text-white rounded-full text-xs font-mono uppercase tracking-widest">
            Browse Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-150 via-brand-55 to-gold-50" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-100/40 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => setCurrentPage('cart')}
            className="flex items-center gap-1.5 text-xs font-mono text-brand-500 hover:text-brand-950 uppercase tracking-widest transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Bag
          </button>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-950">Book Your Order</h2>
          <p className="text-sm font-sans text-brand-600 mt-2">Fill in your details and confirm via WhatsApp. Pay on pickup.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleBookOrder} className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] space-y-6">
              <h3 className="font-serif text-xl font-bold text-brand-950 pb-3 border-b border-brand-200/40">Contact Details</h3>
              
              {formErrors && (
                <div className="p-3.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl flex items-center gap-2 text-sm font-sans">
                  <span>⚠</span>
                  {formErrors}
                </div>
              )}

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-mono text-brand-500 font-semibold block">Full Name <span className="text-red-400">*</span></label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                  <input
                    required
                    type="text"
                    value={bookingContact.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="e.g. Arjun Kumar"
                    className="w-full bg-white/80 border border-brand-200/60 rounded-xl pl-10 pr-4 py-3.5 text-sm font-sans focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-mono text-brand-500 font-semibold block">Phone Number <span className="text-red-400">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                  <input
                    required
                    type="tel"
                    value={bookingContact.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/80 border border-brand-200/60 rounded-xl pl-10 pr-4 py-3.5 text-sm font-sans focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition"
                  />
                </div>
              </div>

              {/* Fulfillment toggle */}
              <div className="space-y-3">
                <label className="text-xs uppercase font-mono text-brand-500 font-semibold block">How would you like to get your order?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => { setWantsDelivery(false); handleInputChange('deliveryNote', ''); }}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left flex items-center gap-3 ${
                      !wantsDelivery
                        ? 'border-brand-950 bg-brand-950 text-white shadow-lg'
                        : 'border-brand-200/60 bg-white/60 text-brand-800 hover:border-brand-300'
                    }`}
                  >
                    <Store className={`w-5 h-5 shrink-0 ${!wantsDelivery ? 'text-gold-400' : 'text-brand-400'}`} />
                    <div>
                      <span className="block text-xs font-mono font-bold uppercase">Store Pickup</span>
                      <span className={`block text-[10px] mt-0.5 ${!wantsDelivery ? 'text-brand-300' : 'text-brand-400'}`}>Free • Ready same day</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWantsDelivery(true)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left flex items-center gap-3 ${
                      wantsDelivery
                        ? 'border-brand-950 bg-brand-950 text-white shadow-lg'
                        : 'border-brand-200/60 bg-white/60 text-brand-800 hover:border-brand-300'
                    }`}
                  >
                    <Truck className={`w-5 h-5 shrink-0 ${wantsDelivery ? 'text-gold-400' : 'text-brand-400'}`} />
                    <div>
                      <span className="block text-xs font-mono font-bold uppercase">Request Delivery</span>
                      <span className={`block text-[10px] mt-0.5 ${wantsDelivery ? 'text-brand-300' : 'text-brand-400'}`}>Subject to availability</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Delivery note (only if delivery requested) */}
              {wantsDelivery && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-1.5"
                >
                  <label className="text-xs uppercase font-mono text-brand-500 font-semibold block">Delivery Address / Note <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-400" />
                    <textarea
                      value={bookingContact.deliveryNote}
                      onChange={(e) => handleInputChange('deliveryNote', e.target.value)}
                      placeholder="e.g. 12 MG Road, Near City Mall, Gurugram..."
                      rows={3}
                      className="w-full bg-white/80 border border-brand-200/60 rounded-xl pl-10 pr-4 py-3.5 text-sm font-sans focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition resize-none"
                    />
                  </div>
                  <p className="text-[10px] font-sans text-brand-400">Delivery availability and charges will be confirmed on WhatsApp.</p>
                </motion.div>
              )}

              {/* Info note */}
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100/60 flex items-start gap-3 text-left">
                <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-800 font-sans leading-relaxed">
                  <p className="font-semibold">How it works:</p>
                  <p className="mt-1">Clicking the button below will open WhatsApp with your order details pre-filled. Send the message to confirm your booking. We'll reply with a confirmation and your order will be ready for pickup!</p>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="checkout-book-whatsapp"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <Send className="w-4 h-4" />
                Book Order via WhatsApp
              </button>
            </form>
          </motion.div>

          {/* RIGHT: Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] sticky top-28 space-y-5">
              <h4 className="font-serif text-lg font-bold text-brand-950 pb-3 border-b border-brand-200/40">Order Summary</h4>
              
              {/* Items */}
              <div className="space-y-3 max-h-[35vh] overflow-y-auto no-scrollbar pr-1">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedWeight}`} className="flex items-center gap-3 py-1.5">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-14 h-14 object-cover rounded-xl border border-brand-100/60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif text-sm font-bold text-brand-950 truncate">{item.product.title}</h5>
                      <div className="flex gap-2 items-center text-[10px] font-mono text-brand-400 mt-0.5">
                        <span>{item.selectedWeight}</span>
                        <span>•</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-serif text-sm font-bold text-brand-950">
                      ₹{(item.priceAtSelection * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-brand-200/40 pt-4 space-y-3">
                <div className="flex justify-between text-sm font-sans text-brand-600">
                  <span>Subtotal</span>
                  <span className="text-brand-950 font-medium">₹{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-sans text-brand-600">
                  <span>Pickup</span>
                  <span className="text-emerald-700 font-mono text-xs font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Free</span>
                </div>
                
                <div className="flex justify-between items-end border-t border-brand-200/40 pt-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-brand-400 block">Total</span>
                    <span className="text-2xl font-serif font-bold text-brand-950">₹{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <span className="text-[9px] font-mono text-brand-400">Pay on pickup</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
