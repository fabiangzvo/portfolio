import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from "@vercel/analytics/react";

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head />
      <body className="absolute lg:w-full flex flex-col justify-center items-center">
        <Analytics />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
