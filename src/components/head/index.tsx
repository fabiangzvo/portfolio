import React from "react";
import Head from "next/head";

function MainPageHead() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>fabiangzvo | portfolio</title>
      <meta name="og:title" content="fabiangzvo | portfolio" />
      <meta
        name="og:description"
        content="This portfolio of Fabián Guzmán Otavo, a web developer. - @fabiangzvo"
      />
      <meta
        name="description"
        content="This portfolio of Fabián Guzmán Otavo, a web developer. - @fabiangzvo"
      />
      <meta name="robots" content="index,follow" />
      <meta
        name="og:keywords"
        content="fabiangzvo, portfolio, react, frontend, full stack, developer"
      />
    </Head>
  );
}

export default MainPageHead;
