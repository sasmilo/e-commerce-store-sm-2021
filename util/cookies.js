import Cookies from 'js-cookie';

// export function setCartCookieClientSide(newCart) {
//   Cookies.set('cart', newCart);
// }

export function getCartFromCookie() {
  const cart = Cookies.getJSON('cart') || [];
  return cart;
}

export function removeProductFromCart(cartCookieValue, id) {
  const idInArray = cartCookieValue.find(
    (productAdded) => productAdded.id === id,
  );

  if (idInArray.quantity === 1) {
    return cartCookieValue.filter((item) => item.id !== id);
  }

  return cartCookieValue.map((productAdded) => {
    if (id === productAdded.id) {
      productAdded.quantity = productAdded.quantity - 1;
    }
    return productAdded;
  });
}

export function deleteAllProductsFromCookieCart() {
  const deleteCookie = Cookies.remove('cart');

  return deleteCookie;
}
