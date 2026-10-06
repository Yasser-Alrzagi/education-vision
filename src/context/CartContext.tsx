import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customNotes?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProductForDetails: Product | null;
  setSelectedProductForDetails: (product: Product | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'education_visio_cart_v1';

const isValidCartItem = (item: any): item is CartItem => {
  if (!item || typeof item !== 'object') return false;
  if (!item.product || typeof item.product !== 'object') return false;
  if (typeof item.product.id !== 'string' || !item.product.id) return false;
  if (typeof item.product.name !== 'string') return false;
  const price = Number(item.product.price);
  if (!Number.isFinite(price) || price < 0) return false;
  const quantity = Number(item.quantity);
  if (!Number.isFinite(quantity) || quantity <= 0) return false;
  return true;
};

const sanitizeCartItems = (data: any): CartItem[] => {
  if (!Array.isArray(data)) return [];
  return data
    .filter(isValidCartItem)
    .map((item) => ({
      product: {
        ...item.product,
        price: Number(item.product.price),
      },
      quantity: Math.max(1, Math.floor(Number(item.quantity))),
      customNotes: typeof item.customNotes === 'string' ? item.customNotes : undefined,
    }));
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return sanitizeCartItems(parsed);
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForDetails, setSelectedProductForDetails] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1, customNotes?: string) => {
    const validQty = Math.floor(Number(quantity));
    if (!product || !product.id || !Number.isFinite(validQty) || validQty <= 0) return;
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + validQty,
          customNotes: customNotes ? customNotes.trim() : updated[existingIndex].customNotes,
        };
        return updated;
      } else {
        return [...prev, { 
          product, 
          quantity: validQty, 
          customNotes: customNotes ? customNotes.trim() : undefined 
        }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    if (!productId) return;
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (!productId) return;
    const validQty = Math.floor(Number(quantity));
    if (!Number.isFinite(validQty) || validQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: validQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce(
    (sum, item) => sum + (Number.isFinite(item.quantity) && item.quantity > 0 ? item.quantity : 0),
    0
  );

  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.product?.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + (price >= 0 && quantity > 0 ? price * quantity : 0);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProductForDetails,
        setSelectedProductForDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
