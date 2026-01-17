import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WardrobeProvider } from "@/context/WardrobeContext"; // ✅ Import provider
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxora",
  description: "Developed for Fashion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <WardrobeProvider> {/* ✅ Ensure everything is inside this */}
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow p-4">{children}</main>
          </div>
        </WardrobeProvider>
      </body>
    </html>
  );
}
