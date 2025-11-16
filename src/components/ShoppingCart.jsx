import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ShoppingCart = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeCartItem,
    updateCartItemQuantity,
    getCartBreakdown,
    getItemPrice,
    applyDiscount,
    removeDiscount,
    appliedDiscount
  } = useCart();

  const [discountInput, setDiscountInput] = useState('');
  const [discountError, setDiscountError] = useState('');

  const breakdown = getCartBreakdown();

  const handleApplyDiscount = () => {
    const success = applyDiscount(discountInput);
    if (success) {
      setDiscountError('');
      setDiscountInput('');
    } else {
      setDiscountError('Invalid discount code');
    }
  };

  const handleRemoveDiscount = () => {
    removeDiscount();
    setDiscountError('');
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return price;
  };

  const getDisplayPrice = (item) => {
    const price = item.variant?.price || item.product.basePrice;
    if (price === 'Custom' || price === 'Free') return price;
    if (typeof price === 'string' && price.includes('/')) return price;
    return formatPrice(getItemPrice(item));
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] lg:w-[500px] bg-white dark:bg-gray-900 shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h2 className="text-2xl font-bold">Shopping Cart</h2>
                  <p className="text-sm text-blue-100 mt-1">
                    {breakdown.itemCount} {breakdown.itemCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeCart}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs">
                    Discover our innovative products and add them to your cart
                  </p>
                  <Link to="/shop">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeCart}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Start Shopping
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex gap-4">
                          {/* Product Icon */}
                          <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center text-3xl">
                            {item.product.icon}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 dark:text-white truncate">
                                  {item.product.name}
                                </h3>
                                {item.variant && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.variant.name} {item.variant.color && `• ${item.variant.color}`}
                                  </p>
                                )}
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeCartItem(item.id)}
                                className="ml-2 p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                aria-label="Remove item"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </motion.button>
                            </div>

                            <div className="flex items-center justify-between">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </motion.button>
                                <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </motion.button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <div className="font-bold text-gray-900 dark:text-white">
                                  {getDisplayPrice(item)}
                                </div>
                                {getItemPrice(item) > 0 && item.quantity > 1 && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatPrice(getItemPrice(item) * item.quantity)} total
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer - Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                {/* Discount Code */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  {!appliedDiscount ? (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Discount Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={discountInput}
                          onChange={(e) => {
                            setDiscountInput(e.target.value.toUpperCase());
                            setDiscountError('');
                          }}
                          onKeyDown={(e) => e.key === 'Enter' && handleApplyDiscount()}
                          placeholder="Enter code"
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleApplyDiscount}
                          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Apply
                        </motion.button>
                      </div>
                      {discountError && (
                        <p className="text-red-500 text-sm mt-1">{discountError}</p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Try: SYNTRIQ10, SAVE50, FREESHIP
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <div className="font-semibold text-green-900 dark:text-green-100">
                            {appliedDiscount.code}
                          </div>
                          <div className="text-xs text-green-700 dark:text-green-300">
                            {appliedDiscount.description}
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleRemoveDiscount}
                        className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                        aria-label="Remove discount"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>{formatPrice(breakdown.subtotal)}</span>
                    </div>
                    {breakdown.discount > 0 && (
                      <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span>Discount</span>
                        <span>-{formatPrice(breakdown.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Tax (8%)</span>
                      <span>{formatPrice(breakdown.tax)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Shipping</span>
                      <span>
                        {breakdown.shipping === 0 ? (
                          <span className="text-green-600 dark:text-green-400 font-semibold">FREE</span>
                        ) : (
                          formatPrice(breakdown.shipping)
                        )}
                      </span>
                    </div>
                    {breakdown.shipping > 0 && breakdown.subtotal < 10000 && (
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Add {formatPrice(10000 - breakdown.subtotal)} more for free shipping
                      </p>
                    )}
                    <div className="pt-3 border-t border-gray-300 dark:border-gray-600 flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>{formatPrice(breakdown.total)}</span>
                    </div>
                  </div>

                  <Link to="/checkout">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={closeCart}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg mb-3"
                    >
                      Proceed to Checkout
                    </motion.button>
                  </Link>

                  <Link to="/shop">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={closeCart}
                      className="w-full bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 py-3 rounded-lg font-semibold border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      Continue Shopping
                    </motion.button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
