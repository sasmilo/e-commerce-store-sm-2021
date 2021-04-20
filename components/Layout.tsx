import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const ourRed = '#8e0b0b';
const ourGray = '#1d2d35';
const lightGray = '#f5f5f5';
const footerGray = '#171727';

const headerStyles = css`
  background: ${lightGray};
  color: ${ourGray};
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px;

  div {
    display: flex;
    flex-direction: row;
  }

  a + a {
    margin-left: 25px;
  }
`;

const headerDiv1 = css`
  padding-right: auto;
`;

const headerDiv2 = css`
  padding-top: 8px;
  padding-right: 28px;
  align-items: right;

  a {
    color: ${ourGray};
    text-decoration: none;
    display: block;
    padding: 12px 19px 0;
    margin-top: 10 px;
    outline-offset: -1px;
    transition: all 0.2s ease-in-out;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 2px;
    line-height: 1;
    text-transform: uppercase;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;

    :nth-of-type(4) {
      background-color: ${ourRed};
      border-radius: 50%;
      color: ${lightGray};
      margin: 35px 0 0 0;
      padding: 5px;
      font-size: 0.4rem;
      border: none;
      position: relative;
      right: 30px;
      top: -30px;
    }

    :hover {
      border-bottom: 2px solid ${ourRed};
    }
  }
`;

const navStyles = css`
  display: flex;
  justify-content: space-between;
`;

const footerStyles = css`
  border-top: 0.7px solid rgba(255, 255, 255, 0.5);
  padding: 0.6rem 0 0.7rem 0;
  background: ${footerGray};
  text-align: center;
  color: white;
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;

  p {
    opacity: 0.5;
    font-size: 0.75rem;
  }
  a {
    text-decoration: none;
    color: ${lightGray};
  }
`;

const bodyStyles = css`
  background: white;
  margin: 0;
  padding: 30px 0 0 0;
  min-height: 78.3vh;

  h1 {
    font-family: 'Crimson Text Regular', 'PT Sans', 'Helvetica', 'Arial',
      sans-serif;
  }

  p {
    font-family: 'Source Sans Pro Regular', 'PT Sans', 'Helvetica', 'Arial',
      sans-serif;
  }
`;

type FinalShoppingCart = {
  id: number;
  category: string;
  productName: string;
  productPrice: number;
  description: string;
  productImage: string;
  productStock: number;
  productSize: string;
  productColor: string;
  productTags: string;
  quantity: number;
};

type Props = {
  finalShoppingCart: FinalShoppingCart[];
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const cart = props.finalShoppingCart;

  const numberOfItems = cart.reduce(
    (accumulator, current) => accumulator + current.quantity,
    0,
  );

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header css={headerStyles}>
        <nav css={navStyles}>
          <div css={headerDiv1}>
            <Link href="/">
              <a>
                <Image
                  src="/hatter-matter-logo2.png"
                  alt="hatter matter logo"
                  width={207}
                  height={52}
                />
              </a>
            </Link>
          </div>
          <div css={headerDiv2}>
            <Link href="/about">
              <a>About</a>
            </Link>
            <Link href="/products">
              <a data-cy="header-products">Products</a>
            </Link>
            <Link href="/cart">
              <a data-cy="header-cart">
                <Image
                  src="/shopping-cart.png"
                  alt="shopping cart"
                  width={33}
                  height={30}
                />
              </a>
            </Link>
            <Link href="/cart">
              <a data-cy="header-items-in-the-cart">{numberOfItems}</a>
            </Link>
          </div>
        </nav>
      </header>
      <div css={bodyStyles}>{props.children}</div>
      <footer css={footerStyles}>
        <p>
          © 2021 · <a href="/">HatterMatter</a> · All rights reserved ·
        </p>
      </footer>
    </>
  );
}
