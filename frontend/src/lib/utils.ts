import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind classes intelligently.
 * @param inputs - Class names to merge.
 * @returns A merged string of class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a random outfit from the given wardrobe.
 * @param wardrobe - An object containing arrays of tops, bottoms, and shoes.
 * @returns A randomly selected outfit.
 */
export function getRandomOutfit(wardrobe: { tops: string[]; bottoms: string[]; shoes: string[] }) {
  if (!wardrobe?.tops?.length || !wardrobe?.bottoms?.length || !wardrobe?.shoes?.length) {
    throw new Error("Wardrobe is not properly defined or missing items.");
  }

  const randomTop = wardrobe.tops[Math.floor(Math.random() * wardrobe.tops.length)];
  const randomBottom = wardrobe.bottoms[Math.floor(Math.random() * wardrobe.bottoms.length)];
  const randomShoes = wardrobe.shoes[Math.floor(Math.random() * wardrobe.shoes.length)];

  return {
    top: randomTop,
    bottom: randomBottom,
    shoes: randomShoes,
  };
}
