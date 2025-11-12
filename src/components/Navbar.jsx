import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MegaMenu from './Navigation/MegaMenu';
import MobileMenu from './Navigation/MobileMenu';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu when clicking outside
  useEffect(() => {
    if (megaMenuOpen) {
      const timer = setTimeout(() => {
        const handleClickOutside = () => setMegaMenuOpen(false);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [megaMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold tracking-tight cursor-pointer"
              >
                <span className="text-gradient">SYNTRIQ</span>
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              <div className="relative">
                <motion.button
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMegaMenuOpen(!megaMenuOpen);
                  }}
                >
                  Products
                  <motion.svg
                    animate={{ rotate: megaMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </motion.button>
              </div>

              <Link to="/features">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Features
                </motion.div>
              </Link>

              <Link to="/about">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  About
                </motion.div>
              </Link>

              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Contact
                </motion.div>
              </Link>

              <Link to="/products/zcad">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>

            <div className="lg:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(true)}
                className="text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <div onMouseLeave={() => setMegaMenuOpen(false)}>
          <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
