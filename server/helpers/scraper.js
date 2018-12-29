const rp = require("request-promise");
const $ = require("cheerio");

module.exports = async function(url) {
  try {
    let images = [];
    const html = await rp(url);
    console.log($("._3rw8Cw", html).length);
    for (let i = 0; i < $("._3rw8Cw", html).length; i++) {
      var pattern = new RegExp("https://rukminim1" + "(.*)" + ".jpg");
      let [ imageUrl, ...something ] = pattern.exec($("._3rw8Cw", html)[i].attribs.style);
      images.push(imageUrl);
    }
    return images;
  } catch (err) {
    //handle error
    return "scrapper error";
  }
};
