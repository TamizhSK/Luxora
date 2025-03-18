"use client";
import { useState } from "react";
import axios from "axios";
import { useWardrobe, WardrobeProvider } from "@/context/WardrobeContext"; // ✅ Import provider
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function UploadClothingContent() {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<"top" | "bottom" | "shoes" | "">("");
  const { addItem } = useWardrobe(); // ✅ Now safely inside the provider

  const handleUpload = async () => {
    if (!file || !type) {
      alert("Please select an image and choose a valid clothing type.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const response = await axios.post("http://localhost:4000/api/upload", formData);
      addItem(response.data); // ✅ Use addItem instead of setItems
      alert("Clothing uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload clothing", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <Card className="w-full max-w-lg p-8 shadow-lg rounded-2xl border border-gray-200 bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-red-700">
            Upload Clothing
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Image Upload */}
          <div>
            <Label className="block text-gray-700 font-medium">Upload Image</Label>
            <Input 
              type="file"
              className="mt-2 border border-gray-300 rounded-md p-2 w-full"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </div>

          {/* Clothing Type Selector */}
          <div>
            <Label className="block text-gray-700 font-medium">Select Clothing Type</Label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as "top" | "bottom" | "shoes")}
              className="mt-2 border border-gray-300 rounded-md p-2 w-full bg-white focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Type</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="shoes">Shoes</option>
            </select>
          </div>

          {/* Upload Button */}
          <Button 
            onClick={handleUpload} 
            className="w-full text-lg py-3 bg-red-600 hover:bg-red-700 text-white font-semibold transition-all shadow-md"
          >
            Upload
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function UploadClothing() {
  return (
    <WardrobeProvider> {/* ✅ Ensuring the provider is correctly applied */}
      <UploadClothingContent />
    </WardrobeProvider>
  );
}
