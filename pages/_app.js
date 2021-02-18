import { css, Global } from '@emotion/react';
import '../styles/globals.css';

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        background: papayawhip;
        min-height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 24px;
      }
    `}
  />
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
