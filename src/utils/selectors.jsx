export const selectBaseAmount = (state) => {
  const cur = state.order.current;

  if (cur?.source === 'buyNow' && cur.product) {
    const quantity = Number(cur.quantity) || 1;
    const price = Number(cur.product.price) || 0;
    return quantity * price;
  }

  return state.cart.totalPrice || 0;
};
