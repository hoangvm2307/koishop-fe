export const  updateCart = (items: number[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const getCartItems = (): number[] => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};

export const isInCart = (fishId: number): boolean => {
  const cartItems = getCartItems();
  return cartItems.includes(fishId);
};