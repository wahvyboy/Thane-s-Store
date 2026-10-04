export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  tag: string;
  badge: string;
  description: string;
  image: string;
  images: string[];
  variants: string[];
  sizes: string[];
  editionNumber: string;
  stockStatus: string;
  whatsIncluded: string[];
  craftsmanship: string[];
  deliverySecurity: string[];
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  specifications: string[];
  includes?: string[];
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant: string;
  selectedSize: string;
}

export interface CustomerOrderForm {
  fullName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  pyjamaSize: string;
  specialNotes: string;
}

export interface OrderConfirmationData {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  totalAmount: number;
  customer: CustomerOrderForm;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  location: string;
  verifiedBuyer: boolean;
  productPurchased: string;
  rating: number;
}
