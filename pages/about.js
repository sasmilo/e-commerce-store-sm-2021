import Head from 'next/head';
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <h1>About us</h1>
      <p>This store is as cool as it gets!</p>
    </Layout>
  );
}
