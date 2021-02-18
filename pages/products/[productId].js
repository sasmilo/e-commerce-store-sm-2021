import Head from 'next/head';
import Layout from '../../components/Layout';

export default function SingleProduct(props) {
  return (
    <Layout>
      <Head>
        <title>Single Product</title>
      </Head>
      <h1>Single product page</h1>

      <h2>id: {props.product.id}</h2>
      <h2>Category: {props.product.category}</h2>
      <h2>Product name: {props.product.productName}</h2>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // console.log('c', context);

  const { getProductInformation } = await import('../../database');

  const id = context.query.productId;

  const product = await getProductInformation(id);
  // const product = products.find((product) => product.id === id);
  if (!product) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      product: product[id],
    },
  };
}
