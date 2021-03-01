import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
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
  const cart = props.cart;
  // console.log(props);
  let numberOfItems = cart.reduce(
    (accumulator, current) => accumulator + current.quantity,
    0,
  );
  // console.log(numberOfItems);
  if (numberOfItems === undefined || numberOfItems === '0') {
    numberOfItems = '';
  }

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
          <Link href="/cart">
            <a>
              <Image
                src="/shopping-cart.png"
                alt="shopping cart"
                width={33}
                height={30}
              />
            </a>
          </Link>
          <Link href="/shopping-bag">
            <a data-cy="bag-icon" css={numberOfItems}>
              {numberOfItems}
            </a>
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
