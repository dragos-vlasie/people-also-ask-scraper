import type { NextPage } from "next";
import { Gallery, ThumbnailImageProps } from "react-grid-gallery";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";
import TimelineComponent from "@/components/molecules/TimelienComponent";
import { attributes, react as HomeContent } from "../../content/home.md";

const Home: NextPage = () => {
  let { title, pageDescription } = attributes;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TimelineComponent />
    </>
  );
};

export default Home;
