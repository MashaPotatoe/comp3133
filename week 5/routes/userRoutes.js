const express = require('express');
const userSchema = require('../schema/userSchema');
const router = express.Router();
const {check, validationResult} = require('express-validator')

// find our users
router.get('/', async (req, res) => {
    try {
        const users = await userSchema.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', [
    check('username').isLength({ min: 4 }).withMessage('at least 4 letters needed for user name'),
    check('email').isEmail().withMessage('Need a valid email'),
    check('address').exists().withMessage('Need valid address'),
    check('address.city').matches(/^[A-Za-z\s]+$/).withMessage('City must be valid no numbers'),
    check('address.zipcode').matches(/^\d{5}-\d{4}$/).withMessage('Zip code has 5 numbers - 4 numbers'),
    check('geo').exists().withMessage('Geo location is required'),
    check('geo.lat').isNumeric().withMessage('Latitude must be a number'),
    check('geo.lng').isNumeric().withMessage('Longitude must be a number'),
    check('phone').matches(/^1-\d{3}-\d{3}-\d{4}$/).withMessage('phone number has to be valid'),
    check('website').matches(/^(http|https):\/\/[^ "]+$/).withMessage('(http or https)')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = new userSchema(req.body);
    try {
        await user.save();
        res.status(201).send('User saved successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;