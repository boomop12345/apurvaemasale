export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number; // base price in INR
  images: string[];
  rating: number;
  reviewsCount: number;
  heatLevel: 'None' | 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  origin: string; // e.g. "Pampore, Kashmir"
  category: 'Single Origin' | 'Signature Blends' | 'Heritage Blends';
  weightOptions: string[]; // e.g. ["25g", "50g", "100g"] or ["1g", "3g", "5g"]
  baseWeightIndex: number;
  provenance: {
    grower: string;
    altitude: string;
    harvest: string;
    process: string;
  };
  usageStorage: {
    aroma: string;
    pairing: string;
    storage: string;
  };
  inStock: boolean;
  tag?: string; // e.g., "Heritage Reserve", "Bestseller", "New In"
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: string;
  priceAtSelection: number;
}

export interface BookingContact {
  fullName: string;
  phone: string;
  deliveryNote: string; // optional note if they want delivery instead of pickup
}

// Keep ShippingAddress for backward compat with existing orders in data.ts
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  email: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Booked' | 'Ready for Pickup' | 'Picked Up' | 'Cancelled';
  items: CartItem[];
  subtotal: number;
  total: number;
  bookingContact: BookingContact;
  fulfillment: 'Pickup' | 'Delivery Requested';
  estimatedReady: string;
  // Legacy fields kept optional for old mock orders
  shipping?: number;
  discount?: number;
  shippingAddress?: ShippingAddress;
  paymentMethod?: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  defaultAddress?: ShippingAddress;
}

export interface HeritageStory {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  location: string;
  elevation: string;
  readTime: string;
  image: string;
}
