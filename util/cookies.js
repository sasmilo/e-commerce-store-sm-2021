import Cookies from 'js-cookie';

export function setCartCookieClientSide(newCart) {
  Cookies.set('cart', newCart);
}

export function addProductToCart(cartCookieValue, productId) {
  const idInArray = cartCookieValue.some(
    (productAdded) => productAdded.productId === productId,
  );
  if (!idInArray) {
    return [
      ...cartCookieValue,
      {
        productId: productId,
        quantity: 1,
      },
    ];
  }

  return cartCookieValue.map((productAdded) => {
    if (productId === productAdded.productId) {
      productAdded.quantity = productAdded.quantity + 1;
    }
    return productAdded;
  });
}

export function removeProductFromCart(cartCookieValue, productId) {
  const idInArray = cartCookieValue.find(
    (productAdded) => productAdded.productId === productId,
  );
  console.log(idInArray);
  console.log(productId);
  console.log(cartCookieValue.filter((item) => item.productId !== productId));
  if (idInArray.quantity === 1) {
    return cartCookieValue.filter((item) => item.productId !== productId);
  }

  return cartCookieValue.map((productAdded) => {
    if (productId === productAdded.productId) {
      productAdded.quantity = productAdded.quantity - 1;
    }
    return productAdded;
  });
}
