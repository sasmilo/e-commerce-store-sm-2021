import { totalSum } from '../totalSumFunction';

test('get back the total value of the shopping cart', () => {
  const props = {
    finalShoppingCart: [
      {
        id: 15,
        category: 'Sport',
        productName: 'Baseball Hat',
        productPrice: 12.4,
        description: 'string',
        productImage: 'string',
        productStock: 12,
        productSize: 'L',
        productColor: 'black',
        productTags: 'men',
        quantity: 2,
      },

      {
        id: 16,
        category: 'Casual',
        productName: 'Trucker Hat',
        productPrice: 14.2,
        description: 'string',
        productImage: 'string',
        productStock: 12,
        productSize: 'L',
        productColor: 'black',
        productTags: 'unisex',
        quantity: 1,
      },
    ],

    children: [],
  };
  const cart = props.finalShoppingCart;

  const result = totalSum(cart);

  expect(result).toStrictEqual(39);
});
