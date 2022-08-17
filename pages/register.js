import Head from "next/head";
import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import Register from "../src/Auth/Register/Register";

export default function Home() {
  const { status } = useSession();
  const { replace } = useRouter();

  if (status === "authenticated") {
    replace("/");
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Register: The Blog</title>
      </Head>

      <Register />
    </>
  );
}
