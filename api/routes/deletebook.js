const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bookModel = require('../../model/bookshop');

router.get('/', (req,res) => {
    res.status(200).json({
        messege : "Hey, Want to Delete Your Books? Send a Delete Request to this Endpoit",
        fields: "name"
    })
    
})

router.delete('/', async (req,res) => {
    const bookDetails = {
        name: req.body.name,
    }
    try{
        const emptyArray = [];
        const inputFromUser1 = await bookModel.find({name: req.body.name});
        const stringEmptyArray = JSON.stringify(emptyArray);
        const stringInputFromUser1 = JSON.stringify(inputFromUser1)

        if(stringEmptyArray == stringInputFromUser1){
            res.status(404).json({
                message: "Book Not Found"
            })
        }else{
            const inputFromUser2 = await bookModel.deleteOne({name:req.body.name})
            res.status(200).json({
                message: "Book Deleted!"
            })
        }
        
        
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})


module.exports = router