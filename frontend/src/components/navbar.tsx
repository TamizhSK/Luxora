import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">Smart Wardrobe</h1>
      <div>
        <Link href="/digital-wardrobe" className="px-4">Wardrobe</Link>
        <Link href="/outfit-generator" className="px-4">Outfit Generator</Link>
        <Link href="/upload-clothing" className="px-4">Upload</Link>
      </div>
    </nav>
  );
};

export default Navbar;