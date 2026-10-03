export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  tag: string;
  description: string;
  image: string;
  variants: string[];
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  specifications: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant: string;
}

export interface CustomerOrderForm {
  fullName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  pyjamaSize: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
  specialNotes: string;
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
