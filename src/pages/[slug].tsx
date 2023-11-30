import type { NextPage } from "next";
import { Gallery, ThumbnailImageProps } from "react-grid-gallery";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { useState } from "react";
import TimeLineComponent from "@/components/molecules/TimelienComponent";
import Head from "next/head";
import fs from 'fs'
import matter from 'gray-matter'
import ReactMarkdown from "react-markdown";
import Icon from "../../public/images/icon.png"


const GalleryPage = ({frontmatter, markdown}) => {
  
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.pageDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="gallery">
        <div className="gallery-header">
          <div className="gallery-title-area">
            <h1>{frontmatter.title}</h1>
            <span>
              <img src={"/images/icon.png"} alt="" />
            </span>
          </div>
          <div className="galley-description-area">
            <div className="galley-description-location-details">
              <p>{frontmatter.location}</p>
            </div>
            <p>{frontmatter.intro}</p>
          </div>
        </div>
      <Gallery 
        enableImageSelection={false}
        rowHeight={frontmatter.rowHeight || 450}
        images={frontmatter.galleryImage} />
      {/* <ReactMarkdown >
        {markdown}
      </ReactMarkdown> */}
      </div>

    </>
  );
};


export async function getStaticProps({ params: { slug } }) {
  const fileContent = matter(fs.readFileSync(`./content/gallery/${slug}.md`, 'utf8'))
  let frontmatter = fileContent.data

  // Convert the date object to a string
  // frontmatter.date = frontmatter.date.toISOString()
  const markdown = fileContent.content
  

  return {
    props: { frontmatter, markdown }
  }
}

export async function getStaticPaths() {
  const filesInProjects = fs.readdirSync('./content/gallery')

  // Getting the filenames excluding .md extension
  // and returning an array containing slug (the filename) as params for every route
  // It looks like this
  // paths = [
  //   { params: { slug: 'my-first-blog' }},
  //   { params: { slug: 'how-to-train-a-dragon' }},
  //   { params: { slug: 'how-to-catch-a-pokemon' }},
  // ]
  const paths = filesInProjects.map(file => {
    const filename = file.slice(0, file.indexOf('.'))
    return { params: { slug: filename }}
  })

  return {
    paths,
    fallback: false // This shows a 404 page if the page is not found
  }
}

export default GalleryPage;
