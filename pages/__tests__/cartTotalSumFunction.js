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
  const totalValue = cart.reduce(function (accumulator, currentValue) {
    const subtotal = currentValue.productPrice * currentValue.quantity;
    return accumulator + subtotal;
  }, 0);

  expect(totalValue).toStrictEqual(39);
});
