import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Cart(props) {
  return (
    <Layout>
      <Head>
        <title>Cart</title>
      </Head>
      <h1>Shopping cart</h1>
      <ul>
        {props.products.map((product) => (
          <li key={`product-${product.id}`}>
            <Link href={`/products/${product.id}`}>
              <a>
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

export async function getServerSideProps() {
  const { getProductInformation } = await import('../../util/database');

  const products = await getProductInformation();
  return {
    props: {
      products: products,
    },
  };
}
