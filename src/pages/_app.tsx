import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";

import Navbar from "@components/navbar";
import { useProviders } from "@hooks/useProviders";
import Footer from "@components/footer";

import "../styles/globals.css";
import "../styles/keyframes.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { Providers, setProviders } = useProviders([
    {
      name: "translate",
      Component: NextIntlClientProvider,
      config: {
        locale: router.locale,
        messages: pageProps.messages,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    },
  ]);

  useEffect(() => {
    setProviders &&
      setProviders({
        action: "add",
        provider: {
          name: "theme",
          Component: ThemeProvider,
          config: { attribute: "class", defaultTheme: "light" },
        },
      });
  }, [setProviders]);

  useEffect(() => {
    setProviders &&
      setProviders({
        action: "modify",
        provider: {
          name: "translate",
          config: { locale: router.locale, messages: pageProps.messages },
        },
      });
  }, [router.locale, setProviders, pageProps.messages]);

  return (
    <div className="flex flex-col">
      <Providers>
        <Navbar />
        <Component {...pageProps} />
      </Providers>
      <Footer />
    </div>
  );
}
