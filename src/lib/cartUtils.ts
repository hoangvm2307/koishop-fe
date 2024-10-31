export const  updateCart = (items: Number[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const getCartItems = (): Number[] => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};