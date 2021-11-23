const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bookModel = require('../../model/bookshop');

router.get('/', (req,res) => {
    res.status(200).json({
        message: "Hey, You can Add Your Books Here For Free By Sending Post Request To This Endpoint!",
        fields:"name, author, prize"
    })
})

router.post('/',async (req,res) => {
    const bookDetails = {
        name: req.body.name,
        author: req.body.author,
        prize: req.body.prize
    }
    try{
        const emptyArray = [];
        const inputFromUser1 = await bookModel.find({name: req.body.name});
        const stringEmptyArray = JSON.stringify(emptyArray);
        const stringInputFromUser1 = JSON.stringify(inputFromUser1)

        if(stringEmptyArray == stringInputFromUser1){
            const inputFromUser2 = await bookModel.create(bookDetails)
            res.status(200).json({
                message: "Book Added!"
            })
        }else {
            res.status(200).json({
                message: "Book Already Exist. Try a Different Name"
            })
        }
        
        
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})


module.exports = router