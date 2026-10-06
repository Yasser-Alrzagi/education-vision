export type ProductCategory = 
  | 'all'
  | 'exams_homework'
  | 'research_reports'
  | 'presentations_design'
  | 'data_tech'
  | 'translation_editing'
  | 'academic_services'
  | 'digital_products';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryNameAr: string;
  image: string;
  description: string;
  details: string[];
  price: number;
  oldPrice?: number;
  available: boolean;
  is_active?: boolean;
  featured?: boolean;
  badge?: string;
  unitLabel?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNotes?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle?: string;
  iconName: string;
  category: ProductCategory;
  productId?: string;
}

export interface CheckoutFormData {
  fullName: string;
  whatsappNumber: string;
  email: string;
  academicMajor?: string;
  notes: string;
}
