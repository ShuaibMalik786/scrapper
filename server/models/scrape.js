const Joi = require("joi");
const mongoose = require("mongoose");

const scrapeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100
    },
    url: {
      type: String,
      required: true,
      minlength: 5
    },
    images: {
      type: Array,
      required: true
    }
  },
  { timestamps: true }
);

const Scrape = mongoose.model("scrape", scrapeSchema);

function validateScrape(scrape) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(100)
      .required(),
    url: Joi.string()
      .min(5)
      .required(),
    images: Joi.array().items({
      smallImage: Joi.string()
        .min(5)
        .max(1000)
        .required(),
      largeImage: Joi.string()
        .min(5)
        .max(1000)
        .required()
    })
  };

  return Joi.validate(scrape, schema);
}

exports.scrapeSchema = scrapeSchema;
exports.Scrape = Scrape;
exports.validate = validateScrape;
