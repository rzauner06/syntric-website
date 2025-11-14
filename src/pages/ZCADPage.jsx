import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getProductBySlug } from '../data/products';
import Footer from '../components/Footer';
import CelebrationIcon from '@mui/icons-material/Celebration';

const ZCADPage = () => {
  const product = getProductBySlug('zcad');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            {/* Icon with hover effect */}
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
              className="text-9xl mb-8 inline-block cursor-pointer"
            >
              {product.icon}
            </motion.div>

            {/* Status Badge with pulse effect */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 font-bold mb-6 border-2 border-blue-200 dark:border-blue-700 transition-colors duration-300">
              <motion.span
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-blue-600 rounded-full"
              />
              {product.comingSoonBadge} - Q1 2025
            </div>

            {/* Title with gradient */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">ZCAD</span>
            </h1>

            {/* Tagline */}
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 mb-6 font-semibold transition-colors duration-300">
              {product.tagline}
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed transition-colors duration-300">
              {product.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.5)',
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white px-10 py-5 rounded-full font-bold text-lg hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 transition-all shadow-2xl"
              >
                Join the Waitlist →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-10 py-5 rounded-full font-bold text-lg border-2 border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all shadow-lg"
              >
                Watch Demo
              </motion.button>
            </div>

            {/* Early Access Note */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 transition-colors duration-300">
              Early access available for waitlist members • Free Starter plan forever
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Why ZCAD is Different
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-16 max-w-3xl mx-auto transition-colors duration-300">
            A complete rethinking of electronic design automation for the modern era
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {product.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.15)',
                  y: -5
                }}
                className="p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-3xl border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300"
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                  className="text-5xl mb-4 inline-block"
                >
                  {highlight.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                  {highlight.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Comprehensive Feature Set
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto transition-colors duration-300">
            Everything you need for professional PCB design, from concept to manufacturing
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 15px 35px -5px rgba(59, 130, 246, 0.2)'
                }}
                className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow"
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </motion.div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-colors duration-300">
            Technical Specifications
          </h2>

          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-600 transition-colors duration-300">
            {Object.entries(product.specs).map(([key, value], index) => (
              <motion.div
                key={key}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', x: 5 }}
                className={`grid md:grid-cols-2 gap-4 p-6 transition-colors duration-300 ${
                  index !== Object.entries(product.specs).length - 1
                    ? 'border-b border-gray-200 dark:border-gray-600'
                    : ''
                }`}
              >
                <div className="font-bold text-gray-900 dark:text-white flex items-center transition-colors duration-300">
                  <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-3" />
                  {key}
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">{value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-blue-200 text-center mb-16 max-w-3xl mx-auto">
            Choose the plan that fits your needs. Start free, scale as you grow.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(product.pricing).map(([key, plan], index) => (
              <motion.div
                key={key}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow: '0 25px 50px -10px rgba(0, 0, 0, 0.5)'
                }}
                className={`p-8 rounded-3xl border-2 transition-all ${
                  key === 'professional'
                    ? 'bg-gradient-to-br from-blue-600 to-purple-700 border-blue-400 shadow-2xl'
                    : 'bg-white/10 backdrop-blur-sm border-white/20'
                }`}
              >
                {key === 'professional' && (
                  <div className="inline-block px-3 py-1 bg-white text-blue-700 text-sm font-bold rounded-full mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3"
                    >
                      <svg
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
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
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-full font-bold transition-all ${
                    key === 'professional'
                      ? 'bg-white text-blue-700 hover:bg-blue-50'
                      : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-blue-200 mt-12">
            All plans include free updates and access to our community forum
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Be Among the First
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join our waitlist to get early access to ZCAD before the official launch.
            Early adopters receive special pricing and exclusive beta features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-full w-full sm:w-96 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-white/50 dark:focus:ring-blue-500/50 transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-full font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 shadow-xl whitespace-nowrap"
            >
              Join Waitlist →
            </motion.button>
          </div>
          <p className="text-sm text-blue-200 mt-6 flex items-center justify-center gap-2">
            <CelebrationIcon fontSize="small" /> Over 10,000 engineers already on the waitlist
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ZCADPage;
