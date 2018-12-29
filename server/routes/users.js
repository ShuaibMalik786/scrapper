const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const responseFormatter = require("../helpers/response");

let response;

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  this.response = responseFormatter("success", user, "user found");
  res.send(this.response);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    this.response = responseFormatter('fail', null, error.details[0].message);
    return res.status(400).send(this.response);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    this.response = responseFormatter('fail', null, "User already registered.");
    return res.status(400).send(this.response);
  }

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  let data = {
    token: token,
    user: _.pick(user, ["_id", "name", "email"])
  };
  this.response = responseFormatter(
    'success',
    data,
    "User successfully registered."
  );
  res.header("x-auth-token", token).send(this.response);
});

module.exports = router;
