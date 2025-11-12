import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products, productCategories } from '../../data/products';

const MegaMenu = ({ isOpen, onClose }) => {
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Mega Menu Content */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-full left-0 right-0 mt-1 z-50"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                  {productCategories.map((category, categoryIndex) => (
                    <motion.div
                      key={category.name}
                      variants={itemVariants}
                      className="space-y-4"
                    >
                      {/* Category Header */}
                      <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {category.description}
                        </p>
                      </div>

                      {/* Products Grid */}
                      <div className="grid gap-3">
                        {products
                          .filter((p) => p.category === category.name)
                          .map((product) => (
                            <Link
                              key={product.id}
                              to={`/products/${product.slug}`}
                              onClick={onClose}
                            >
                              <motion.div
                                whileHover={{
                                  scale: 1.02,
                                  backgroundColor: 'rgba(59, 130, 246, 0.05)'
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                              >
                                <div className="flex items-start gap-4">
                                  {/* Icon */}
                                  <motion.div
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.5 }}
                                    className="text-3xl flex-shrink-0"
                                  >
                                    {product.icon}
                                  </motion.div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {product.name}
                                      </h4>
                                      {product.status === 'coming-soon' && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                          {product.comingSoonBadge || 'Coming Soon'}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                      {product.tagline}
                                    </p>
                                  </div>

                                  {/* Arrow */}
                                  <motion.div
                                    initial={{ x: 0 }}
                                    whileHover={{ x: 5 }}
                                    className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                                  >
                                    <svg
                                      className="w-5 h-5"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  </motion.div>
                                </div>
                              </motion.div>
                            </Link>
                          ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Section - Quick Links */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gray-50 dark:bg-gray-800/50 px-8 py-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <Link
                        to="/products"
                        onClick={onClose}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      >
                        View All Products →
                      </Link>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Need help choosing? <Link to="/contact" onClick={onClose} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">Contact us</Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
