import Cookies from 'js-cookie';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function About() {
  const cart = Cookies.get('cart');
  const cartCookieObject = cart ? JSON.parse(cart) : [];
  return (
    <Layout finalShoppingCart={cartCookieObject}>
      <Head>
        <title>About</title>
      </Head>
      <h1>About us</h1>
      <p>This store is as cool as it gets!</p>
    </Layout>
  );
}
