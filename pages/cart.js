import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { addProductToRealCart } from '../components/addToCart';
import Layout from '../components/Layout';
import { setCartCookieClientSide } from '../components/setCartCookie';
import { totalSum } from '../components/totalSumFunction';
import { removeProductFromCart } from '../util/cookies';
import { getProductInformation } from '../util/database';

const paddBott = '20px';
const ourGray = '#1d2d35';
const ourRed = '#8e0b0b';
const lightGray = '#f5f5f5';

const cartStyle = css`
  display: block;
  align-items: center;

  h1 {
    font-family: 'Crimson Text Regular', 'PT Sans', 'Helvetica', 'Arial',
      sans-serif;
    text-align: center;
    padding-bottom: ${paddBott};
  }

  p {
    font-size: 1.2em;
    font-family: 'Source Sans Pro Regular', 'PT Sans', 'Helvetica', 'Arial',
      sans-serif;
    text-align: center;
  }

  div {
    display: flex;
    justify-content: space-around;
  }

  a {
    font-size: 1.2em;
    font-family: 'Source Sans Pro Regular', 'PT Sans', 'Helvetica', 'Arial',
      sans-serif;
    display: block;
    text-align: center;
    text-decoration: none;
    font-weight: 550;
    color: ${lightGray};
    background-color: ${ourRed};
    text-transform: uppercase;
    border: 2px solid ${ourRed};
    border-radius: 20px;
    padding: 5px 15px;
  }
`;

const listStyle = css`
  color: ${ourGray};
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 1;
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
  display: flex;
  text-align: center;
  align-items: center;

  ul {
    margin: 0 auto;
    padding-bottom: 20px;
  }

  li {
    display: grid;
    justify-content: stretch;
    grid-template-columns: 1fr 5fr 4fr 1fr 2fr 1fr 3fr;
    padding-bottom: 5px;
  }

  button {
    background-color: ${ourRed};
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    font-size: 0.8em;
    font-weight: 500;
    color: white;
    text-align: center;
    border: none;
    border-radius: 10%;
    margin: 5px;
    cursor: pointer;
  }

  p {
    padding-top: 12px;
  }
`;



export default function ShoppingCart(props) {
  const [cart, setCart] = useState(props.finalShoppingCart);

  useEffect(() => {
    setCartCookieClientSide(cart);
  }, [cart]);

  const totalValue = totalSum(cart);


  if (cart === [] || cart === null) {
    return (
      <Layout finalShoppingCart={cart}>
        <Head>
          <title>The cart is empty</title>
        </Head>
        <div>
          {' '}
          css={cartStyle}
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
        </div>
      </Layout>
    );
  }
  return (
    <Layout finalShoppingCart={cart}>
      <Head>
        <title>Cart</title>
      </Head>
      <div>
        <div>
          <div css={cartStyle}>
            <h1>Items in your shopping cart:</h1>
          </div>
          <div css={listStyle}>
            <ul>
              <li>
                <Image
                  src="/transparent-image.png"
                  alt="logo"
                  width={40}
                  height={10}
                />
                <p>Item</p>
                <p>Unit Price</p>
                <p> </p>
                <p>Qty</p>
                <p> </p>
                <p>Subtotal</p>
              </li>
            </ul>
          </div>
          <div css={listStyle}>
            <ul>
              {cart.map((object) => (
                <li key={object.id}>
                  <Image
                    src={`/${object.productImage}`}
                    alt="Hat"
                    width={40}
                    height={40}
                  />
                  <p>{object.productName}</p>
                  <p>
                    {object.productPrice.toFixed(2)}€{'  '}
                  </p>
                  <button
                    data-cy="cart-button-remove-from-cart"
                    onClick={() => {
                      const newCart = removeProductFromCart(cart, object.id);
                      setCart(newCart);
                    }}
                  >
                    -
                  </button>
                  <p data-cy="amount-of-one-product-in-cart">
                    {/* Just in order to make string out of the next line */}
                    {object.quantity.toFixed(0)}
                  </p>

                  <button
                    data-cy="cart-button-add-to-cart"
                    onClick={() => {
                      const newCart = addProductToRealCart(cart, object.id);
                      setCart(newCart);
                    }}
                  >
                    +
                  </button>
                  <p>{(object.productPrice * object.quantity).toFixed(2)}€</p>
                </li>
              ))}
            </ul>
          </div>
          <div css={cartStyle}>
            <p data-cy="final-value-of-the-empty-cart">
              <strong>Total: {`${totalValue.toFixed(2)} €`}</strong>
            </p>
            <div>
              <Link href="/checkout">
                <a data-cy="go-to-checkout">Go to checkout</a>
              </Link>
              <Link href="/products">
                <a data-cy="go-back-to-shop">Shop some more</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cart = context.req.cookies.cart;
  const cartCookieObject = cart ? JSON.parse(cart) : [];



  const products = await getProductInformation();



  const finalShoppingCart = cartCookieObject.map((cookieProduct) => {
    return {
      ...products.find((product) => cookieProduct.id === product.id),
      quantity: cookieProduct.quantity,
    };
  });

  return {
    props: {
      finalShoppingCart: finalShoppingCart,
    },
  };
}
