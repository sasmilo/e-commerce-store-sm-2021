import Head from 'next/head';
import Layout from '../../components/Layout';

export default function Products(props) {
  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>
      <h1>Our Products by Categories</h1>
      <ul>
        {props.products.map((product) => (
          <li key={`product-${product.id}`}>
            {product.category}
            {/* {product.productName} */}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { getProductInformation } = await import('../../database');

  const products = getProductInformation();
  return {
    props: {
      products: products,
    },
  };
}
