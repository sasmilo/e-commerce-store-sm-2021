import { removeProductFromCart } from '../../util/cookies';

const idInArray = 15;

test('removing item from the cookie, but cookie is not empty after that', () => {
  const cartCookieValue = [
    { id: 17, quantity: 1 },
    { id: 15, quantity: 2 },
  ];
  const result = removeProductFromCart(cartCookieValue, idInArray);

  expect(result).toEqual([
    { id: 17, quantity: 1 },
    { id: 15, quantity: 1 },
  ]);
});

test('removing last item from the cookie', () => {
  const cartCookieValue = [{ id: 15, quantity: 1 }];
  const result = removeProductFromCart(cartCookieValue, idInArray);
  expect(result).toEqual([]);
});
