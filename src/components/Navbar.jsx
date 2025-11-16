import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MegaMenu from './Navigation/MegaMenu';
import MobileMenu from './Navigation/MobileMenu';
import ThemeToggle from './ThemeToggle';
import { useSession } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const { toggleCart, getCartItemCount } = useCart();

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

  // Close profile menu when clicking outside
  useEffect(() => {
    if (profileMenuOpen) {
      const timer = setTimeout(() => {
        const handleClickOutside = () => setProfileMenuOpen(false);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [profileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-effect shadow-lg dark:bg-gray-800/80 dark:backdrop-blur-lg' : 'bg-transparent'
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
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium flex items-center gap-1"
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
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Features
                </motion.div>
              </Link>

              <Link to="/shop">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Shop
                </motion.div>
              </Link>

              <Link to="/about">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  About
                </motion.div>
              </Link>

              <ThemeToggle />

              {/* Cart Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleCart}
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ShoppingBagIcon sx={{ fontSize: 28 }} />
                {getCartItemCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {getCartItemCount()}
                  </motion.span>
                )}
              </motion.button>

              {/* Authentication Section */}
              {!isPending && (
                session?.user ? (
                  // User is logged in - show profile dropdown
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                        {session.user.name?.[0]?.toUpperCase() || session.user.email[0].toUpperCase()}
                      </div>
                      <span className="font-medium">{session.user.name || 'Account'}</span>
                      <motion.svg
                        animate={{ rotate: profileMenuOpen ? 180 : 0 }}
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

                    {/* Profile Dropdown */}
                    {profileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        <Link to="/profile" onClick={() => setProfileMenuOpen(false)}>
                          <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">My Profile</p>
                          </div>
                        </Link>
                        <div className="border-t border-gray-200 dark:border-gray-700">
                          <Link to="/login" onClick={() => setProfileMenuOpen(false)}>
                            <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              <p className="text-sm font-medium text-red-600 dark:text-red-400">Sign Out</p>
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  // User is not logged in - show login/register buttons
                  <div className="flex items-center gap-3">
                    <Link to="/login">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium px-4 py-2"
                      >
                        Sign In
                      </motion.button>
                    </Link>
                    <Link to="/register">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                      >
                        Get Started
                      </motion.button>
                    </Link>
                  </div>
                )
              )}
            </div>

            <div className="lg:hidden flex items-center gap-3">
              <ThemeToggle />

              {/* Cart Icon Mobile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleCart}
                className="relative p-2 text-gray-700 dark:text-gray-300"
              >
                <ShoppingBagIcon sx={{ fontSize: 24 }} />
                {getCartItemCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {getCartItemCount()}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(true)}
                className="text-gray-700 dark:text-gray-300"
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
