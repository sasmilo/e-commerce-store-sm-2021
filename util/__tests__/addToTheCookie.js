import { addProductToCookieCart } from '../../components/addToCart';

const productIdToAdd = 15;

test('add new product when cookie is empty', () => {
  const cartCookieValue = [];
  const result = addProductToCookieCart(cartCookieValue, productIdToAdd);
  expect(result).toEqual([{ id: productIdToAdd, quantity: 1 }]);
});

test('add new product when cookie contains non-matching product', () => {
  const cartCookieValue = [{ id: 17, quantity: 2 }];
  const result = addProductToCookieCart(cartCookieValue, productIdToAdd);
  expect(result).toEqual([
    ...cartCookieValue,
    { id: productIdToAdd, quantity: 1 },
  ]);
});
