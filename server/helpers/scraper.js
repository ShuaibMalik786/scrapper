const puppeteer = require("puppeteer");
const rp = require("request-promise");
const $ = require("cheerio");

module.exports = async function(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.click("._1pnbvM");
  await page.waitFor(500);
  const content = await page.content();
  const urls = await scrapeUrls(content);
  // await browser.close();
  return urls;
};

async function scrapeUrls(html) {
  try {
    let images = [];
    for (let i = 0; i < $("._2xsyJg", html).length; i++) {
      var pattern = new RegExp("https://rukminim1" + "(.*)" + ".jpg");
      let [imageUrl, ...something] = pattern.exec(
        $("._2xsyJg", html)[i].attribs.style
      );
      images.push(imageUrl);
    }
    return images;
  } catch (err) {
    //handle error
    return "scrapper error";
  }
}
