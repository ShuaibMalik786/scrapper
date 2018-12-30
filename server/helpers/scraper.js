const puppeteer = require("puppeteer");
const rp = require("request-promise");
const $ = require("cheerio");

module.exports = async function (url) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.click("._1pnbvM");
    await page.waitFor(500);
    const content = await page.content();
    const urls = await scrapeUrls(content);
    const images = await getImageName(urls);
    // await browser.close();
    return images;
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


async function getImageName(images) {
    let object;
    let urls = [];
    for (let i = 0; i < images.length; i++) {
        const pattern = new RegExp("https://rukminim1.flixcart.com/blobio/248/248/" + "(.*)" + "?");
        let [smallImage, imageName] = pattern.exec(
            images[i]
        );
        object = {
            smallImage: smallImage,
            largeImage: `https://rukminim1.flixcart.com/blobio/1160/1160/${imageName}`
        };
        urls.push(object)

    }
    return urls;
}
