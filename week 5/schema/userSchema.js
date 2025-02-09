const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String
    },
    geo: {
        lat: Number,
        lng: Number
    },
    phone: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    company: {
        name: String,
        catchphrase: String,
        bs: String
    }}
);

module.exports = mongoose.model('Users', userSchema)