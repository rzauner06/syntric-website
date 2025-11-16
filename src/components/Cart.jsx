import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    setIsCartOpen
  } = useCart();

  const formatPrice = (price) => {
    if (price === 'Custom' || price === 'Free') return price;
    if (typeof price === 'string') return price;
    return `$${price.toLocaleString()}`;
  };

  const getItemPrice = (item) => {
    const price = item.variant?.price || item.product.basePrice;
    if (price === 'Custom' || price === 'Free') return 0;
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
    }
    return price;
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax example
  const shipping = subtotal > 0 ? (subtotal >= 10000 ? 0 : 500) : 0;
  const total = subtotal + tax + shipping;

  return (
    <>
      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white dark:bg-gray-900 shadow-2xl z-[70] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="flex items-center gap-3">
                  <ShoppingCartIcon style={{ fontSize: 32 }} />
                  <div>
                    <h2 className="text-2xl font-bold">Your Cart</h2>
                    <p className="text-sm text-blue-100">
                      {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <CloseIcon style={{ fontSize: 28 }} />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingCartIcon
                      style={{ fontSize: 80 }}
                      className="text-gray-300 dark:text-gray-700 mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Explore our innovative products and start building your order
                    </p>
                    <Link to="/shop">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsCartOpen(false)}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
                      >
                        Browse Products
                      </motion.button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={`${item.product.id}-${item.variant?.name || 'base'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex gap-4">
                          {/* Product Icon */}
                          <div className="text-blue-600 dark:text-blue-400 flex items-center justify-center" style={{ fontSize: '2.5rem' }}>
                            {item.product.icon}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                              {item.product.name}
                            </h3>
                            {item.variant && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {item.variant.name} Edition
                              </p>
                            )}
                            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                              {formatPrice(item.variant?.price || item.product.basePrice)}
                              {item.variant?.priceLabel && item.variant.priceLabel.includes('month') && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                  /month
                                </span>
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-full p-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.variant?.name,
                                  item.quantity - 1
                                )
                              }
                              className="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <RemoveIcon />
                            </motion.button>
                            <span className="font-semibold text-gray-900 dark:text-white min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.variant?.name,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <AddIcon />
                            </motion.button>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.product.id, item.variant?.name)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                          >
                            <DeleteIcon />
                          </motion.button>
                        </div>

                        {/* Item Total */}
                        {getItemPrice(item) > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Subtotal:
                            </span>
                            <span className="font-bold text-gray-900 dark:text-white">
                              ${(getItemPrice(item) * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer - Summary & Checkout */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toLocaleString()}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Free shipping on orders over $10,000
                      </p>
                    )}
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-300 dark:border-gray-600">
                      <span>Total</span>
                      <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <Link to="/checkout">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                    >
                      Proceed to Checkout
                    </motion.button>
                  </Link>

                  <Link to="/shop">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsCartOpen(false)}
                      className="w-full mt-3 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 py-3 rounded-full font-semibold border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      Continue Shopping
                    </motion.button>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
