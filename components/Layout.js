import Head from 'next/head';
import Link from 'next/link';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={{ border: '1px solid #ddd', borderRadius: 5, padding: 8 }}>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            maxWidth: 200,
          }}
        >
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
        </nav>
      </header>
      {props.children}
      <footer style={{ borderTop: '1px solid #ddd', padding: 8 }}>
        Footer
      </footer>
    </>
  );
}
