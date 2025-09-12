import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from "@vercel/analytics/react";
import { HeroUIProvider } from "@heroui/react";

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head />
      <body className="lg:w-full flex flex-col justify-center items-center">
        <Analytics />
        <HeroUIProvider>
          <Main />
        </HeroUIProvider>
        <NextScript />
      </body>
    </Html>
  );
}
