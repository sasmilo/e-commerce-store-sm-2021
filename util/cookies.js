import Cookies from 'js-cookie';

export function setCartCookieClientSide(newCart) {
  Cookies.set('cart', newCart);
}

export function getCartFromCookie() {
  const cart = Cookies.getJSON('cart') || [];
  return cart;
}

export function addProductToCart(cartCookieValue, id) {
  const idInArray = cartCookieValue.some(
    (productAdded) => productAdded.id === id,
  );
  if (!idInArray) {
    return [
      ...cartCookieValue,
      {
        id: id,
        quantity: 1,
      },
    ];
  }

  return cartCookieValue.map((productAdded) => {
    if (id === productAdded.id) {
      productAdded.quantity = productAdded.quantity + 1;
    }
    return productAdded;
  });
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

export function sumOfProductsInCart() {
  const cart = getCartFromCookie();

  const findCartValues = cart.map((item) => item.quantity);

  const reducer = (accumulator, currentValue) =>
    parseInt(accumulator) + parseInt(currentValue);

  function calcSumOfProducts() {
    if (cart.length > 0) {
      return findCartValues.reduce(reducer);
    } else {
      return 0;
    }
  }
  return calcSumOfProducts();
}
