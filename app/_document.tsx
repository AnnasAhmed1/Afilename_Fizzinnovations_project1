import Document, { Html, Head, Main, NextScript } from "next/document";

export const metadata = {
  title: "AFILENAME",
  description: "AFILENAME",
};

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
