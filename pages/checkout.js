import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Router from 'next/router';
import * as Yup from 'yup';
import Layout from '../components/Layout';
import { deleteAllProductsFromCookieCart } from '../util/cookies.js';
import { getProductInformation } from '../util/database.js';

export default function Checkout(props) {
  const cart = Cookies.get('cart');
  const cartCookieObject = cart ? JSON.parse(cart) : [];
  const totalValue = props.totalValue;

  function redirect() {
    Router.push(`/thankyou`);
    deleteAllProductsFromCookieCart();
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
      shipping: Yup.string().min(2, 'Invalid address').required('Required'),
      city: Yup.string().min(2, 'Invalid address').required('Required'),
      zip: Yup.string().required('Required'),
      card: Yup.number()
        .min(123456789012, 'Invalid card number')
        .required('Required'),
    }),
    onSubmit: () => {
      alert('Your purchase has been submitted');
      redirect();
    },
  });

  return (
    <Layout finalShoppingCart={cartCookieObject}>
      <Head>
        <title>Checkout</title>
      </Head>
      <div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <p>
              Total Purchase: <strong>{`${totalValue.toFixed(2)} €`}</strong>
            </p>
            <br />
            <label htmlFor="firstName">First Name</label>
            {'   '}
            <input
              data-cy="input-first-name"
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
            <br />
            <label htmlFor="lastName">Last Name</label>
            {'   '}
            <input
              data-cy="input-last-name"
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
            <br />
            <label htmlFor="email">Email Address</label>
            {'   '}
            <input
              data-cy="input-email"
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
            <br />
            <label htmlFor="shipping">Shipping Address</label>
            {'   '}
            <input
              data-cy="input-address"
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
            <br />
            <label htmlFor="city">City</label>
            {'   '}
            <input
              data-cy="input-city"
              id="city"
              name="city"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city ? (
              <div>{formik.errors.city}</div>
            ) : null}
            <br />
            <label htmlFor="zip">ZIP</label>
            {'   '}
            <input
              data-cy="input-zip"
              id="zip"
              name="zip"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.zip}
            />
            {formik.touched.zip && formik.errors.zip ? (
              <div>{formik.errors.zip}</div>
            ) : null}
            {'   '}
            <br />
            <label htmlFor="card">Card Number</label>
            {'   '}
            <input
              data-cy="input-card-number"
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
            {'   '}
            <button data-cy="button-buy-now" type="submit">
              BUY NOW
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cart = context.req.cookies.cart;
  const cartCookieObject = cart ? JSON.parse(cart) : [];

  const products = await getProductInformation();

  const finalShoppingCart = cartCookieObject.map((cookieProduct) => {
    return {
      ...products.find((product) => cookieProduct.id === product.id),
      quantity: cookieProduct.quantity,
    };
  });

  const totalValue = finalShoppingCart.reduce(function (
    accumulator,
    currentValue,
  ) {
    const subtotal = currentValue.productPrice * currentValue.quantity;
    return accumulator + subtotal;
  },
  0);

  return {
    props: {
      totalValue: totalValue,
    },
  };
}
