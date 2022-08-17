import Head from "next/head";
import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import SignIn from "../src/Auth/SignIn/SignIn";

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
        <title>SignIn: The Blog</title>
      </Head>

      <SignIn />
    </>
  );
}
