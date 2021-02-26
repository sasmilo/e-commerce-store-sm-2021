import { useFormik } from 'formik';
import Head from 'next/head';
import * as Yup from 'yup';
// import finalShoppingCart from '../cart.js';
import Layout from '../components/Layout';
import { sumOfProductsInCart } from '../util/cookies';
import { getProductInformation } from '../util/database.js';

export default function Checkout(props) {
  const products = props.products;
  const cart = props.finalShoppingCart;
  // console.log(cart);

  // function calculateTotal() {
  //   const total = cart.reduce((acc, curr) => {
  //     return (
  //       acc +
  //       curr.amount *
  //         products.filter((product) => product.id === curr.id)[0].price
  //     );
  //   }, 0);
  //   return total;
  // }

  function redirect() {
    window.location.href = 'thankyou';
    return false;
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      shipping: '',
      card: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(40, 'Must be 40 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(40, 'Must be 40 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      shipping: Yup.string().min(10, 'Invalid address').required('Required'),
      card: Yup.number()
        .min(123456789012, 'Invalid card number')
        .required('Required'),
    }),
    onSubmit: (values) => {
      alert('Your purchase has been submitted');
      redirect();
    },
  });

  return (
    <Layout>
      <Head>
        <title>Checkout</title>
      </Head>
      <div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <p>Total Purchase: {sumOfProductsInCart(cart)}€</p>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
            ) : null}
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
            <label htmlFor="shipping">Shipping Address</label>
            <input
              id="shipping"
              name="shipping"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shipping}
            />
            {formik.touched.shipping && formik.errors.shipping ? (
              <div>{formik.errors.shipping}</div>
            ) : null}
            <label htmlFor="card">Card Number</label>
            <input
              id="card"
              name="card"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.card}
            />
            {formik.touched.card && formik.errors.card ? (
              <div>{formik.errors.card}</div>
            ) : null}
            <button type="submit">BUY NOW</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // const { getProductInformation } = await import('../util/database');
  // const products = await getProductInformation();
  // const cartCookie = Cookies.get('cart');

  //   const cartCookieObject = Cookies.getJSON('cart');

  const cart = context.req.cookies.cart;
  const cartCookieObject = cart ? JSON.parse(cart) : [];

  // console.log(cartCookieObject);

  // const id = Number(context.query.productId);
  // console.log('query', context.query);

  const products = await getProductInformation();

  // console.log(products);

  const finalShoppingCart = cartCookieObject.map((cookieProduct) => {
    return {
      ...products.find((product) => cookieProduct.id === product.id),
      quantity: cookieProduct.quantity,
    };
  });

  // console.log(finalShoppingCart);

  return {
    props: {
      cartCookieObject: cartCookieObject,
      products: products,
      finalShoppingCart: finalShoppingCart,
    },
  };
}

// export async function getServerSideProps(context) {
//   const products = await getProductInformation();
//   const cart = context.req.cookies.cart;
//   const cartCookieObject = cart ? JSON.parse(cart) : [];

//   return {
//     props: {
//       cartCookieObject: cartCookieObject,
//       products: products,
//     },
//   };
// }
