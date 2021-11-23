const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bookModel = require('../../model/bookshop');

router.get('/', (req,res) => {
    res.status(200).json({
        message: "Hey, Want to Update Your Name? Send a Post Request to this Endpoint",
        fields: "name, author"
    })
})

router.post('/', async (req,res) => {
    const updateAuthorname = {
        name: req.body.name,
        author: req.body.author
    }
    try{
        const inputFromUser1 = await bookModel.find({name: req.body.name})
        const inputFromUser = await bookModel.updateOne({name: req.body.name},{$set:{author: req.body.author}})
        const emptyArray = [];
        const stringEmptyArray = JSON.stringify(emptyArray);
        const stringInputFromUser1 = JSON.stringify(inputFromUser1)
        if(stringInputFromUser1 == stringEmptyArray){
            res.status(404).json({
                message:"book not found"
            })
        }else{
            res.status(200).json({
                message: "Author Name Updated!!!"
            })
        }
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})


module.exports = router