import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Calendar, Store, Phone, MapPin, Sparkles, ArrowRight, MessageSquare, Truck } from 'lucide-react';
import { PRODUCTS } from '../data';

export const OrderConfirmationPage: React.FC = () => {
  const {
    orders,
    lastCreatedOrderId,
    setCurrentPage,
    setSelectedProductId
  } = useApp();

  const currentOrder = useMemo(() => {
    return orders.find((o) => o.id === lastCreatedOrderId) || orders[0];
  }, [orders, lastCreatedOrderId]);

  const recommendations = useMemo(() => {
    if (!currentOrder) return PRODUCTS.slice(0, 3);
    const orderedIds = new Set(currentOrder.items.map((it) => it.product.id));
    return PRODUCTS.filter((p) => !orderedIds.has(p.id)).slice(0, 3);
  }, [currentOrder]);

  if (!currentOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50/50">
        <div className="text-center space-y-4">
          <p className="font-serif text-xl text-brand-900">No active bookings found.</p>
          <button onClick={() => setCurrentPage('home')} className="px-6 py-2.5 bg-brand-950 text-white rounded-full text-xs font-mono uppercase tracking-widest">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('detail');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-brand-55 to-gold-50/30" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl p-8 sm:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.06)] space-y-8 text-center mb-10"
        >
          {/* Checkmark */}
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </motion.div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950">Booking Confirmed!</h2>
            <p className="text-sm font-sans text-brand-600 max-w-md">
              Your order has been booked. We've opened WhatsApp for you to send the order details. We'll confirm and let you know when it's ready!
            </p>
          </div>

          {/* Order Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-brand-50/60 rounded-2xl border border-brand-200/40"
          >
            <div className="text-left">
              <span className="text-[10px] font-mono text-brand-400 block uppercase tracking-wider">Order ID</span>
              <span className="text-sm font-bold font-mono text-brand-950">{currentOrder.id}</span>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-brand-400 block uppercase tracking-wider">Date</span>
              <span className="text-sm font-bold text-brand-950">{currentOrder.date}</span>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-brand-400 block uppercase tracking-wider">Fulfillment</span>
              <span className="text-sm font-bold text-brand-950 flex items-center gap-1">
                {currentOrder.fulfillment === 'Pickup' ? (
                  <><Store className="w-3.5 h-3.5 text-emerald-600" /> Store Pickup</>
                ) : (
                  <><Truck className="w-3.5 h-3.5 text-blue-600" /> Delivery Requested</>
                )}
              </span>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-brand-400 block uppercase tracking-wider">Total</span>
              <span className="text-lg font-bold font-serif text-brand-950">₹{currentOrder.total.toLocaleString()}</span>
            </div>
          </motion.div>

          {/* Contact & Fulfillment Details */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left border-t border-brand-200/40 pt-6"
          >
            {/* Contact */}
            <div className="space-y-2">
              <h4 className="font-serif text-base font-bold text-brand-950 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-600" />
                Contact Details
              </h4>
              <div className="text-sm font-sans text-brand-700 space-y-1">
                <p className="font-semibold text-brand-950">{currentOrder.bookingContact.fullName}</p>
                <p className="font-mono text-xs text-brand-500">{currentOrder.bookingContact.phone}</p>
                {currentOrder.bookingContact.deliveryNote && (
                  <p className="text-xs text-brand-500 mt-2 bg-brand-50/60 p-2.5 rounded-xl border border-brand-200/40">
                    <span className="font-semibold text-brand-700">Delivery Note:</span> {currentOrder.bookingContact.deliveryNote}
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-2 p-4 bg-brand-50/40 rounded-2xl border border-brand-200/40">
              <h4 className="font-serif text-base font-semibold text-brand-950">Summary</h4>
              <div className="space-y-1.5 text-xs font-sans text-brand-600">
                <div className="flex justify-between">
                  <span>Subtotal ({currentOrder.items.length} items)</span>
                  <span className="text-brand-950 font-medium">₹{currentOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup</span>
                  <span className="text-emerald-700 font-mono font-bold uppercase">Free</span>
                </div>
                <div className="flex justify-between font-serif text-sm font-bold text-brand-950 border-t border-brand-200/40 pt-2 mt-2">
                  <span>Total (Pay on pickup)</span>
                  <span>₹{currentOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Items */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-left space-y-3"
          >
            <h4 className="font-serif text-base font-bold text-brand-950">Items Ordered</h4>
            <div className="border border-brand-200/40 rounded-2xl bg-brand-50/30 divide-y divide-brand-200/30">
              {currentOrder.items.map((it) => (
                <div key={`${it.product.id}-${it.selectedWeight}`} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.product.images[0]}
                      alt={it.product.title}
                      className="w-12 h-12 object-cover rounded-xl border border-brand-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h5 className="font-serif text-sm font-bold text-brand-950">{it.product.title}</h5>
                      <p className="text-[10px] font-mono text-brand-400 mt-0.5">
                        {it.selectedWeight} • Qty: {it.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-serif text-sm font-bold text-brand-950">
                    ₹{(it.priceAtSelection * it.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* WhatsApp reminder */}
          <div className="bg-emerald-50/70 text-emerald-800 rounded-2xl border border-emerald-200/50 p-4 font-sans text-xs flex items-start gap-3 text-left">
            <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Don't forget to send the WhatsApp message!</p>
              <p className="mt-1 text-emerald-700">If the WhatsApp window didn't open, you can call us directly to confirm your order.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setCurrentPage('shop')}
              id="conf-back-shop"
              className="px-8 py-3.5 bg-brand-950 hover:bg-brand-900 text-brand-50 text-xs font-mono font-bold tracking-widest uppercase rounded-full shadow-lg transition"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => setCurrentPage('account')}
              className="px-8 py-3.5 bg-white border border-brand-200 hover:border-brand-300 text-brand-950 text-xs font-mono tracking-widest uppercase rounded-full transition"
            >
              View My Orders
            </button>
          </div>

        </motion.div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 pt-4"
          >
            <h4 className="font-serif text-xl font-bold text-brand-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-600" />
              You Might Also Like
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {recommendations.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleProductSelect(p.id)}
                  className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-32 object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[9px] font-mono text-gold-600 block uppercase tracking-wider">{p.origin.split(',')[0]}</span>
                    <h5 className="font-serif text-base font-bold text-brand-950 group-hover:text-gold-600 transition truncate">
                      {p.title}
                    </h5>
                  </div>
                  <div className="flex items-center justify-between border-t border-brand-200/30 mt-4 pt-3 text-xs">
                    <span className="font-serif font-bold text-brand-950">₹{p.price}</span>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-brand-700 group-hover:text-gold-600 transition flex items-center gap-1">
                      View
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 duration-100" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
