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
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Clothing</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Image</Label>
          <Input type="file" onChange={(e) => e.target.files && setFile(e.target.files[0])} />

          <Label>Clothing Type</Label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value as "top" | "bottom" | "shoes")}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Type</option>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="shoes">Shoes</option>
          </select>

          <Button onClick={handleUpload} variant="default" className="mt-4">
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
