import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";

import Navbar from "@components/navbar";
import { useProviders } from "@hooks/useProviders";

import "../styles/globals.css";
import "../styles/keyframes.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { Providers, setProviders } = useProviders([
    {
      Component: NextIntlClientProvider,
      config: {
        locale: router.locale,
        messages: pageProps.messages,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    },
  ]);

  useEffect(() => {
    setProviders({
      action: "add",
      provider: {
        Component: ThemeProvider,
        config: { attribute: "class", defaultTheme: "light" },
      },
    });
  }, [setProviders]);

  return (
    <Providers>
      <Navbar />
      <Component {...pageProps} />
    </Providers>
  );
}
