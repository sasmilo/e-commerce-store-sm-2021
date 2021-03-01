import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import {
  addProductToCart,
  removeProductFromCart,
  setCartCookieClientSide,
} from '../../util/cookies';

export default function SingleProduct(props) {
  const [cart, setCart] = useState(props.cartCookieValue);

  useEffect(() => {
    setCartCookieClientSide(cart);
  }, [cart]);

  if (!props.product) {
    return (
      <Layout cart={cart}>
        <Head>
          <title>Product not found</title>
        </Head>
        <h1>Product not found</h1>
        <p>Would you be interested in some of our other cool hats?</p>
        <Link href="/">
          <a>Check them out!</a>
        </Link>
      </Layout>
    );
  }

  const quantityInTheCart = cart.find(
    (quantity) => quantity.id === props.product.id,
  );

  return (
    <Layout cart={cart}>
      <Head>
        <title>Single Product</title>
      </Head>
      <h1>{props.product.productName}</h1>
      <Image
        src={`/${props.product.productImage}`}
        alt="Hat"
        width={200}
        height={200}
      />
      <p>Price: {props.product.productPrice} €</p>
      <div>In the cart: {quantityInTheCart?.quantity || 0}</div>
      <button
        onClick={() => {
          const newCart = addProductToCart(
            cart,
            props.product.id,
            props.product.productName,
            props.product.productPrice,
          );
          setCart(newCart);
        }}
      >
        Add to cart
      </button>
      <button
        onClick={() => {
          const newCart = removeProductFromCart(cart, props.product.id);
          setCart(newCart);
        }}
      >
        Remove from cart
      </button>
      <Link href="../cart">
        <a>Go to your cart</a>
      </Link>
      <p>Description: {props.product.description}</p>
      <p>id: {props.product.id}</p>
      <p>Category: {props.product.category}</p>
      <p>Tags: {props.product.productTags}</p>

      <p>On stock: {props.product.productStock}</p>
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
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // console.log('c', context);

  const { getProductById } = await import('../../util/database');

  const id = Number(context.query.productId);
  // console.log('query', context.query);

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
