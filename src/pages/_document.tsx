import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head />
      <body className="w-full flex justify-center">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
