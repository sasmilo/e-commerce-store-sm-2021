import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Home page</h1>
      <p>This is the home page of my awesome e-store!</p>
    </Layout>
  );
}
