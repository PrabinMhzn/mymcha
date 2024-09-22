import { Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <Image
              src="/assets/logo.png"
              alt="MYMCHA Logo"
              width={150} // Adjust this value to match your logo's width
              height={50} // Adjust this value to match your logo's height
              priority
            />
          </Link>
          <nav className="hidden md:flex space-x-12">
            {" "}
            {/* Adjusted spacing */}
            <Link href="/shop" className="hover:text-gray-300">
              Shop
            </Link>
            <Link href="/artists" className="hover:text-gray-300">
              Artists
            </Link>
            <Link href="/our-story" className="hover:text-gray-300">
              Our Story
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-8">
            <button aria-label="Search" className="hover:text-gray-300">
              <Search size={20} />
            </button>
            <Link
              href="/cart"
              aria-label="Cart"
              className="hover:text-gray-300"
            >
              <ShoppingCart size={20} />
            </Link>
            <Link
              href="/login"
              aria-label="User account"
              className="hover:text-gray-300"
            >
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
