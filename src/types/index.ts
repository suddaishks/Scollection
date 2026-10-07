export type ProductCategory = 'all' | 'perfume' | 'attar' | 'topi' | 'deals';

export interface FragranceNotes {
  top: { ur: string; en: string }[];
  heart: { ur: string; en: string }[];
  base: { ur: string; en: string }[];
}

export interface ProductVariant {
  size: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

export interface FragranceSpecs {
  sillage: 'Subtle' | 'Moderate' | 'Strong' | 'Intense';
  sillageUr: string;
  longevity: string;
  longevityUr: string;
  season: string;
  seasonUr: string;
  concentration: string;
  concentrationUr: string;
  gender: string;
  genderUr: string;
}

export interface TopiSpecs {
  materialUr: string;
  materialEn: string;
  craftUr: string;
  craftEn: string;
  originUr: string;
  originEn: string;
  careUr: string;
  careEn: string;
}

export interface Product {
  id: string;
  nameUr: string;
  nameEn: string;
  taglineUr: string;
  taglineEn: string;
  category: 'perfume' | 'attar' | 'topi' | 'deals';
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  inStock: boolean;
  featured?: boolean;
  isDeal?: boolean;
  badgeUr?: string;
  badgeEn?: string;
  volume?: string;
  concentration?: string;
  descriptionUr: string;
  descriptionEn: string;
  storyUr?: string;
  storyEn?: string;
  notes?: FragranceNotes;
  specs?: FragranceSpecs;
  topiSpecs?: TopiSpecs;
  variants: ProductVariant[];
  bundleItemsUr?: string[];
  bundleItemsEn?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  nameUr: string;
  nameEn: string;
  category: string;
  image: string;
  selectedSize: string;
  unitPrice: number;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'easypaisa' | 'jazzcash' | 'bank';

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  whatsappPhone: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  transactionId?: string;
}

export interface RiderStatus {
  status: 'confirmed' | 'packing' | 'with_rider' | 'dispatched' | 'out_for_delivery' | 'delivered' | 'cancelled';
  statusUr: string;
  riderName: string;
  riderPhone: string;
  vehicleNo: string;
  courier: string;
  trackingNo: string;
  estimatedDelivery: string;
  currentLocation: string;
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode?: string;
  rider: RiderStatus;
  cancellationReason?: 'customer' | 'owner' | string;
  cancelledAt?: string;
}
