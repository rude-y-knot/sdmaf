import React, { createContext, useContext, useState, useEffect } from 'react';
import { MAFProduct, EstimateItem } from '../types';

interface EstimateContextType {
  items: EstimateItem[];
  addItem: (product: MAFProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearItems: () => void;
  isInEstimate: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
  totalCount: number;
  // Drawer / Modal state
  isBatchDrawerOpen: boolean;
  setIsBatchDrawerOpen: (open: boolean) => void;
  calculatingProduct: MAFProduct | null;
  setCalculatingProduct: (product: MAFProduct | null) => void;
}

const STORAGE_KEY = 'stalnoe_delo_estimate_items';

const EstimateContext = createContext<EstimateContextType | undefined>(undefined);

export const EstimateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<EstimateItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isBatchDrawerOpen, setIsBatchDrawerOpen] = useState<boolean>(false);
  const [calculatingProduct, setCalculatingProduct] = useState<MAFProduct | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist estimate items', e);
    }
  }, [items]);

  const addItem = (product: MAFProduct, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          product,
          quantity: Math.max(1, quantity),
          addedAt: Date.now(),
        },
      ];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as EstimateItem[]
    );
  };

  const setQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearItems = () => {
    setItems([]);
  };

  const isInEstimate = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  const getItemQuantity = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const totalCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <EstimateContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        setQuantity,
        clearItems,
        isInEstimate,
        getItemQuantity,
        totalCount,
        isBatchDrawerOpen,
        setIsBatchDrawerOpen,
        calculatingProduct,
        setCalculatingProduct,
      }}
    >
      {children}
    </EstimateContext.Provider>
  );
};

export const useEstimate = () => {
  const context = useContext(EstimateContext);
  if (!context) {
    throw new Error('useEstimate must be used within an EstimateProvider');
  }
  return context;
};
