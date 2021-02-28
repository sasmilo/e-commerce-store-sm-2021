import Head from 'next/head';
import Layout from '../../../components/Layout';

export default function UpdateProductName(props) {
  if (!props.product) {
    return <div>Product id doesn't exist.</div>;
  }

  return (
    <Layout>
      <Head>
        <title> Updated a product!</title>
      </Head>
      <h1>Update successful!</h1>
      <p>
        You have successfully updated product name to{' '}
        {props.product.productName}!
      </p>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { updateProductNameById } = await import('../../../util/database');
  const id = context.query.productId;
  const product = await updateProductNameById(id, 'Woooch!');

  return {
    props: {
      product: product || null,
    },
  };
}
