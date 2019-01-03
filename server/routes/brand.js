const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Brand, validate } = require("../models/brand");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const responseFormatter = require("../helpers/response");
const _ = require("lodash");

router.get("/", async (req, res) => {
  const brands = await Brand.find()
    .sort("createdAt")
    .select("-images");
  if (brands) {
    let response = responseFormatter("success", brands, "brands found");
    res.send(response);
  } else {
    let response = responseFormatter("fail", brands, "brands not found");
    res.status(400).send(response);
  }
});

// save brand
router.post("/add", async (req, res) => {
  //Validate brand
  const { error } = validate(req.body);
  if (error) {
    let response = responseFormatter("failed", null, error.details[0].message);
    return res.status(400).send(response);
  }

  // validate duplicate
  let brand = await Brand.findOne({ name: req.body.name });

  if (brand) {
    let response = responseFormatter(
      "failed",
      null,
      `Brand name already exist - '${brand.name}'`
    );
    return res.status(400).send(response);
  }

  //Save brand
  brand = new Brand(_.pick(req.body, ["name"]));
  brand = await brand.save();

  if (brand) {
    this.response = responseFormatter(
      "success",
      brand,
      "Successfully saved brand"
    );

    //send response
    res.send(this.response);
  }
});

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
