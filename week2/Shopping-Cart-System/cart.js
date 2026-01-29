/*ii. cart.js - Shopping cart operations
                          import { getProductById, checkStock } from './product.js';
                          
                          let cartItems = [];
                          
                          // TODO: Implement these functions
                          
                          export function addToCart(productId, quantity) {
                            // 1. Get product details
                            // 2. Check stock availability
                            // 3. Check if product already in cart
                            //    - If yes, update quantity
                            //    - If no, add new item
                            // 4. Return success/error message
                          }
                          
                          export function removeFromCart(productId) {
                            // Remove product from cart
                          }
                          
                          export function updateQuantity(productId, newQuantity) {
                            // Update quantity of product in cart
                            // Check stock before updating
                          }
                          
                          export function getCartItems() {
                            // Return all cart items with product details
                          }
                          
                          export function getCartTotal() {
                            // Calculate total price of all items in cart
                            // Return total
                          }
                          
                          export function clearCart() {
                            // Empty the cart
                          }            */

import { getProductById, checkStock } from './product.js';

let cartItems = [];

export function addToCart(productId, quantity) {
  const product = getProductById(productId);

  if (!product) return 'Product not found';

  if (!checkStock(productId, quantity)) {
    return 'Insufficient stock';
  }

  const existingItem = cartItems.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
    return 'Cart quantity updated';
  } else {
    cartItems.push({ productId, quantity });
    return 'Product added to cart';
  }
}

export function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.productId !== productId);
  return 'Product removed from cart';
}

export function updateQuantity(productId, newQuantity) {
  if (!checkStock(productId, newQuantity)) {
    return 'Not enough stock';
  }

  const item = cartItems.find(item => item.productId === productId);
  if (!item) return 'Item not found in cart';

  item.quantity = newQuantity;
  return 'Quantity updated';
}

export function getCartItems() {
  return cartItems.map(item => {
    const product = getProductById(item.productId);
    return {
      ...product,
      quantity: item.quantity,
      totalPrice: product.price * item.quantity
    };
  });
}

export function getCartTotal() {
  return getCartItems().reduce((sum, item) => sum + item.totalPrice, 0);
}

export function clearCart() {
  cartItems = [];
}

