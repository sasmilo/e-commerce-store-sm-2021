import Head from 'next/head';
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
      <Layout>
        <Head>
          <title>Product not found</title>
        </Head>
        <h1>Product not found</h1>
        <p>Would you be interested in some of our other cool hats?</p>
      </Layout>
    );
  }

  const quantityInTheCart = cart.find(
    (quantity) => quantity.productId === props.product.id,
  );

  return (
    <Layout>
      <Head>
        <title>Single Product</title>
      </Head>
      <h1>Single product page</h1>

      <h2>id: {props.product.id}</h2>
      <h2>Category: {props.product.category}</h2>
      <p>Tags: {props.product.productTags}</p>
      <h2>Product name: {props.product.productName}</h2>
      <p>Price: {props.product.productPrice} €</p>
      <p>On stock: {props.product.productStock}</p>

      <div>Number of items in the cart: {quantityInTheCart?.quantity || 0}</div>
      <button
        onClick={() => {
          const newCart = addProductToCart(cart, props.product.id);
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
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // console.log('c', context);

  const { getProductInformation } = await import('../../util/database');

  const id = Number(context.query.productId);
  // console.log('query', context.query);

  const products = await getProductInformation(id);
  const product = products.find((product) => product.id === id);

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
