import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop/men" className="hover:text-gray-300">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/shop/women" className="hover:text-gray-300">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/shop/accessories" className="hover:text-gray-300">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/our-story" className="hover:text-gray-300">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-gray-300">
                  Artists
                </Link>
              </li>
              <li>
                <Link
                  href="/about/sustainability"
                  className="hover:text-gray-300"
                >
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help/faq" className="hover:text-gray-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help/shipping" className="hover:text-gray-300">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/help/returns" className="hover:text-gray-300">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.instagram.com/mymcha_teez/"
                  className="hover:text-gray-300"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="/connect/twitter" className="hover:text-gray-300">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="/connect/facebook" className="hover:text-gray-300">
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className=" mb-4">&copy; 2019 Mymcha. All rights reserved.</p>
          <ul className="flex justify-center space-x-6 text-xs font-light">
            <li>
              <Link href="/terms" className="hover:text-gray-300">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-gray-300">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
