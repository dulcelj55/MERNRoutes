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
    // in the request there should be an array of books objects.
   let dbResponse =  await  Book.findOne({title:req.params.title});
    res.send(dbResponse);
})


app.delete('/books/:title', async (req, res)=>{
   
        // .findByIdAndDelete()
        let title = req.params.title;
        let response = await Book.findByTitleAndDelete(title);
        console.log(response);
        res.send('deleted book')
    });


// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});


