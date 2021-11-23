const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bookModel = require('../../model/bookshop');

router.get('/', (req,res) =>{
    res.status(200).json({
        message: "Hey, Want Books Upload by Specific Author ? Send to Get request to /book/<authorname> to Get books of the Specific Author"
    })
})

router.get('/:author', async (req,res) =>{
    const author = {
        author: req.params.author
    }
    try{
        const inputFromUser = await bookModel.find(author)
        const emptyArray = [];
        const stringEmptyArray = JSON.stringify(emptyArray)
        const stringInputFromUser = JSON.stringify(inputFromUser)
        console.log(stringEmptyArray == stringInputFromUser)
        if(stringEmptyArray == stringInputFromUser){
            res.status(404).json({
                message: "Author Not Found"
            })
        }else{
            res.status(200).json({
                Books: inputFromUser 
            })
        }
    }catch(err){
        console.log(err)
        res.status(404).json({
            message: "Author Not Found"
        })
    }
})




module.exports = router