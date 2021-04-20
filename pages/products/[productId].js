import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { addProductToCookieCart } from '../../components/addToCart';
import Layout from '../../components/Layout';
import { setCartCookieClientSide } from '../../components/setCartCookie';
import { removeProductFromCart } from '../../util/cookies';

const ourRed = '#8e0b0b';
const paddBott = '20px';

const singleProductStyle = css`
  display: block;
  align-items: center;
`;

const productNameStyle = css`
  font-family: 'Crimson Text Regular', 'PT Sans', 'Helvetica', 'Arial',
    sans-serif;
  text-align: center;
  padding-bottom: ${paddBott};
`;

const productImageStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: ${paddBott};
`;

const productPriceStyle = css`
  font-family: 'Source Sans Pro Regular', 'PT Sans', 'Helvetica', 'Arial',
    sans-serif;
  text-align: center;
  padding-bottom: ${paddBott};

  p {
    font-size: 1.2em;
  }

  p + p {
    font-size: 0.8em;
  }
`;

const productButtonsStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: ${paddBott};

  button {
    display: inline-block;
    padding: 0.35em 1.2em;
    border: 0.1em solid #ffffff;
    border-radius: 15px;
    background-color: ${ourRed};
    margin: 0 0.3em 0.3em 0;
    border-radius: 0.12em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    font-size: 0.8em;
    font-weight: 500;
    color: white;
    text-align: center;
    transition: all 0.2s;
    cursor: pointer;

    :hover {
      transform: scale(1.05);
      transition: all 0.2s ease-in-out;
    }
  }
`;

const productDescriptionStyle = css`
  font-family: 'Source Sans Pro Regular', 'PT Sans', 'Helvetica', 'Arial',
    sans-serif;
  text-align: center;
  padding-bottom: ${paddBott};
  font-size: 0.8em;
  max-width: 80%;
  margin: auto;
`;

const productDetailsStyle = css`
  font-family: 'Source Sans Pro Regular', 'PT Sans', 'Helvetica', 'Arial',
    sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: ${paddBott};
  font-size: 0.6em;

  p + p {
    padding-left: 10px;
  }
`;

export default function SingleProduct(props) {
  const [cart, setCart] = useState(props.cartCookieValue);

  useEffect(() => {
    setCartCookieClientSide(cart);
  }, [cart]);

  if (!props.product) {
    return (
      <Layout finalShoppingCart={cart}>
        <Head>
          <title>Product not found</title>
        </Head>
        <div css={singleProductStyle}>
          <h1>Product not found</h1>
          <p>Would you be interested in some of our other cool hats?</p>
          <Link href="/">
            <a>Check them out!</a>
          </Link>
        </div>
      </Layout>
    );
  }

  const quantityInTheCart = cart.find(
    (quantity) => quantity.id === props.product.id,
  );

  return (
    <Layout finalShoppingCart={cart}>
      <Head>
        <title>Single Product</title>
      </Head>
      <div css={singleProductStyle}>
        <div css={productNameStyle}>
          <h1>{props.product.productName}</h1>
        </div>
        <div css={productImageStyle}>
          <Image
            src={`/${props.product.productImage}`}
            alt="Hat"
            width={250}
            height={250}
          />
        </div>
        <div css={productPriceStyle}>
          <p>
            <strong>Price: {props.product.productPrice.toFixed(2)} €</strong>
          </p>
          <p>
            Quantity of this item in the cart:{' '}
            <span data-cy="product-page-amount-in-cart">
              {quantityInTheCart?.quantity || 0}
            </span>
          </p>
        </div>
        <div css={productButtonsStyle}>
          <button
            data-cy="button-add-to-cart"
            onClick={() => {
              const newCart = addProductToCookieCart(cart, props.product.id);
              setCart(newCart);
            }}
          >
            Add to cart
          </button>
          <button
            data-cy="button-remove-from-cart"
            onClick={() => {
              const newCart = removeProductFromCart(cart, props.product.id);
              setCart(newCart);
            }}
          >
            Remove from cart
          </button>
          <Link href="../cart">
            <a data-cy="link-go-to-cart">
              <Image
                src="/shopping-cart.png"
                alt="Shopping cart"
                width={35}
                height={35}
              />
            </a>
          </Link>
        </div>
        <div css={productDescriptionStyle}>
          <p>
            <strong>Description:</strong>
            <br /> <br /> {props.product.description}
          </p>
        </div>
        <div css={productDetailsStyle}>
          <p>id: {props.product.id}</p>
          <p>Category: {props.product.category}</p>
          <p>Tags: {props.product.productTags}</p>

          {/* <p>
            <a
              href={`/products/update-product-name/${props.product.id}`}
              style={{ color: 'red' }}
            >
              Update product name to Woooch!
            </a>
          </p>
          <p>
            <a
              href={`/products/delete/${props.product.id}`}
              style={{ color: 'red' }}
            >
              Delete product
            </a>
          </p> */}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {


  const { getProductById } = await import('../../util/database');

  const id = Number(context.query.productId);


  const product = await getProductById(id);

  if (!product) {
    context.res.statusCode = 404;
  }
  const cart = context.req.cookies.cart;
  const cartCookieValue = cart ? JSON.parse(cart) : [];

  return {
    props: {
      product: product || null,
      cartCookieValue: cartCookieValue,
    },
  };
}
