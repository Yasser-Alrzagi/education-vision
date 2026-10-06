import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product } from '../types';
import { PRODUCTS_DATA, CATEGORIES_LIST } from '../data/productsData';

interface CategoryItem {
  id: string;
  nameAr: string;
  count: number;
}

interface ServicesContextType {
  products: Product[];
  categories: CategoryItem[];
  loading: boolean;
  error: string | null;
  refreshServices: () => Promise<void>;
  updateProductLocally: (updated: Product) => void;
  removeProductLocally: (id: string) => void;
  addProductLocally: (created: Product) => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/services');
      if (!res.ok) {
        throw new Error(`Failed to load services (${res.status})`);
      }
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProducts(json.data);
      }
    } catch (err: any) {
      console.warn('Could not fetch latest services from API, using fallback data:', err);
      // Retain fallback PRODUCTS_DATA
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const updateProductLocally = useCallback((updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  }, []);

  const removeProductLocally = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addProductLocally = useCallback((created: Product) => {
    setProducts((prev) => [created, ...prev]);
  }, []);

  // Compute dynamic category counts
  const categories: CategoryItem[] = [
    { id: 'all', nameAr: 'جميع الخدمات', count: products.length },
    {
      id: 'exams_homework',
      nameAr: 'الاختبارات والواجبات',
      count: products.filter((p) => p.category === 'exams_homework').length
    },
    {
      id: 'research_reports',
      nameAr: 'البحوث والتقارير',
      count: products.filter((p) => p.category === 'research_reports').length
    },
    {
      id: 'presentations_design',
      nameAr: 'العروض والتصاميم',
      count: products.filter((p) => p.category === 'presentations_design').length
    },
    {
      id: 'data_tech',
      nameAr: 'تحليل البيانات والبرمجة',
      count: products.filter((p) => p.category === 'data_tech').length
    },
    {
      id: 'translation_editing',
      nameAr: 'الترجمة والتدقيق',
      count: products.filter((p) => p.category === 'translation_editing').length
    },
    {
      id: 'academic_services',
      nameAr: 'الخدمات الأكاديمية',
      count: products.filter((p) => p.category === 'academic_services').length
    }
  ];

  return (
    <ServicesContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        refreshServices: fetchServices,
        updateProductLocally,
        removeProductLocally,
        addProductLocally
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): ServicesContextType => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};
