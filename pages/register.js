import Head from "next/head";

import Register from "../src/Auth/Register/Register";

export default function Home() {
  return (
    <>
      <Head>
        <title>Register: The Blog</title>
      </Head>

      <Register />
    </>
  );
}
