import { Html, Head, Main, NextScript } from "next/document";

import Footer from "@components/footer";

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head />
      <body className="w-full flex flex-col justify-center items-center">
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
