import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <NextScript />
        </Head>

        <body>
          <Main />

          <div id="notification" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
