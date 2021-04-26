import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function ThankYou() {
  const cart = Cookies.get('cart');
  const cartCookieObject = cart ? JSON.parse(cart) : [];
  return (
    <Layout finalShoppingCart={cartCookieObject}>
      <Head>
        <title>Thank you</title>
      </Head>
      <h1 data-cy="thank-you">Thank you for your purchase!</h1>

      <p>Would you like to shop some more?</p>
      <Link href="products">
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
