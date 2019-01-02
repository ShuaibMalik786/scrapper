const puppeteer = require("puppeteer");
const rp = require("request-promise");
const $ = require("cheerio");

module.exports = async function(html) {
  const urls = await scrapeUrls(html);
  const images = await getImageName(urls);
  return images;
};

async function scrapeUrls(html) {
  try {
    let images = [];
    for (let i = 0; i < $("._2xsyJg", html).length; i++) {
      var pattern = new RegExp("https://rukminim1" + "(.*)" + "?q=90");
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

async function getImageName(images) {
  let object;
  let urls = [];
  for (let i = 0; i < images.length; i++) {
    const pattern = new RegExp(
      "https://rukminim1.flixcart.com/blobio/248/248/" + "(.*)" + "?q=90"
    );
    let [smallImage, imageName] = pattern.exec(images[i]);
    object = {
      smallImage: smallImage,
      largeImage: `https://rukminim1.flixcart.com/blobio/1160/1160/${imageName}`
    };
    urls.push(object);
  }
  return urls;
}
