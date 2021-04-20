type CookieProduct = {
  id: number;
  quantity: number;
};

type FinalShoppingCart = {
  id: number;
  category: string;
  productName: string;
  productPrice: number;
  description: string;
  productImage: string;
  productStock: number;
  productSize: string;
  productColor: string;
  productTags: string;
  quantity: number;
};

export function addProductToCookieCart(
  cartCookieValue: CookieProduct[],
  id: number,
) {
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

export function addProductToRealCart(
  cartCookieValue: FinalShoppingCart[],
  id: number,
) {
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
