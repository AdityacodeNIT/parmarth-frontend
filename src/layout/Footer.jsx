import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Adyog</span>
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your one-stop destination for premium office supplies and stationery. Elevate your workspace with our curated collection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/Aboutus" className="hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/helpdesk" className="hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-4 ">
              <li className="flex items-start gap-3">
                <MapPin className="text-indigo-500 mt-1 shrink-0" size={20} />
                <span>123 Business Avenue, Tech District,<br />Innovation City, 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-indigo-500 shrink-0" size={20} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-indigo-500 shrink-0" size={20} />
                <span>support@adyog.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 border border-gray-700 transition-all"
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1 bottom-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 rounded-md transition-colors duration-300 flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Adyog. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
            <Link to="/faq" className="hover:text-indigo-400 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
