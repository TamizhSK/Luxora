"use client";
import { useEffect, useState } from "react";
import { useWardrobe, WardrobeProvider } from "@/context/WardrobeContext";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, X } from "lucide-react";
import { motion } from "framer-motion";

function DigitalWardrobeContent() {
  const { wardrobe, addItem } = useWardrobe();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWardrobe = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. Please login.");
          return;
        }

        const response = await axios.get("http://localhost:4000/api/wardrobe", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        response.data.forEach((item) => addItem(item));
      } catch (error) {
        console.error("Failed to fetch wardrobe", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWardrobe();
  }, [addItem]);

  const getFilteredItems = (category) => {
    let items = [];
    
    if (category === "all") {
      items = [...wardrobe.tops, ...wardrobe.bottoms, ...wardrobe.shoes];
    } else if (category === "tops") {
      items = wardrobe.tops;
    } else if (category === "bottoms") {
      items = wardrobe.bottoms;
    } else if (category === "shoes") {
      items = wardrobe.shoes;
    }
    
    if (searchTerm) {
      return items.filter(item => 
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.color && item.color.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return items;
  };

  const renderItemGrid = (items) => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <Filter className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
          <p className="text-gray-500 max-w-md">
            {searchTerm ? "Try adjusting your search term" : "Add some items to your wardrobe to get started"}
          </p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition duration-300 h-full flex flex-col">
              <div className="relative pt-[100%]">
                <img
                  src={item.imageUrl}
                  alt={item.type}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                  {item.type}
                </div>
              </div>
              <CardContent className="p-4 bg-white flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    {item.brand && (
                      <p className="text-sm font-semibold text-gray-900">{item.brand}</p>
                    )}
                    {item.color && (
                      <p className="text-xs text-gray-500">
                        Color: {item.color}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header with search */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              My Wardrobe
            </h1>
            
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search your wardrobe..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            <Button 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-6"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>
        </div>
      </div>

      {/* Proper shadcn/ui Tabs Component */}
      <div className="container mx-auto px-4 pt-6">
        <Tabs 
          defaultValue="all" 
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="tops">Tops</TabsTrigger>
            <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
            <TabsTrigger value="shoes">Shoes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {renderItemGrid(getFilteredItems("all"))}
          </TabsContent>
          
          <TabsContent value="tops">
            {renderItemGrid(getFilteredItems("tops"))}
          </TabsContent>
          
          <TabsContent value="bottoms">
            {renderItemGrid(getFilteredItems("bottoms"))}
          </TabsContent>
          
          <TabsContent value="shoes">
            {renderItemGrid(getFilteredItems("shoes"))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating action button for smaller screens */}
      <div className="md:hidden fixed right-6 bottom-6">
        <Button className="rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

export default function DigitalWardrobe() {
  return (
    <WardrobeProvider>
      <DigitalWardrobeContent />
    </WardrobeProvider>
  );
}