/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

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
    const savedCart = localStorage.getItem('syntriq-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('syntriq-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, variant = null, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id &&
                (variant ? item.variant?.name === variant.name : !item.variant)
      );

      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      }

      // Add new item
      return [...prevItems, {
        product,
        variant,
        quantity,
        addedAt: new Date().toISOString()
      }];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId, variantName = null) => {
    setCartItems(prevItems =>
      prevItems.filter(item =>
        !(item.product.id === productId &&
          (variantName ? item.variant?.name === variantName : !item.variant))
      )
    );
  };

  // Update item quantity
  const updateQuantity = (productId, variantName = null, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantName);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId &&
        (variantName ? item.variant?.name === variantName : !item.variant)
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.variant?.price || item.product.basePrice || 0;
      // Handle "Custom" pricing
      if (price === 'Custom' || price === 'Free') return total;
      // Extract numeric value from string like "$49/month"
      const numericPrice = typeof price === 'string'
        ? parseFloat(price.replace(/[^0-9.]/g, '')) || 0
        : price;
      return total + (numericPrice * item.quantity);
    }, 0);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Toggle cart drawer
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    toggleCart,
    setIsCartOpen
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
