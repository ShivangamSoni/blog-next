import Head from "next/head";

import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";

import StateProvider from "../src/Context/state";
import reducer from "../src/Context/reducer";

import Layout from "../src/common/Layout/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>The Blog</title>
      </Head>

      <SessionProvider session={session}>
        <StateProvider reducer={reducer}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StateProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
