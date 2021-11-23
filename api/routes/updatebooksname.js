const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bookModel = require('../../model/bookshop');

router.get('/', (req,res) => {
    res.status(200).json({
        message: "Hey, Want to Update Your Book Name? Send a Post Request to this Endpoint",
        fields: "name, author"
    })
})

router.post('/', async (req,res) => {
    const updatebookname = {
        name: req.body.name,
        author: req.body.author
    }
    try{
        const emptyArray = [];
        const inputFromUser1 = await bookModel.find({author: req.body.author})
        const inputFromUser2 = await bookModel.updateOne({author: req.body.author},{$set:{name: req.body.name}})

        const stringEmptyArray = JSON.stringify(emptyArray);
        const stringInputFromUser1 = JSON.stringify(inputFromUser1)

        if(stringEmptyArray == stringInputFromUser1){
            res.status(404).json({
                message: "Author Not Found"
            })
        }else {
            res.status(200).json({
                message: "Book Name Updated!"
            })
        }
        
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})


module.exports = router