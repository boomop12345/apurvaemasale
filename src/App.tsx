/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { SearchOverlay } from './components/SearchOverlay';
import { LandingPage } from './components/LandingPage';
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AccountPage } from './components/AccountPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-brand-950 hover:bg-brand-900 text-gold-400 hover:text-gold-300 shadow-xl transition-all duration-300 border border-gold-600/20 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
    </button>
  );
};

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'shop':
        return <ProductListingPage />;
      case 'detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'account':
        return <AccountPage />;
      case 'confirmation':
        return <OrderConfirmationPage />;
      case 'wishlist':
        // Reuse account's wishlist tab
        return <AccountPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-50/10 flex flex-col font-sans selection:bg-gold-200 selection:text-brand-950">
      <Header />
      <SearchOverlay />
      
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      <ScrollToTop />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
