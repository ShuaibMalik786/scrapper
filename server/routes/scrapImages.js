const validateObjectId = require("../middleware/validateObjectId");
const scrapper = require("../helpers/scraper");
const feedScraper = require("../helpers/feedScraper");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Scrape, validate } = require("../models/scrape");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const responseFormatter = require("../helpers/response");
const _ = require("lodash");

let response;

router.get("/list", [auth, admin], async (req, res) => {
  const scrapes = await Scrape.find(req.query)
    .sort("createdAt")
    .select("-images");
  if (scrapes) {
    let response = responseFormatter("success", scrapes, "scrapes found");
    res.send(response);
  } else {
    let response = responseFormatter("fail", scrapes, "scrapes not found");
    res.status(400).send(response);
  }
});

router.post("/findImages", [auth, admin], async (req, res) => {
  let images = await scrapper(req.body.url);

  if (!images) {
    this.response = responseFormatter("fail", null, "failed to scrap");
    return res.status(400).send(this.response);
  } else {
    this.response = responseFormatter(
      "success",
      images,
      "successfully scrapped"
    );
    return res.send(this.response);
  }
});

router.post("/save", async (req, res) => {
  //validate request
  const { error } = validate(req.body);
  if (error) {
    this.response = responseFormatter("fail", null, error.details[0].message);
    return res.status(400).send(this.response);
  }

  //find if name is duplicate
  let scrape = await Scrape.findOne({ name: req.body.name });
  if (scrape) {
    this.response = responseFormatter(
      "fail",
      null,
      `Scrape already registered with name - ${scrape.name}.`
    );
    return res.status(400).send(this.response);
  }

  //Save scrape
  scrape = new Scrape(_.pick(req.body, ["name", "url", "brand", "frontCamera", "backCamera", "images"]));
  scrape = await scrape.save();

  if (scrape) {
    this.response = responseFormatter("success", scrape, "Successfully saved");
    res.send(this.response);
  }
});

router.post("/findFeedImages", [auth, admin], async (req, res) => {
  let images = await feedScraper(req.body.html);

  if (!images) {
    this.response = responseFormatter("fail", null, "failed to scrap");
    return res.status(400).send(this.response);
  } else {
    this.response = responseFormatter(
      "success",
      images,
      "successfully scrapped"
    );
    return res.send(this.response);
  }
});

// router.post("/saveFeeded", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) {
//     this.response = responseFormatter("fail", null, error.details[0].message);
//     return res.status(400).send(this.response);
//   }
//   let scrape = new Scrape({
//     name: req.body.name,
//     url: req.body.url,
//     images: req.body.images
//   });

router.get("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const scrapes = await Scrape.findById(req.params.id);
  if (scrapes) {
    let response = responseFormatter("success", scrapes, "scrape found");
    res.send(response);
  } else {
    let response = responseFormatter("fail", scrapes, "scrape not found");
    res.status(400).send(response);
  }
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const scrapes = await Scrape.findByIdAndRemove(req.params.id);

  if (!scrapes) {
    let response = responseFormatter(
      "fail",
      scrapes,
      "The scrape with the given ID was not found."
    );
    res.status(400).send(response);
  }

  const scrapeList = await Scrape.find();
  let response = responseFormatter(
    "success",
    scrapeList,
    "The scrape with the given ID deleted."
  );
  res.send(response);
});

// router.post('/', auth, async (req, res) => {
// router.post('/', async (req, res) => {
//   console.log(req.body.name);
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let genre = new Genre({ name: req.body.name });
//   genre = await genre.save();

//   res.send(genre);
// });

// router.put('/:id', [auth, validateObjectId], async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
//     new: true
//   });

//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//   res.send(genre);
// });

// router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
//   const genre = await Genre.findByIdAndRemove(req.params.id);

//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//   res.send(genre);
// });

// router.get('/:id', validateObjectId, async (req, res) => {
//   const genre = await Genre.findById(req.params.id);

//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//   res.send(genre);
// });

module.exports = router;
