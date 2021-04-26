import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Home() {
  const cart = Cookies.get('cart');
  const cartCookieObject = cart ? JSON.parse(cart) : [];
  return (
    <Layout finalShoppingCart={cartCookieObject}>
      <Head>
        <title>Home</title>
      </Head>
      <h1>HatterMatter</h1>
      <p>We're serious about hat!</p>
      <Image
        src="/online-store.jpg"
        alt="Store icon"
        width={328}
        height={246}
      />
    </Layout>
  );
}
