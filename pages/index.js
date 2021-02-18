import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Home page</h1>
      <Image
        src="/online-store.jpg"
        alt="Store icon"
        width={328}
        height={246}
      />
      <p>This is the home page of my awesome e-store!</p>
    </Layout>
  );
}
