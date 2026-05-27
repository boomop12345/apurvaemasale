/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
