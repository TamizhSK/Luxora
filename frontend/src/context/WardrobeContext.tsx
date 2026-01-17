"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ClothingItem {
  id: number;
  imageUrl: string;
  type: "top" | "bottom" | "shoes"; // Ensures valid types
}

interface WardrobeContextType {
  wardrobe: {
    tops: ClothingItem[];
    bottoms: ClothingItem[];
    shoes: ClothingItem[];
  };
  addItem: (item: ClothingItem) => void;
}

const WardrobeContext = createContext<WardrobeContextType | undefined>(undefined);

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error("useWardrobe must be used within a WardrobeProvider");
  }
  return context;
};

export const WardrobeProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ClothingItem[]>([]);

  // Categorizing items into tops, bottoms, and shoes
  const wardrobe = {
    tops: items.filter((item) => item.type === "top"),
    bottoms: items.filter((item) => item.type === "bottom"),
    shoes: items.filter((item) => item.type === "shoes"),
  };

  const addItem = (item: ClothingItem) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  return (
    <WardrobeContext.Provider value={{ wardrobe, addItem }}>
      {children}
    </WardrobeContext.Provider>
  );
};
