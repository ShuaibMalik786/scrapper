const validateObjectId = require("../middleware/validateObjectId");
const scrapper = require("../helpers/scraper");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Scrape, validate } = require("../models/scrape");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const responseFormatter = require("../helpers/response");

let response;

router.post("/findImages", [auth, admin], async (req, res) => {
  // const genres = await Genre.find().sort('name');
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
  // console.log(req.body);
  const { error } = validate(req.body);
  if (error) {
    this.response = responseFormatter("fail", null, error.details[0].message);
    return res.status(400).send(this.response);
  }
  let genre = new Scrape({ name: req.body.name, images: req.body.images });
  genre = await genre.save();

  res.send(genre);
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
