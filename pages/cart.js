import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getProductInformation } from '../util/database.js';

export default function ShoppingCart(props) {
  const cart = props.finalShoppingCartWithSubtotals;

  const totalValue = cart.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.subtotal;
  }, 0);
  // const subtotal = cart.map(
  //   ({ productPrice, quantity }) => productPrice * quantity,
  // );

  if (cart === []) {
    return (
      <Layout>
        <Head>
          <title>The cart is empty</title>
        </Head>
        <h1>Your cart is empty!</h1>
        <p>Would you be interested in some of our cool hats?</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Cart</title>
      </Head>
      <div>
        <div>
          <div>
            <h1>Your Shopping Cart</h1>
          </div>

          <ul>
            {props.finalShoppingCartWithSubtotals.map((object) => (
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
                {object.quantity}
                {'  '}
                {object.subtotal.toFixed(2)}
                {'€'}
              </li>
            ))}
          </ul>
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
