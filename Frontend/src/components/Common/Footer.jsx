import React from 'react';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { TbBrandMeta } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { MdPhone } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left: Logo & Social */}
        <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/3">
          <span className="text-xl font-bold text-gray-900 tracking-tight">WAZADA</span>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition">
              <TbBrandMeta className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition">
              <IoLogoInstagram className="h-6 w-6" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition">
              <RiTwitterXLine className="h-6 w-6" />
            </a>
          </div>
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <MdPhone className="h-5 w-5" /> +91 91781 60725
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-col md:flex-row gap-8 w-full md:w-2/3 justify-center">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Shop</h3>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li><Link to="#" className="hover:text-gray-900">Men's Top Wear</Link></li>
              <li><Link to="#" className="hover:text-gray-900">Women's Top Wear</Link></li>
              <li><Link to="#" className="hover:text-gray-900">Men's Bottom Wear</Link></li>
              <li><Link to="#" className="hover:text-gray-900">Women's Bottom Wear</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Support</h3>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li><Link to="/support/terms" className="hover:text-gray-900">Terms & Conditions</Link></li>
              <li><Link to="/support/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link to="/support/shipping" className="hover:text-gray-900">Shipping & Delivery</Link></li>
              <li><Link to="/support/contact" className="hover:text-gray-900">Contact Us</Link></li>
              <li><Link to="/support/cancellation" className="hover:text-gray-900">Cancellation & Refund</Link></li>
            </ul>
          </div>
        </div>

        {/* Right: Newsletter */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-end">
          <h3 className="text-base font-semibold text-gray-900 mb-2">Newsletter</h3>
          <p className="text-gray-500 text-xs mb-2 text-center md:text-right">
            Get updates on new products and offers.
          </p>
          <form className="flex w-full max-w-xs">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 border border-gray-200 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-4 py-2 text-sm rounded-r-md hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto mt-8 px-4 border-t border-gray-100 pt-4">
        <p className="text-gray-400 text-xs text-center">
          ©2025, WAZADA. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
