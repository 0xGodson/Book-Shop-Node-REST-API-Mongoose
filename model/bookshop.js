const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    prize:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('books', bookSchema);