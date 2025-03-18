"use client";
import { useState } from "react";
import { useWardrobe, WardrobeProvider } from "@/context/WardrobeContext"; // ✅ Import provider
import { getRandomOutfit } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // ShadCN utility for styling

function OutfitGeneratorContent() {
  const { wardrobe } = useWardrobe(); // ✅ Now safely inside the provider
  const [outfit, setOutfit] = useState<{ id: string; type: string; imageUrl: string }[]>([]);

  const generateOutfit = () => {
    if (!wardrobe || !wardrobe.tops.length || !wardrobe.bottoms.length || !wardrobe.shoes.length) {
      console.error("Not enough wardrobe items to generate an outfit.");
      return;
    }

    const newOutfit = getRandomOutfit(wardrobe);
    setOutfit([
      { id: "1", type: "Top", imageUrl: newOutfit.top },
      { id: "2", type: "Bottom", imageUrl: newOutfit.bottom },
      { id: "3", type: "Shoes", imageUrl: newOutfit.shoes },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-red-700 mb-8 text-center">
        Outfit Generator
      </h1>
      
      <Button
        onClick={generateOutfit}
        className="text-lg font-semibold px-8 py-3 mb-6 bg-red-600 hover:bg-red-700 text-white shadow-md transition-all"
      >
        Generate Outfit
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {outfit.map((item) => (
          <Card key={item.id} className={cn(
            "shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl",
            "border border-red-200 bg-white"
          )}>
            <CardHeader className="text-center bg-red-50 py-4">
              <CardTitle className="text-lg font-semibold text-red-700 uppercase tracking-widest">
                {item.type}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-4">
              <img
                src={item.imageUrl}
                alt={item.type}
                className="w-full h-48 object-cover rounded-lg"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function OutfitGenerator() {
  return (
    <WardrobeProvider> {/* ✅ Ensuring the provider is correctly applied */}
      <OutfitGeneratorContent />
    </WardrobeProvider>
  );
}
