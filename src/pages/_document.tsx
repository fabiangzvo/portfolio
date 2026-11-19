import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from "@vercel/analytics/react";
import { HeroUIProvider } from "@heroui/react";

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head />
      <body className="w-full overflow-x-clip flex flex-col justify-center [&>div]:w-full">
        <Analytics />
        <HeroUIProvider>
          <Main />
        </HeroUIProvider>
        <NextScript />
      </body>
    </Html>
  );
}
