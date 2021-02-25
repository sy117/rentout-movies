const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validateUser, validateCredentials } = require('../models/user');
const auth = require('../middleware/auth');


router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    return res.send(user);
});

router.post('/register', async (req, res) => {
    const { error } = validateUser(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    // Check if user alread exist
    let user = await User.findOne({ email: req.body.email });
    if(user){
        return res.status(400).send('User already registered.');
    }
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email'])); // remove password before returning user object
});

router.post('/login', async (req, res) => {
    const { error } = validateCredentials(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({ email: req.body.email });
    if(!user){
        return res.status(400).send('Invalid email or password');
    }
    // console.log(user.password, req.body.password);
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.status(400).send('Invalid email or password');
    }
    const token = user.generateAuthToken();
    res.send(token);
});

module.exports = router;