export const updateCart = (items: string[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const getCartItems = (): string[] => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};