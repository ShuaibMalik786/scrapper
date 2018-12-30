const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = async function() {
  const db = config.get("db");
  await mongoose.connect(db);
  winston.info(`Connected to ${db}...`);

  if (!(await User.find().sort("admin@gmail.com"))) {
    let user = new User({
      name: "shuaib",
      email: "admin@gmail.com",
      password: "123456",
      isAdmin: true
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save();
  }
};
