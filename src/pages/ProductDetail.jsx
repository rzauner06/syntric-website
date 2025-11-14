import { motion, useInView } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { getProductBySlug, products } from '../data/products';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const specsRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const isSpecsInView = useInView(specsRef, { once: true, margin: '-100px' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Product Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">The product you're looking for doesn't exist.</p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // If this is ZCAD, redirect to dedicated page
  if (slug === 'zcad') {
    navigate('/products/zcad/details');
    return null;
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
        className="pt-32 pb-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300"
            >
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                Home
              </Link>
              <span>/</span>
              <Link to="/#products" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                Products
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-medium transition-colors duration-300">{product.name}</span>
            </motion.div>

            {/* Icon with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isHeroInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
              className="text-8xl mb-6 inline-block"
            >
              {product.icon}
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              {product.name}
            </h1>

            {/* Status Badge */}
            {product.status === 'coming-soon' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium mb-6 transition-colors duration-300"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full transition-colors duration-300"
                />
                {product.comingSoonBadge || 'Coming Soon'}
              </motion.div>
            )}

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 transition-colors duration-300">
              {product.tagline}
            </p>

            {/* Description */}
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed transition-colors duration-300">
              {product.description}
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {product.status === 'available' ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                  >
                    Request Quote
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-full font-semibold text-lg border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    Download Brochure
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                  >
                    Join Waitlist
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-full font-semibold text-lg border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    Learn More
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 transition-colors duration-300"
          >
            Key Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto transition-colors duration-300"
          >
            Everything you need for professional-grade performance
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)' }}
                className="p-6 bg-gradient-to-br from-blue-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isFeaturesInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                  className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mb-4 transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 text-white"
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
                </motion.div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section ref={specsRef} className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isSpecsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-colors duration-300"
          >
            Technical Specifications
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isSpecsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            {Object.entries(product.specs).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={isSpecsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                className={`grid md:grid-cols-2 gap-4 p-6 transition-colors duration-300 ${
                  index !== Object.entries(product.specs).length - 1
                    ? 'border-b border-gray-200 dark:border-gray-700'
                    : ''
                }`}
              >
                <div className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{key}</div>
                <div className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-colors duration-300">
              Related Products
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <Link key={relatedProduct.id} to={`/products/${relatedProduct.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)' }}
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-5xl mb-4">{relatedProduct.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">{relatedProduct.tagline}</p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium transition-colors duration-300">
                      Learn more
                      <svg
                        className="w-4 h-4 ml-2"
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
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-blue-100 mb-8"
          >
            Learn more about {product.name} and how it can transform your
            workflow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-200 text-blue-600 dark:text-blue-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-300 transition-colors duration-300 shadow-lg"
              >
                Learn About SYNTRIC
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetail;
