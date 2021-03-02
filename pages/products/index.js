import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getProductInformation } from '../../util/database';

const ourGray = '#1d2d35';

const productPageStyles = css`
  color: ${ourGray};
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 1;
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
  display: flex;

  ul {
    display: grid;
    justify-content: stretch;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    list-style-type: none;
    padding: 40px;
  }

  a {
    text-decoration: none;
    color: ${ourGray};
    text-align: center;
  }

  li {
    padding: 30px;
    align-self: stretch;
  }
`;

const productImageStyles = css`
  border-radius: 10px;
`;

export default function Products(props) {
  const cart = props.finalShoppingCartWithSubtotals;
  return (
    <Layout cart={cart}>
      <Head>
        <title>Products</title>
      </Head>
      <div css={productPageStyles}>
        {/* <h1>Perfect hat for every occasion!</h1> */}
        <ul>
          {props.products.map((product) => (
            <li key={`product-${product.id}`}>
              <Link href={`/products/${product.id}`}>
                <a>
                  <Image
                    css={productImageStyles}
                    src={`/${product.productImage}`}
                    alt={product.productName}
                    width={250}
                    height={250}
                  />
                  <br />
                  {'  '}
                  {'  '}
                  {product.productName}
                </a>
              </Link>
            </li>
          ))}
        </ul>
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

  // console.log(finalShoppingCartWithSubtotals);

  return {
    props: {
      cartCookieObject: cartCookieObject,
      products: products,
      finalShoppingCartWithSubtotals: finalShoppingCartWithSubtotals,
    },
  };
}
