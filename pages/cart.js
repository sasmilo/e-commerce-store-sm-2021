import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {
  addProductToCart,
  removeProductFromCart,
  setCartCookieClientSide,
} from '../util/cookies';
import { getProductInformation } from '../util/database';

export default function ShoppingCart(props) {
  const [cart, setCart] = useState(props.finalShoppingCartWithSubtotals);

  useEffect(() => {
    setCartCookieClientSide(cart);
  }, [cart]);

  const totalValue = cart.reduce(function (accumulator, currentValue) {
    const subtotal = currentValue.productPrice * currentValue.quantity;
    return accumulator + subtotal;
  }, 0);
  // const subtotal = cart.map(
  //   ({ productPrice, quantity }) => productPrice * quantity,
  // );

  if (totalValue === 0) {
    return (
      <Layout cart={cart}>
        <Head>
          <title>The cart is empty</title>
        </Head>
        <h1>Your cart is empty!</h1>
        <p>Would you be interested in some of our cool hats?</p>
        <Link href="/products">
          <a>
            <Image
              src="/online-store.jpg"
              alt="Store icon"
              width={328}
              height={246}
            />
          </a>
        </Link>
      </Layout>
    );
  }

  return (
    <Layout cart={cart}>
      <Head>
        <title>Cart</title>
      </Head>
      <div>
        <div>
          <div>
            <h1>Your Shopping Cart</h1>
          </div>
          <div>
            <ul>
              {cart.map((object) => (
                <li key={object.id}>
                  <Image
                    src={`/${object.productImage}`}
                    alt="Hat"
                    width={40}
                    height={40}
                  />
                  {object.productName}
                  {'  '}
                  {object.productPrice.toFixed(2)}
                  {'€'}
                  {'  '}
                  <button
                    onClick={() => {
                      const newCart = removeProductFromCart(cart, object.id);
                      setCart(newCart);
                    }}
                  >
                    -
                  </button>
                  {'  '}
                  {object.quantity}
                  {'  '}
                  <button
                    onClick={() => {
                      const newCart = addProductToCart(
                        cart,
                        object.id,
                        object.productName,
                        object.productPrice,
                      );
                      setCart(newCart);
                    }}
                  >
                    +
                  </button>
                  {'  '}
                  {(object.productPrice * object.quantity).toFixed(2)}
                  {'€'}
                </li>
              ))}
            </ul>
          </div>
          <p>Total value: {`${totalValue.toFixed(2)} €`}</p>

          {/* <CartFunction products={products} cart={cart} setCart={setCart} /> */}
          <Link href="/checkout">
            <a>Go to checkout</a>
          </Link>
          <Link href="/products">
            <a>Shop some more</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cart = context.req.cookies.cart;
  const cartCookieObject = cart ? JSON.parse(cart) : [];

  // console.log(cartCookieObject);

  const products = await getProductInformation();

  // console.log(products);

  const finalShoppingCart = cartCookieObject.map((cookieProduct) => {
    return {
      ...products.find((product) => cookieProduct.id === product.id),
      quantity: cookieProduct.quantity,
    };
  });

  const finalShoppingCartWithSubtotals = finalShoppingCart.map(
    (cookieProduct) => {
      return {
        ...finalShoppingCart.find((product) => cookieProduct.id === product.id),
        subtotal: cookieProduct.quantity * cookieProduct.productPrice,
      };
    },
  );

  console.log(finalShoppingCartWithSubtotals);

  return {
    props: {
      cartCookieObject: cartCookieObject,
      products: products,
      finalShoppingCartWithSubtotals: finalShoppingCartWithSubtotals,
    },
  };
}
