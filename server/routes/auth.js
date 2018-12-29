const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let response;
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    this.response = responseFormatter("fail", null, error.details[0].message);
    return res.status(400).send(this.response);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    this.response = responseFormatter("fail", null, "Invalid email or password.");
    return res.status(400).send(this.response);
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    this.response = responseFormatter("fail", null, "Invalid email or password.");
    return res.status(400).send(this.response);
  }

  const token = user.generateAuthToken();
  let data = {
    token: token,
    user : _.pick(user, ["_id", "name", "email"])
  }
  this.response = responseFormatter("success", data, "user logged in successfully");
  res.send(this.response);
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
