"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // ShadCN utility for styling

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className={cn(
        "w-full max-w-xl p-12 shadow-2xl rounded-3xl text-center",
        "backdrop-blur-lg bg-white border border-red-200"
      )}>
        <CardHeader>
          <CardTitle className="text-5xl font-bold tracking-tight text-zinc-950">
            Smart Wardrobe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-lg text-zinc-400 font-medium">
            Elevate your style with seamless experience.
          </p>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <Link href="/digital-wardrobe" className="w-full md:w-auto">
              <Button className="text-lg px-8 py-3 w-full md:w-auto bg-red-500 hover:bg-red-600 text-white shadow-lg">
                Digital Wardrobe
              </Button>
            </Link>
            <Link href="/outfit-generator" className="w-full md:w-auto">
              <Button className="text-lg px-8 py-3 w-full md:w-auto bg-red-500 hover:bg-red-600 text-white shadow-lg">
                Outfit Generator
              </Button>
            </Link>
          </div>
          <Link href="/upload-clothing">
            <Button className="text-lg px-8 py-3 w-full  bg-red-500 hover:bg-red-600 text-white shadow-lg">
              Upload Clothing
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
