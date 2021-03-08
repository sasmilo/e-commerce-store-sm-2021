import { addProductToCookieCart } from '../addToCart';

const productIdToAdd = 15;

test('increment quantity of the product when cookie contains matching product', () => {
  const cartCookieValue = [{ id: productIdToAdd, quantity: 2 }];
  const result = addProductToCookieCart(cartCookieValue, productIdToAdd);
  expect(result).toEqual([{ id: productIdToAdd, quantity: 3 }]);
});
