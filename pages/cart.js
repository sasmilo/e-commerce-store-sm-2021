import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getProductInformation } from '../util/database.js';

export default function ShoppingCart(props) {
  const cart = props.finalShoppingCart;
  // const [cart, setCart] = useState(props.cartCookieObject);
  // const products = props.products;

  // if (cart === []) {
  //   return (
  //     <Layout>
  //       <Head>
  //         <title>The cart is empty</title>
  //       </Head>
  //       <h1>Your cart is empty!</h1>
  //       <p>Would you be interested in some of our cool hats?</p>
  //     </Layout>
  //   );
  // }

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
            {props.finalShoppingCart.map((object) => (
              <li key={object.id}>
                {'  '}
                {object.productId}
                {'  '}
                {object.productImage}
                {'  '}
                {object.productName}
                {'  '}
                {object.productPrice}
                {'  '}
                {object.quantity}
              </li>
            ))}
          </ul>

          {/* <CartFunction products={products} cart={cart} setCart={setCart} /> */}
          <Link href="/checkout">
            <a data-cy="checkout-button">Go to checkout</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // const { getProductInformation } = await import('../util/database');
  // const products = await getProductInformation();
  // const cartCookie = Cookies.get('cart');

  //   const cartCookieObject = Cookies.getJSON('cart');

  const cart = context.req.cookies.cart;
  const cartCookieObject = cart ? JSON.parse(cart) : [];

  // console.log(cartCookieObject);

  // const id = Number(context.query.productId);
  // console.log('query', context.query);

  const products = await getProductInformation();

  // console.log(products);

  const finalShoppingCart = cartCookieObject.map((cookieProduct) => {
    return {
      ...products.find((product) => cookieProduct.id === product.id),
      quantity: cookieProduct.quantity,
    };
  });

  // console.log(finalShoppingCart);

  return {
    props: {
      cartCookieObject: cartCookieObject,
      products: products,
      finalShoppingCart: finalShoppingCart,
    },
  };
}
