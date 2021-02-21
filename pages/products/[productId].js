import Head from 'next/head';
import Layout from '../../components/Layout';

export default function SingleProduct(props) {
  if (!props.product) {
    return (
      <Layout>
        <Head>
          <title>Product not found</title>
        </Head>
        <h1>Product not found</h1>
        <p>Would you be interested in some of our other cool hats?</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Single Product</title>
      </Head>
      <h1>Single product page</h1>

      <h2>id: {props.product.id}</h2>
      <h2>Category: {props.product.category}</h2>
      <p>Tags: {props.product.productTags}</p>
      <h2>Product name: {props.product.productName}</h2>
      <p>Price: {props.product.productPrice}</p>
      <p>On stock: {props.product.productStock}</p>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // console.log('c', context);

  const { getProductInformation } = await import('../../database');

  const id = Number(context.query.productId);
  // console.log('query', context.query);

  const products = await getProductInformation(id);
  const product = products.find((product) => product.id === id);

  if (!product) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      product: product || null,
    },
  };
}
