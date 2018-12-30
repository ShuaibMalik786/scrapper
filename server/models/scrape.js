const Joi = require("joi");
const mongoose = require("mongoose");

const scrapeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  images: {
    type: Array,
    required: true
  }
});

const Scrape = mongoose.model("scrape", scrapeSchema);

function validateScrape(scrape) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(100)
      .required(),
    images: Joi.array().items(Joi.string().min(3))
  };

  return Joi.validate(scrape, schema);
}

exports.scrapeSchema = scrapeSchema;
exports.Scrape = Scrape;
exports.validate = validateScrape;
