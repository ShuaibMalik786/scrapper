const Joi = require("joi");
const mongoose = require("mongoose");

const scrapeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255
    },
    url: {
      type: String,
      required: true,
      minlength: 5
    },
    brand: {
      type: String,
      required: true,
      maxlength: 255
    },
    frontCamera: {
      type: Number,
      required: true,
      maxlength: 3
    },
    backCamera: {
      type: Number,
      required: true,
      maxlength: 3
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
    brand: Joi.string()
      .min(5)
      .required(),
    frontCamera: Joi.string().required(),
    backCamera: Joi.string().required(),
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
