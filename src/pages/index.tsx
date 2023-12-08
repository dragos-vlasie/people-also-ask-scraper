import type { NextPage } from "next";
import { Gallery, ThumbnailImageProps } from "react-grid-gallery";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "next/head";
import TimelineComponent from "@/components/molecules/TimelienComponent";
import { attributes, react as HomeContent } from "../../content/home.md";
import axios from 'axios';
import QueryForm from '../components/QueryForm/QueryForm';
import styles from './index.module.scss';



const Home: NextPage = () => {
  let { title, pageDescription } = attributes;
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (queries) => {
    try {
      setLoading(true);
  
      // Convert the queries array to a query string
      const queryString = queries.join(',');
  
      const response = await fetch(`https://puppeteer-paa.onrender.com/scrape?queries=${queryString}`);
  
      if (!response.ok) {
        setError('Error fetching data');
        return;
      }
  
      const data = await response.json();


      const removeQueryString = (str) => str.split('?')[0].trim();

      const sanitizedData = Object.fromEntries(
        Object.entries(data).map(([key, value]: [any, any]) => [
          key,
          value.map((item) => removeQueryString(item) + "?"),
        ])
      );

      setResults(sanitizedData);
    } catch (error) {
      console.error('Error:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmitQueries = (queries) => {
    fetchData(queries);
  };
  
  const exportToCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
       Object.entries(results)
      .map(([category, questions]: [string, string[]]) => [category, ...questions.map((question) => `"${question}"`)].join(','))
      .join('\n');
    

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'questions.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
     <Head>
      <title>{title}</title>
      <meta name="description" content={pageDescription} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.Home}>
      <h1>People Also Ask Scraper</h1>
     <QueryForm onSubmit={handleSubmitQueries} />

    {loading && <p style={{fontSize:"24px", margin: "70px auto", textAlign: "center"}}>Loading... <span style={{fontSize:"14px"}}>Using a free service so it does take a while</span></p>}

     {!loading && results && <div className={styles.results}>
     { Object.entries(results).map(([category, questions]: [string, string[]])  => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={exportToCsv}>Export as CSV</button>
     </div>}
      {/* <pre>{results && JSON.stringify(results, null, 2)}</pre> */}
    </div>
    </>
  );
};


export default Home;


