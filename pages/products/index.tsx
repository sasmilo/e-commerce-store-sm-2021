import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
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

type CartCookieObject = {
  id: number;
  quantity: number;
};

type Props = {
  finalShoppingCart: FinalShoppingCart[];
  products: DBProduct[];
};

export default function Products(props: Props) {
  const cart = props.finalShoppingCart;
  return (
    <Layout finalShoppingCart={cart}>
      <Head>
        <title>Products</title>
      </Head>
      <div css={productPageStyles}>
        <ul data-cy="product-page-content">
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
      cartCookieObject: cartCookieObject,
      products: products,
      finalShoppingCart: finalShoppingCart,
    },
  };
}
