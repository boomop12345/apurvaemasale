import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { Product, CartItem, BookingContact, Order, UserProfile } from '../types';
import { PRODUCTS, DEFAULT_USER, INITIAL_ORDERS } from '../data';

type PageType = 'home' | 'shop' | 'detail' | 'cart' | 'checkout' | 'account' | 'confirmation' | 'wishlist';

interface AppContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchFilter: string;
  setSearchFilter: (filter: string) => void;
  isSearchOverlayOpen: boolean;
  setIsSearchOverlayOpen: (open: boolean) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, weight: string) => void;
  updateCartQuantity: (product: Product, weight: string, quantity: number) => void;
  removeFromCart: (product: Product, weight: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  
  // Wishlist
  wishlist: string[]; // array of product ids
  toggleWishlist: (product: Product) => void;
  
  // Shop Filters
  filters: {
    category: string;
    origin: string;
    heatLevel: string;
    priceRange: number;
  };
  setFilter: (key: 'category' | 'origin' | 'heatLevel' | 'priceRange', value: any) => void;
  resetFilters: () => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  
  // Booking & User Details
  user: UserProfile;
  updateUser: (profile: Partial<UserProfile>) => void;
  bookingContact: BookingContact;
  setBookingContact: React.Dispatch<React.SetStateAction<BookingContact>>;
  orders: Order[];
  createBooking: (contact: BookingContact) => Order;
  lastCreatedOrderId: string;
  
  // Quick Utility
  getWeightPrice: (product: Product, weightStr: string) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, _setCurrentPage] = useState<PageType>(() => {
    const hash = window.location.hash.replace('#', '');
    const validPages = ['home', 'shop', 'detail', 'cart', 'checkout', 'account', 'confirmation', 'wishlist'];
    return validPages.includes(hash) ? (hash as PageType) : 'home';
  });

  const setCurrentPage = (page: PageType) => {
    if (page !== currentPage) {
      window.history.pushState({ page }, '', '#' + page);
      _setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (!window.history.state?.page) {
      window.history.replaceState({ page: currentPage }, '', '#' + currentPage);
    }

    const handlePopState = (event: PopStateEvent) => {
      const page = event.state?.page;
      const validPages = ['home', 'shop', 'detail', 'cart', 'checkout', 'account', 'confirmation', 'wishlist'];
      
      if (page && validPages.includes(page)) {
        _setCurrentPage(page as PageType);
      } else {
        const hash = window.location.hash.replace('#', '');
        if (validPages.includes(hash)) {
          _setCurrentPage(hash as PageType);
        } else {
          _setCurrentPage('home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage]);
  const [selectedProductId, setSelectedProductId] = useState<string>('kashmiri-saffron');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState<boolean>(false);
  
  // Cart Persistent State
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Wishlist Persistent State
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Filter States
  const [filters, setFilters] = useState({
    category: 'All',
    origin: 'All',
    heatLevel: 'All',
    priceRange: 500
  });
  const [sortBy, setSortBy] = useState<string>('heritage');
  
  // Profile & Order States
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [bookingContact, setBookingContact] = useState<BookingContact>({
    fullName: DEFAULT_USER.name,
    phone: DEFAULT_USER.phone,
    deliveryNote: ''
  });
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [lastCreatedOrderId, setLastCreatedOrderId] = useState<string>('');

  // Cart helper to calculate weight based price multiplier
  const getWeightPrice = (product: Product, weightStr: string): number => {
    // Basic ratio mapping
    const optionIndex = product.weightOptions.indexOf(weightStr);
    if (optionIndex === -1) return product.price;
    const baseIndex = product.baseWeightIndex;
    
    // Parse the numerical weights (e.g. "1g" -> 1, "50g" -> 50, etc.)
    const parseNum = (str: string) => parseFloat(str.replace(/[^0-9.]/g, '')) || 1;
    const baseNum = parseNum(product.weightOptions[baseIndex]);
    const targetNum = parseNum(weightStr);
    
    const ratio = targetNum / baseNum;
    
    // Make saffron bulk a little discounted or linear
    if (product.id === 'kashmiri-saffron') {
      if (weightStr === '3g') return Math.round(product.price * 3 * 0.9);
      if (weightStr === '5g') return Math.round(product.price * 5 * 0.82);
    } else {
      // Bulk discounts for other spices
      if (ratio >= 5) return Math.round(product.price * ratio * 0.85);
      if (ratio >= 2.5) return Math.round(product.price * ratio * 0.92);
    }
    return Math.round(product.price * ratio);
  };

  const addToCart = (product: Product, quantity: number, weight: string) => {
    const calculatedPrice = getWeightPrice(product, weight);
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === weight
      );
      if (existingIndex > -1) {
        const nextCart = [...prev];
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          quantity: nextCart[existingIndex].quantity + quantity
        };
        return nextCart;
      } else {
        return [...prev, {
          product,
          quantity,
          selectedWeight: weight,
          priceAtSelection: calculatedPrice
        }];
      }
    });
  };

  const updateCartQuantity = (product: Product, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(product, weight);
      return;
    }
    setCart((prev) => 
      prev.map((item) =>
        item.product.id === product.id && item.selectedWeight === weight
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (product: Product, weight: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === product.id && item.selectedWeight === weight))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const setFilter = (key: 'category' | 'origin' | 'heatLevel' | 'priceRange', value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'All',
      origin: 'All',
      heatLevel: 'All',
      priceRange: 500
    });
  };

  const updateUser = (profile: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...profile };
      return next;
    });
  };

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.priceAtSelection * item.quantity), 0);
  }, [cart]);

  const createBooking = (contact: BookingContact): Order => {
    const oId = `AM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const sub = cartSubtotal;
    const dateToday = new Date();
    const formattedDate = dateToday.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Ready for pickup in ~1 hour (show same day)
    const readyDate = formattedDate;

    const newOrder: Order = {
      id: oId,
      date: formattedDate,
      status: 'Booked',
      items: [...cart],
      subtotal: sub,
      total: sub,
      bookingContact: { ...contact },
      fulfillment: contact.deliveryNote.trim() ? 'Delivery Requested' : 'Pickup',
      estimatedReady: readyDate
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastCreatedOrderId(oId);
    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        isSearchOverlayOpen,
        setIsSearchOverlayOpen,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        filters,
        setFilter,
        resetFilters,
        sortBy,
        setSortBy,
        user,
        updateUser,
        bookingContact,
        setBookingContact,
        orders,
        createBooking,
        lastCreatedOrderId,
        getWeightPrice
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
