import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const headerStyles = css`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px;

  a + a {
    margin-left: 25px;
  }
`;

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header css={headerStyles}>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/products">
            <a>Products</a>
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
