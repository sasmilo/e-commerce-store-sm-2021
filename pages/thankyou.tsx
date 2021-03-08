import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getProductInformation } from '../util/database';

type CookieProduct = {
  id: number;
  quantity: number;
};

type DBProduct = {
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

type Props = {
  finalShoppingCart: FinalShoppingCart[];
};

export default function ThankYou(props: Props) {
  const cart = props.finalShoppingCart;
  return (
    <Layout finalShoppingCart={cart}>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cart = context.req.cookies.cart;
  const cartCookieObject = cart ? JSON.parse(cart) : [];

  // console.log(cartCookieObject);

  const products = await getProductInformation();

  // console.log(products);

  const finalShoppingCart = cartCookieObject.map(
    (cookieProduct: CookieProduct) => {
      return {
        ...products.find(
          (product: DBProduct) => cookieProduct.id === product.id,
        ),
        quantity: cookieProduct.quantity,
      };
    },
  );

  return {
    props: {
      cartCookieObject: cartCookieObject,
      products: products,
      finalShoppingCart: finalShoppingCart,
    },
  };
}
