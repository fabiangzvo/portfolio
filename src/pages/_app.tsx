import { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";

import Navbar from "@components/navbar";

import "../styles/globals.css";
import "../styles/keyframes.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
        timeZone="America/Bogota"
      >
        <Component {...pageProps} />
      </NextIntlClientProvider>
    );

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone="America/Bogota"
    >
      <ThemeProvider attribute="class" defaultTheme="light">
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
