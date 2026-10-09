export type Category =
  'Beef' | 'Pork' | 'Chicken' | 'Frozen Products' | 'Seafood' | 'Sausages & Processed Meat';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  salePrice?: number;
  unit: string;
  description: string;
  stock: number;
  featured: boolean;
  imagePosition: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
export interface Customer {
  fullName: string;
  email: string;
  mobile: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
  zip: string;
  instructions?: string;
}
export type DeliveryMethod = 'standard' | 'express';
export type PaymentMethod = 'cod' | 'gcash' | 'maya' | 'card';
export interface DemoOrder {
  reference: string;
  customer: Customer;
  items: CartItem[];
  delivery: DeliveryMethod;
  payment: PaymentMethod;
  total: number;
  timestamp: string;
  status: 'Demo order recorded';
}
