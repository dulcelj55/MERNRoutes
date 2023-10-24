const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
const Book = require('./models/Book.js');
require('dotenv').config();
require('./config/db.js');
const PORT = 3000;


const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //

// START ROUTES //


// find   - finds everything
// .find()
 
// findById

// insertMany
app.post('/books', async (req, res) => {
    // in the request there should be an array of books objects.
    let books = req.body.books;

    let dbResponse =  await  Book.insertMany(books);
    res.send(dbResponse);
})

app.get('/books', async (req, res) => {
    // in the request there should be an array of books objects.
   let dbResponse =  await  Book.find();
    res.send(dbResponse);
})
app.get('/books/:title', async (req, res) => {
    // .findOne()
   let dbResponse =  await  Book.findOne({title:req.params.title});
    res.send(dbResponse);
})
app.get('/books/:ObjectId', async (req, res) => {
    // .findById()
   let dbResponse =  await  Book.findById({ObjectId:req.params.ObjectId});
    res.send(dbResponse);
})


app.delete("/books/:idOfBook", async (req, res) => {
    // .findByIdAndDelete()
    let id = req.params.idOfBook;
    let response = await Book.findByIdAndDelete(id);
    console.log(response);
    res.send('deleted book')
});
app.delete("/books/pages/:numOfPages", async (req, res) => {
    // .findOneAndDelete()
    let pages = req.params.numOfPages;
    let response = await Book.findOneAndDelete({pages:+pages});
    console.log(response);
    res.send('deleted book with {pages}')
});



// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});


