export function totalSum(cart) {
  const totalValue = cart.reduce(function (accumulator, currentValue) {
    const subtotal = currentValue.productPrice * currentValue.quantity;
    return accumulator + subtotal;
  }, 0);

  return totalValue;
}
