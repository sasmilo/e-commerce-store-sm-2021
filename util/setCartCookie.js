import Cookies from 'js-cookie';

export function setCartCookieClientSide(newCart) {
  Cookies.set('cart', newCart);
}
