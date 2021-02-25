const mongoose = require('mongoose');
const Joi = require('joi');


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    phone: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
})

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;