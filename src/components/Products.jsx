import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFeaturedProducts, getUpcomingProducts } from '../data/products';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.slug}`}>
      <div className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-blue-500/50 hover:shadow-2xl transition-all duration-500 cursor-pointer">
        <div className="relative z-10">
          {/* Icon */}
          <div className="text-6xl mb-6 inline-block">
            {product.icon}
          </div>

          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.name}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">{product.tagline}</p>

          <ul className="space-y-3 mb-8">
            {product.features.slice(0, 5).map((feature, i) => (
              <li
                key={i}
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <svg
                  className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-full font-medium hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg text-center flex items-center justify-center gap-2"
          >
            Learn More
            <motion.svg
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.div>
        </div>

        {/* Hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Link>
  );
};

const Products = () => {
  const featuredProducts = getFeaturedProducts();
  const upcomingProducts = getUpcomingProducts();

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Our <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Cutting-edge manufacturing equipment and professional software designed for precision, reliability, and performance.
          </p>
        </motion.div>

        {/* Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Coming Soon Section */}
        {upcomingProducts.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 mt-20"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4"
              >
                <motion.span
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-blue-600 rounded-full"
                />
                <span className="text-blue-800 font-bold">Coming Soon</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Next-Generation <span className="text-gradient">Software</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Revolutionary software solutions to streamline your workflow
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* View All Products CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              View All Products →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
