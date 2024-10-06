"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import CartModal from "@/components/CartModal";

const Header = () => {
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = 0;

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }

        lastScrollY = currentScrollY;
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // Cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav
        ref={headerRef}
        className={`bg-neutral-950 text-white py-4 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              <Image
                src="/assets/logo.png"
                alt="MYMCHA Logo"
                width={150}
                height={50}
                priority
              />
            </Link>
            <nav className="hidden md:flex space-x-12">
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
              <button
                aria-label="Cart"
                className="hover:text-gray-300 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <Link
                href="/login"
                aria-label="User account"
                className="hover:text-gray-300"
              >
                <User size={20} />
              </Link>
              <button
                className="md:hidden"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4">
              <Link href="/shop" className="block py-2 hover:text-gray-300">
                Shop
              </Link>
              <Link href="/artists" className="block py-2 hover:text-gray-300">
                Artists
              </Link>
              <Link
                href="/our-story"
                className="block py-2 hover:text-gray-300"
              >
                Our Story
              </Link>
              <Link href="/contact" className="block py-2 hover:text-gray-300">
                Contact
              </Link>
            </div>
          )}
        </div>
      </nav>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Header;
