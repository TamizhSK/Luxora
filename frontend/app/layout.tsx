import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";
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
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow p-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}