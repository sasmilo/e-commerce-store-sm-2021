import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { getProductInformation } from '../util/database';

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

type CartCookieObject = {
  id: number;
  quantity: number;
};

type Props = {
  finalShoppingCart: FinalShoppingCart[];
};

export default function About(props: Props) {
  const cart = props.finalShoppingCart;
  return (
    <Layout finalShoppingCart={cart}>
      <Head>
        <title>About</title>
      </Head>
      <h1>About us</h1>
      <p>This store is as cool as it gets!</p>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cart = context.req.cookies.cart;
  const cartCookieObject = cart ? JSON.parse(cart) : [];



  const products = await getProductInformation();


  const finalShoppingCart = cartCookieObject.map(
    (cookieProduct: CartCookieObject) => {
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
      products: products,
      finalShoppingCart: finalShoppingCart,
    },
  };
}
