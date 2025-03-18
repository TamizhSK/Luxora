"use client";
import { useState } from "react";
import { useWardrobe, WardrobeProvider } from "@/context/WardrobeContext"; // ✅ Import provider
import { getRandomOutfit } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Outfit Generator</h1>
      <Button onClick={generateOutfit} variant="default" className="mb-6">
        Generate Outfit
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {outfit.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={item.imageUrl}
                alt={item.type}
                className="w-full h-48 object-cover rounded"
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
