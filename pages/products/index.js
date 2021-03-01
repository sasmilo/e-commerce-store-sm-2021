import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getProductInformation } from '../../util/database';

export default function Products(props) {
  const cart = props.finalShoppingCartWithSubtotals;
  return (
    <Layout cart={cart}>
      <Head>
        <title>Products</title>
      </Head>
      <h1>Perfect hat for every occasion!</h1>
      <ul>
        {props.products.map((product) => (
          <li key={`product-${product.id}`}>
            <Link href={`/products/${product.id}`}>
              <a>
                <Image
                  src={`/${product.productImage}`}
                  alt="Hat"
                  width={40}
                  height={40}
                />
                {/* {product.category} */}
                {'  '}
                {product.productName}
              </a>
            </Link>
          </li>
        ))}
      </ul>
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
