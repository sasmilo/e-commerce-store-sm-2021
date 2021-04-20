import Cookies from 'js-cookie';

export function getCartFromCookie() {
  const cart = Cookies.getJSON('cart') || [];
  return cart;
}

export function removeProductFromCart(cartCookieValue, id) {
  const idInArray = cartCookieValue.find(
    (productAdded) => productAdded.id === id,
  );

  if (idInArray === undefined) {
    alert('You already removed this item from your shopping cart');
    return cartCookieValue.filter((item) => item.id !== id);
  }

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
