import Head from "next/head";

import SignIn from "../src/Auth/SignIn/SignIn";

export default function Home() {
  return (
    <>
      <Head>
        <title>SignIn: The Blog</title>
      </Head>

      <SignIn />
    </>
  );
}
