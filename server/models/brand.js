const Joi = require('joi');
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  }
});

const Brand = mongoose.model('Brand', brandSchema);

function validateBrand(brand) {
  const schema = {
    name: Joi.string().min(1).max(255).required()
  };

  return Joi.validate(brand, schema);
}

exports.brandSchema = brandSchema;
exports.Brand = Brand; 
exports.validate = validateBrand;