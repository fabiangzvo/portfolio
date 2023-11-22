import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const translation = useTranslations("main");

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-around p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <h1 className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 text-6xl	font-extrabold">
            {translation("title")}
          </h1>
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../translations/${locale}.json`)).default,
    },
  };
}
