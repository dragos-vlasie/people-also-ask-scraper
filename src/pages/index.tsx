import type { NextPage } from "next";
import { Gallery, ThumbnailImageProps } from "react-grid-gallery";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";
import TimelineComponent from "@/components/molecules/TimelienComponent";
import { attributes, react as HomeContent } from "../../content/home.md";
import axios from 'axios';

const Home: NextPage = () => {
  let { title, pageDescription } = attributes;
const [results, setResults] = useState({});

  const fetchResults = async () => {
    try {
      const response = await axios.get('/.netlify/functions/scrape', {
        params: {
          queries: "Crypto Guide,Decentralized finance (DeFi),...etc",
        },
      });

      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };
  

  return (
    <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={pageDescription} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>
      <button onClick={fetchResults}>Fetch Results</button>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  </>
  );
}

export default Home;
