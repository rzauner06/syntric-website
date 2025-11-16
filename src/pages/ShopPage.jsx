import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import Footer from '../components/Footer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterListIcon from '@mui/icons-material/FilterList';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Hardware', 'Software'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <ShoppingCartIcon
                sx={{ fontSize: 60 }}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-gradient">Shop</span> SYNTRIC
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Transform your manufacturing capabilities with innovative solutions engineered for excellence
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <FilterListIcon />
              <span className="font-semibold">Filter:</span>
            </div>
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.slug}`}>
                <motion.div
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)'
                  }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all cursor-pointer shadow-sm hover:shadow-xl group h-full flex flex-col"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="text-7xl mb-6 text-blue-600 dark:text-blue-400"
                  >
                    {product.icon}
                  </motion.div>

                  {/* Status Badge */}
                  {product.status === 'coming-soon' && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {product.comingSoonBadge || 'Coming Soon'}
                      </span>
                    </div>
                  )}
                  {product.status === 'available' && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Available Now
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3">
                    {product.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                    {product.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {product.priceLabel || `$${product.basePrice?.toLocaleString()}`}
                    </p>
                  </div>

                  {/* Features Preview */}
                  <ul className="space-y-2 mb-6">
                    {product.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <svg
                          className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg text-center flex items-center justify-center gap-2"
                  >
                    {product.status === 'available' ? (
                      <>
                        <ShoppingCartIcon /> View & Configure
                      </>
                    ) : (
                      'Coming Soon'
                    )}
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600 dark:text-gray-400">
                No products found in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Revolutionize Your Manufacturing
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Partner with us to unlock new possibilities. Our expert team is committed to delivering solutions that drive innovation and excellence in your operations.
          </p>
          <div>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Discover Our Vision
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShopPage;
