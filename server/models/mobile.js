const Joi = require('joi');
const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    images: {
        type: Array,
        required: true,
        minlength: 5,
        maxlength: 1000
    }
});

const Mobile = mongoose.model('Mobile', mobileSchema);

function validateMobile(mobile) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        images: Joi.string().min(5).max(1000).required()
    };

    return Joi.validate(mobile, schema);
}

exports.mobileSchema = mobileSchema;
exports.Mobile = Mobile;
exports.validate = validateMobile;