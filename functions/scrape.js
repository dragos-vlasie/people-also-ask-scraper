const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

exports.handler = async function (event, context) {
  try {
    const requestBody = JSON.parse(event.body || '{}');
    const queries = requestBody.queries || [];
    console.log("----------", queries);

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: true,
    });

    const page = await browser.newPage();

    const results = {};

    for (const query of queries) {
      const searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      await page.goto(searchURL);

      const isSelectorPresent = await page.$('.related-question-pair');

      if (isSelectorPresent) {
        await page.waitForSelector('.related-question-pair');

        const questions = await page.$$eval('.related-question-pair', (boxes) =>
          boxes.map((box) => box.textContent)
        );

        results[query] = questions;
      } else {
        // If the selector is not present, provide a custom message
        results[query] = [
          "There are no 'People Also Ask Questions'. Please add more keywords or try another query.",
        ];
      }
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
