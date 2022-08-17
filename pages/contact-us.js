import Head from "next/head";
import ContactUs from "../src/ContactUs/ContactUs";

export default function Home() {
  return (
    <>
      <Head>
        <title>Contact Us: The Blog</title>
      </Head>

      <ContactUs />
    </>
  );
}
