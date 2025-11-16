import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { addToCart, openCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter purchasable products
  const purchasableProducts = products.filter(
    (p) => p.slug === '3d-printers' || p.category === 'Software'
  );

  // Filter by category
  const filteredProducts = selectedCategory === 'All'
    ? purchasableProducts
    : purchasableProducts.filter(p => p.category === selectedCategory);

  // Get unique categories
  const categories = ['All', ...new Set(purchasableProducts.map(p => p.category))];

  // Product configuration options
  const productConfigurations = {
    '3d-printers': {
      models: [
        { name: 'Q1 Standard', price: 2499, description: 'Perfect for small workshops and hobbyists' },
        { name: 'Q1 Pro', price: 3999, description: 'Professional-grade with enhanced features' },
        { name: 'Q1 Ultra', price: 5999, description: 'Ultimate precision for industrial use' }
      ],
      colors: ['Titanium Gray', 'Arctic White', 'Carbon Black'],
      buildVolumes: ['300x300x400mm', '400x400x500mm', '500x500x600mm']
    },
    zcad: {
      tiers: [
        {
          name: 'Starter',
          price: 0,
          priceLabel: 'Free',
          description: 'Perfect for hobbyists and students',
          features: ['2-layer PCBs', 'Basic component library', 'Community support', 'Export to Gerber']
        },
        {
          name: 'Professional',
          price: 49,
          priceLabel: '$49/month',
          description: 'For professional engineers and teams',
          features: ['Unlimited layers', 'Full component library', 'Advanced simulation', 'Priority support', 'Cloud collaboration']
        },
        {
          name: 'Enterprise',
          price: 'custom',
          priceLabel: 'Custom',
          description: 'For large organizations',
          features: ['Volume licensing', 'Dedicated support', 'Custom integrations', 'On-premise deployment', 'Training & onboarding']
        }
      ]
    },
    slicer: {
      tiers: [
        {
          name: 'Free',
          price: 0,
          priceLabel: 'Free',
          description: 'Essential slicing features',
          features: ['Standard slicing', 'Basic supports', 'Common materials', 'Community support']
        },
        {
          name: 'Pro',
          price: 19,
          priceLabel: '$19/month',
          description: 'Advanced features for professionals',
          features: ['AI-powered supports', 'Advanced infill patterns', 'Custom materials', 'Priority support', 'Cloud print management']
        }
      ]
    },
    cad: {
      tiers: [
        {
          name: 'Personal',
          price: 0,
          priceLabel: 'Free',
          description: 'For personal projects',
          features: ['Parametric modeling', 'Basic assemblies', 'STL export', 'Community support']
        },
        {
          name: 'Professional',
          price: 39,
          priceLabel: '$39/month',
          description: 'For professional designers',
          features: ['Advanced assemblies', 'Motion simulation', 'FEA analysis', 'All export formats', 'Priority support', 'Cloud collaboration']
        }
      ]
    }
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    let variant = null;

    if (selectedProduct.slug === '3d-printers') {
      const model = productConfigurations['3d-printers'].models.find(
        m => m.name === selectedOptions.model
      );
      variant = {
        name: selectedOptions.model,
        price: model?.price || 0,
        color: selectedOptions.color,
        buildVolume: selectedOptions.buildVolume
      };
    } else {
      // Software product
      const config = productConfigurations[selectedProduct.slug];
      const tier = config?.tiers.find(t => t.name === selectedOptions.tier);
      variant = {
        name: selectedOptions.tier,
        price: tier?.price === 'custom' ? 'Custom' : tier?.price || 0,
        priceLabel: tier?.priceLabel
      };
    }

    addToCart(selectedProduct, variant, 1);
    openCart();
    setSelectedProduct(null);
    setSelectedOptions({});
  };

  const isConfigComplete = () => {
    if (!selectedProduct) return false;

    if (selectedProduct.slug === '3d-printers') {
      return selectedOptions.model && selectedOptions.color && selectedOptions.buildVolume;
    } else {
      return selectedOptions.tier;
    }
  };

  const getCurrentPrice = () => {
    if (!selectedProduct || !isConfigComplete()) return null;

    if (selectedProduct.slug === '3d-printers') {
      const model = productConfigurations['3d-printers'].models.find(
        m => m.name === selectedOptions.model
      );
      return model?.price;
    } else {
      const config = productConfigurations[selectedProduct.slug];
      const tier = config?.tiers.find(t => t.name === selectedOptions.tier);
      return tier?.priceLabel;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Shop <span className="text-gradient bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">SYNTRIQ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Innovative manufacturing solutions for the modern workshop
          </motion.p>
        </div>
      </section>

      {!selectedProduct ? (
        <>
          {/* Category Filter */}
          <section className="pb-12 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* Product Grid */}
          <section className="pb-20 px-6">
            <div className="max-w-7xl mx-auto">
              <ProductGrid products={filteredProducts} columns={3} />
            </div>
          </section>
        </>
      ) : (
        /* Product Configuration Page */
        <section className="pb-20 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                setSelectedProduct(null);
                setSelectedOptions({});
              }}
              className="mb-8 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all products
            </motion.button>

            {/* Product Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                {selectedProduct.name}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {selectedProduct.tagline}
              </p>
            </motion.div>

            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-16 bg-gray-50 dark:bg-gray-800 rounded-3xl aspect-[4/3] flex items-center justify-center overflow-hidden"
            >
              <div className="text-[200px] transform hover:scale-110 transition-transform duration-500">
                {selectedProduct.icon}
              </div>
            </motion.div>

            {/* Configuration Options */}
            {selectedProduct.slug === '3d-printers' ? (
              <div className="space-y-12">
                {/* Model Selection */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Choose your model
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {productConfigurations['3d-printers'].models.map((model) => (
                      <motion.div
                        key={model.name}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedOptions({ ...selectedOptions, model: model.name })}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                          selectedOptions.model === model.name
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-lg text-gray-900 dark:text-white">{model.name}</h4>
                          {selectedOptions.model === model.name && (
                            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{model.description}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${model.price.toLocaleString()}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Choose your color
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {productConfigurations['3d-printers'].colors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedOptions({ ...selectedOptions, color })}
                        className={`px-8 py-4 rounded-full font-semibold transition-all ${
                          selectedOptions.color === color
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700'
                        }`}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Build Volume Selection */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Choose your build volume
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {productConfigurations['3d-printers'].buildVolumes.map((volume) => (
                      <motion.button
                        key={volume}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedOptions({ ...selectedOptions, buildVolume: volume })}
                        className={`px-8 py-4 rounded-full font-semibold transition-all ${
                          selectedOptions.buildVolume === volume
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700'
                        }`}
                      >
                        {volume}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Software Tier Selection */
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Choose your plan
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {productConfigurations[selectedProduct.slug]?.tiers.map((tier) => (
                    <motion.div
                      key={tier.name}
                      whileHover={{ y: -8 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedOptions({ ...selectedOptions, tier: tier.name })}
                      className={`p-8 rounded-3xl border-2 cursor-pointer transition-all ${
                        selectedOptions.tier === tier.name
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 shadow-xl'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-bold text-2xl text-gray-900 dark:text-white">{tier.name}</h4>
                        {selectedOptions.tier === tier.name && (
                          <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {tier.priceLabel}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{tier.description}</p>
                      <ul className="space-y-3">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Section */}
            {isConfigComplete() && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Your configuration</p>
                    <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {getCurrentPrice() === 'Custom' ? 'Custom Pricing' : getCurrentPrice()}
                    </h4>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg whitespace-nowrap"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Product Features */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Key Features
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {selectedProduct.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 p-4"
                  >
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ShopPage;
