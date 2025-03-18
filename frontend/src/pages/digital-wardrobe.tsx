"use client";
import { useEffect } from "react";
import { useWardrobe, WardrobeProvider } from "@/context/WardrobeContext"; // ✅ Import provider
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function DigitalWardrobeContent() {
  const { wardrobe, addItem } = useWardrobe(); 

  useEffect(() => {
    const fetchWardrobe = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/wardrobe");

        // Assuming API returns an array of clothing items
        response.data.forEach((item) => addItem(item));
      } catch (error) {
        console.error("Failed to fetch wardrobe", error);
      }
    };
    fetchWardrobe();
  }, [addItem]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Your Wardrobe</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...wardrobe.tops, ...wardrobe.bottoms, ...wardrobe.shoes].map((item) => (
          <Card key={item.id} className="shadow-md">
            <CardHeader>
              <CardTitle>{item.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={item.imageUrl} alt={item.type} className="w-full h-48 object-cover rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function DigitalWardrobe() {
  return (
    <WardrobeProvider> {/* ✅ Wrapping everything inside the provider */}
      <DigitalWardrobeContent />
    </WardrobeProvider>
  );
}
