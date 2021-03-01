import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import { getProductInformation } from '../util/database';

export default function Home(props) {
  const cart = props.finalShoppingCartWithSubtotals;
  return (
    <Layout cart={cart}>
      <Head>
        <title>Home</title>
      </Head>
      <h1>HatterMatter</h1>
      <Image
        src="/online-store.jpg"
        alt="Store icon"
        width={328}
        height={246}
      />
      <p>Here you can find the hat for every head!</p>
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

  // console.log(finalShoppingCartWithSubtotals);

  return {
    props: {
      cartCookieObject: cartCookieObject,
      products: products,
      finalShoppingCartWithSubtotals: finalShoppingCartWithSubtotals,
    },
  };
}
