const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.SECRET_KEY);
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}


function validateCredentials(req){
    const schema = {
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(1).max(255).required()
    };

    return Joi.validate(req, schema);
}


module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.validateCredentials = validateCredentials;
