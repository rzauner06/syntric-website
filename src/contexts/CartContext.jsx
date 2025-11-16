/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on initialization
    try {
      const savedCart = localStorage.getItem('syntriq-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('syntriq-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Generate unique cart item ID
  const getCartItemId = useCallback((product, variant = null) => {
    return `${product.id}-${variant?.name || 'default'}`;
  }, []);

  // Add item to cart
  const addToCart = useCallback((product, variant = null, quantity = 1) => {
    setCartItems(prevItems => {
      const itemId = getCartItemId(product, variant);
      const existingItemIndex = prevItems.findIndex(
        item => getCartItemId(item.product, item.variant) === itemId
      );

      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
          updatedAt: new Date().toISOString()
        };
        return updatedItems;
      }

      // Add new item
      return [...prevItems, {
        id: itemId,
        product,
        variant,
        quantity,
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }];
    });
  }, [getCartItemId]);

  // Remove item from cart
  const removeFromCart = useCallback((productId, variantName = null) => {
    setCartItems(prevItems =>
      prevItems.filter(item =>
        !(item.product.id === productId &&
          (variantName ? item.variant?.name === variantName : !item.variant))
      )
    );
  }, []);

  // Remove item by cart item ID
  const removeCartItem = useCallback((itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((productId, variantName = null, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantName);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId &&
        (variantName ? item.variant?.name === variantName : !item.variant)
          ? { ...item, quantity, updatedAt: new Date().toISOString() }
          : item
      )
    );
  }, [removeFromCart]);

  // Update quantity by cart item ID
  const updateCartItemQuantity = useCallback((itemId, quantity) => {
    if (quantity <= 0) {
      removeCartItem(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity, updatedAt: new Date().toISOString() }
          : item
      )
    );
  }, [removeCartItem]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedDiscount(null);
    setDiscountCode('');
  }, []);

  // Parse price from various formats
  const parsePrice = useCallback((price) => {
    if (price === 'Custom' || price === 'Free' || price === null || price === undefined) {
      return 0;
    }
    if (typeof price === 'number') {
      return price;
    }
    if (typeof price === 'string') {
      const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
      return isNaN(numericPrice) ? 0 : numericPrice;
    }
    return 0;
  }, []);

  // Get item price
  const getItemPrice = useCallback((item) => {
    const price = item.variant?.price || item.product.basePrice || 0;
    return parsePrice(price);
  }, [parsePrice]);

  // Get cart subtotal (before tax and shipping)
  const getCartSubtotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      return total + (getItemPrice(item) * item.quantity);
    }, 0);
  }, [cartItems, getItemPrice]);

  // Calculate tax
  const getTax = useCallback((subtotal, taxRate = 0.08) => {
    return subtotal * taxRate;
  }, []);

  // Calculate shipping
  const getShipping = useCallback((subtotal, freeShippingThreshold = 10000) => {
    if (subtotal === 0) return 0;
    return subtotal >= freeShippingThreshold ? 0 : 500;
  }, []);

  // Apply discount
  const applyDiscount = useCallback((code) => {
    // Mock discount codes - in real app, validate with backend
    const validDiscounts = {
      'SYNTRIQ10': { type: 'percentage', value: 10, description: '10% off' },
      'SAVE50': { type: 'fixed', value: 50, description: '$50 off' },
      'FREESHIP': { type: 'free-shipping', value: 0, description: 'Free shipping' },
    };

    const discount = validDiscounts[code.toUpperCase()];
    if (discount) {
      setAppliedDiscount({ ...discount, code: code.toUpperCase() });
      setDiscountCode(code.toUpperCase());
      return true;
    }
    return false;
  }, []);

  // Remove discount
  const removeDiscount = useCallback(() => {
    setAppliedDiscount(null);
    setDiscountCode('');
  }, []);

  // Calculate discount amount
  const getDiscountAmount = useCallback((subtotal) => {
    if (!appliedDiscount) return 0;

    if (appliedDiscount.type === 'percentage') {
      return subtotal * (appliedDiscount.value / 100);
    } else if (appliedDiscount.type === 'fixed') {
      return Math.min(appliedDiscount.value, subtotal);
    }
    return 0;
  }, [appliedDiscount]);

  // Get cart total (subtotal + tax + shipping - discount)
  const getCartTotal = useCallback(() => {
    const subtotal = getCartSubtotal();
    const discountAmount = getDiscountAmount(subtotal);
    const discountedSubtotal = subtotal - discountAmount;
    const tax = getTax(discountedSubtotal);
    const shipping = appliedDiscount?.type === 'free-shipping' ? 0 : getShipping(subtotal);

    return discountedSubtotal + tax + shipping;
  }, [getCartSubtotal, getDiscountAmount, getTax, getShipping, appliedDiscount]);

  // Get cart breakdown
  const getCartBreakdown = useCallback(() => {
    const subtotal = getCartSubtotal();
    const discountAmount = getDiscountAmount(subtotal);
    const discountedSubtotal = subtotal - discountAmount;
    const tax = getTax(discountedSubtotal);
    const shipping = appliedDiscount?.type === 'free-shipping' ? 0 : getShipping(subtotal);
    const total = discountedSubtotal + tax + shipping;

    return {
      subtotal,
      discount: discountAmount,
      tax,
      shipping,
      total,
      itemCount: getCartItemCount()
    };
  }, [getCartSubtotal, getDiscountAmount, getTax, getShipping, appliedDiscount]);

  // Get cart item count
  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  // Toggle cart drawer
  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  // Open cart drawer
  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  // Close cart drawer
  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  // Alias for getCartItemCount (for backwards compatibility)
  const getCartCount = useCallback(() => {
    return getCartItemCount();
  }, [getCartItemCount]);

  const value = {
    // State
    cartItems,
    isCartOpen,
    discountCode,
    appliedDiscount,

    // Cart actions
    addToCart,
    removeFromCart,
    removeCartItem,
    updateQuantity,
    updateCartItemQuantity,
    clearCart,

    // Discount actions
    applyDiscount,
    removeDiscount,

    // Calculations
    getCartTotal,
    getCartSubtotal,
    getCartBreakdown,
    getCartItemCount,
    getCartCount,
    getItemPrice,
    getTax,
    getShipping,
    getDiscountAmount,

    // UI actions
    toggleCart,
    openCart,
    closeCart,
    setIsCartOpen
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
