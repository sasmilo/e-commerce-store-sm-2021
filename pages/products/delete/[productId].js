import Head from 'next/head';
import Layout from '../../../components/Layout';

export default function DeleteProduct(props) {
  if (!props.product) {
    return <div>Product id doesn't exist.</div>;
  }

  return (
    <Layout>
      <Head>
        <title> Deleted a product!</title>
      </Head>
      <h1>Delete successful!</h1>
      <p>You have successfully deleted {props.product.productName}!</p>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { deleteProductById } = await import('../../../util/database');
  const id = context.query.productId;
  const product = await deleteProductById(id);

  return {
    props: {
      product: product || null,
    },
  };
}
