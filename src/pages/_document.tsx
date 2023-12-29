import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head />
      <body className="absolute lg:w-full flex flex-col justify-center items-center">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
