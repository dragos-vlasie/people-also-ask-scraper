import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const FourOFour: NextPage = () => {
  
  return (
    <>
      <Head>
        <title>Unde Dede 404</title>
        <meta name="description" content="Not the page you are looking for" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Nothing to see here</h1>
      <h2>
      <Link href={"/"}>Go back to the homepage</Link>
      </h2>
    </>
  );
};

export default FourOFour;
