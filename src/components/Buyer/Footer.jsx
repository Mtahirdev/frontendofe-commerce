import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-ink-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-400">Shoppy</h1>
          <p className="text-ink-400 mt-3 text-sm">
            Shop smarter with thousands of quality products at affordable
            prices.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-ink-400">
            <li className="hover:text-accent-400 cursor-pointer transition-colors">
              Home
            </li>
            <li className="hover:text-accent-400 cursor-pointer transition-colors">
              Categories
            </li>
            <li className="hover:text-accent-400 cursor-pointer transition-colors">
              Orders
            </li>
            <li className="hover:text-accent-400 cursor-pointer transition-colors">
              Contact
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Customer</h2>
          <ul className="space-y-2 text-ink-400">
            <li className="hover:text-accent-400 cursor-pointer transition-colors">
              My Account
            </li>
            <li className="hover:text-accent-400 cursor-pointer transition-colors">
              Wishlist
            </li>
            <li className="hover:text-accent-400 cursor-pointer transition-colors">
              Cart
            </li>
            <li className="hover:text-accent-400 cursor-pointer transition-colors">
              Help Center
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-ink-400 text-sm">Rahim Yar Khan, Punjab</p>
          <p className="text-ink-400 text-sm mt-2">support@shoppy.com</p>
          <p className="text-ink-400 text-sm mt-2">+92 300 1234567</p>

          <div className="flex gap-4 mt-5 text-2xl text-ink-400">
            <FaFacebook className="hover:text-brand-400 cursor-pointer transition-colors" />
            <FaInstagram className="hover:text-brand-400 cursor-pointer transition-colors" />
            <FaTwitter className="hover:text-brand-400 cursor-pointer transition-colors" />
            <FaLinkedin className="hover:text-brand-400 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      <div className="border-t border-ink-800 py-4 text-center text-ink-400 text-sm">
        © 2026 Shoppy. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
