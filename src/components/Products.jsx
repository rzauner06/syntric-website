import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ title, description, features, index, link }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative z-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </motion.div>

        <h3 className="text-3xl font-bold mb-4 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">{description}</p>

        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.2 + i * 0.1 }}
              className="flex items-center text-gray-700"
            >
              <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {feature}
            </motion.li>
          ))}
        </ul>

        {link ? (
          <Link to={link}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-full font-medium hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg"
            >
              Learn More
            </motion.button>
          </Link>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-full font-medium hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg"
          >
            Learn More
          </motion.button>
        )}
      </div>

      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const Products = () => {
  const products = [
    {
      title: "SYNTRIQ Q1",
      description: "Our flagship 3D printer featuring CoreXY architecture, true multi-color printing, and record-breaking speeds.",
      features: [
        "CoreXY kinematics",
        "Inductive heating technology",
        "PEEK ready materials",
        "Heated chamber",
        "CE certified",
        "Multi-toolhead system",
        "500+ mm/s print speeds"
      ],
      link: "/products/q1"
    },
    {
      title: "CNC Machines",
      description: "Professional-grade computer numerical control systems for subtractive manufacturing.",
      features: [
        "Multi-axis precision control",
        "High-speed spindle technology",
        "Industrial-grade components",
        "Automated tool changing",
        "Real-time monitoring"
      ]
    },
    {
      title: "Pick & Place",
      description: "Automated assembly systems for efficient PCB manufacturing and component placement.",
      features: [
        "Vision-guided placement",
        "High-speed operation",
        "Component recognition AI",
        "Multiple feeder support",
        "Quality assurance systems"
      ]
    }
  ];

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Our <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cutting-edge manufacturing equipment designed for precision, reliability, and performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
