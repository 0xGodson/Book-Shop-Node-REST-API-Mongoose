const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bookModel = require('../../model/bookshop');

router.get('/', (req,res) => {
    res.status(200).json({
        message: "Hey, Want to Update Your Prize to Your Book? Send a Post Request to this Endpoint",
        fields: "name, prize"
    })
})

router.post('/', async (req,res) => {
    const updatePrize = {
        name: req.body.name,
        prize: req.body.prize
    }
    try{
        const emptyArray = [];
        const inputFromUser1 = await bookModel.find({name: req.body.name})
        const stringEmptyArray = JSON.stringify(emptyArray);
        const stringInputFromUser1 = JSON.stringify(inputFromUser1)
        if(stringEmptyArray == stringInputFromUser1){
            res.status(404).json({
                message: "Book Not Found!"
            })
        }else{
            const inputFromUser2 = await bookModel.updateOne({name: req.body.name},{$set:{prize: req.body.prize}})
            res.status(200).json({
                message: "Book Prize Updated!"
            })
        }
        
        
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})


module.exports = router