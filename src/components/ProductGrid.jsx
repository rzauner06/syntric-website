import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductGrid = ({ products, columns = 3 }) => {
  const { addToCart, openCart } = useCart();

  const handleQuickAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    // For products with variants, just navigate to product page
    if (product.pricing || product.slug === '3d-printers') {
      return;
    }

    // For simple products, add to cart directly
    addToCart(product, null, 1);
    openCart();
  };

  const getProductPrice = (product) => {
    if (product.slug === '3d-printers') {
      return 'From $2,499';
    }
    if (product.pricing) {
      const starterPrice = product.pricing.starter?.price;
      if (starterPrice === 'Free') return 'Free';
      return `From ${product.pricing.professional?.price || ''}`;
    }
    if (product.basePrice) {
      return `$${product.basePrice.toLocaleString()}`;
    }
    return 'View Details';
  };

  const gridColumns = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid grid-cols-1 ${gridColumns[columns]} gap-6 lg:gap-8`}>
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link to={`/products/${product.slug}`}>
            <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden">
                <div className="text-8xl transform group-hover:scale-110 transition-transform duration-500">
                  {product.icon}
                </div>

                {/* Status Badge */}
                {product.status === 'coming-soon' && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {product.comingSoonBadge || 'Coming Soon'}
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white backdrop-blur-sm">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
                  {product.tagline}
                </p>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <ul className="space-y-1 mb-4">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Price and CTA */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {getProductPrice(product)}
                  </div>

                  {product.status !== 'coming-soon' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      {product.pricing || product.slug === '3d-printers' ? 'View' : 'Add'}
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
