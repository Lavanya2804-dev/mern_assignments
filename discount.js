/*iii. discount.js - Coupon and discount logic
                          // Available coupons
                          const coupons = {
                            'WELCOME10': { type: 'percentage', value: 10, minAmount: 1000 },
                            'FLAT500': { type: 'flat', value: 500, minAmount: 5000 },
                            'ELECTRONICS20': { type: 'percentage', value: 20, minAmount: 10000, category: 'electronics' }
                          };
                          
                          // TODO: Implement these functions
                          
                          export function validateCoupon(couponCode, cartTotal, cartItems) {
                            // 1. Check if coupon exists
                            // 2. Check minimum amount requirement
                            // 3. Check category requirement (if any)
                            // Return { valid: true/false, message: '...' }
                          }
                          
                          export function calculateDiscount(couponCode, cartTotal) {
                            // Calculate discount amount based on coupon type
                            // Return discount amount
                          }
                          
                          export function applyDiscount(cartTotal, couponCode, cartItems) {
                            // 1. Validate coupon
                            // 2. If valid, calculate discount
                            // 3. Return final amount and discount details
                            // Return { 
                            //   originalTotal: ..., 
                            //   discount: ..., 
                            //   finalTotal: ...,
                            //   message: '...'
                            // }
                          } */
const coupons = {
  WELCOME10: { type: 'percentage', value: 10, minAmount: 1000 },
  FLAT500: { type: 'flat', value: 500, minAmount: 5000 },
  ELECTRONICS20: {
    type: 'percentage',
    value: 20,
    minAmount: 10000,
    category: 'electronics'
  }
};

export function validateCoupon(couponCode, cartTotal, cartItems) {
  const coupon = coupons[couponCode];
  if (!coupon) return { valid: false, message: 'Invalid coupon' };

  if (cartTotal < coupon.minAmount) {
    return { valid: false, message: 'Minimum amount not met' };
  }

  if (coupon.category) {
    const hasCategory = cartItems.some(
      item => item.category === coupon.category
    );
    if (!hasCategory) {
      return { valid: false, message: 'Category not eligible' };
    }
  }

  return { valid: true, message: 'Coupon applied successfully' };
}

export function calculateDiscount(couponCode, cartTotal) {
  const coupon = coupons[couponCode];
  if (coupon.type === 'percentage') {
    return (cartTotal * coupon.value) / 100;
  }
  return coupon.value;
}

export function applyDiscount(cartTotal, couponCode, cartItems) {
  const validation = validateCoupon(couponCode, cartTotal, cartItems);

  if (!validation.valid) {
    return {
      originalTotal: cartTotal,
      discount: 0,
      finalTotal: cartTotal,
      message: validation.message
    };
  }

  const discount = calculateDiscount(couponCode, cartTotal);

  return {
    originalTotal: cartTotal,
    discount,
    finalTotal: cartTotal - discount,
    message: validation.message
  };
}
