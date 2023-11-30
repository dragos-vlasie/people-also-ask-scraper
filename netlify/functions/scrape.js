// functions/scrape.js
const puppeteer = require('puppeteer');

exports.handler = async function (event, context) {
  try {
    const queries = event.queryStringParameters.queries.split(',');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const results = {};

    for (const query of queries) {
      const searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      await page.goto(searchURL);
      await page.waitForSelector('.related-question-pair');

      const questions = await page.$$eval('.related-question-pair', (boxes) =>
        boxes.map((box) => box.textContent)
      );

      results[query] = questions;
    }

    await browser.close();

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (error) {
    console.error('Error in serverless function:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};