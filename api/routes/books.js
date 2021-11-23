const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bookModel = require('../../model/bookshop');

router.get('/',async (req,res) =>{
    try{
        const books = await bookModel.find();
        res.status(200).json({
            Books: books
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router