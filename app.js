const express = require('express');
const app = express();
const mongoose = require('mongoose');


const bookSchema = require('./model/bookshop')
const listBooks = require('./api/routes/books');
const addBooks = require('./api/routes/addbooks')
const deleteBooks = require('./api/routes/deletebook');
const updateBookName = require('./api/routes/updatebooksname')
const updateAuthorname = require('./api/routes/updateauthorname');
const updatePrize = require('./api/routes/updateprize');
const getBooksByAuthorName = require('./api/routes/getbooksbyauthorname');
mongoose.connect('mongodb://127.0.0.1:27017/bookshop', { useNewUrlParser: true });
const db = mongoose.connection

db.on('error', () =>{
    console.log("Error While Connecting DB")
})
db.once('open', () =>{
    console.log("DB connected Succesfully")
})

app.use(express.static('static'))
app.use(express.json())
app.use('/books', listBooks)
app.use('/add', addBooks)
app.use('/delete', deleteBooks)
app.use('/updatebookname', updateBookName)
app.use('/updateauthorname', updateAuthorname)
app.use('/updateprize', updatePrize)
app.use('/book', getBooksByAuthorName)



app.listen(3000, () => {
    console.log("Server Started")
})