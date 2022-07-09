const express = require("express");
const app = express();
const port = 1515;

app.use(express.json());

let books = [];

app.post("/books", (req, res) => {

    const {id, title, author, publishedAt} = req.body;
    const book = {id, title, author, publishedAt};
    books.push(book);
    return res.status(201).json(book);

});

app.get("/books", (req, res) => {
    return res.status(200).json(books);
});

app.get("/books/:book_id", (req, res) => {
    const {book_id} = req.params;
    const book = books.find((item) => item.id === book_id);
    if(!book) { 
        return res.status(404).json("not found");
    }
    return res.status(200).json(book);
});


app.delete("/books/:book_id", (req, res) => {
    const {book_id} = req.params;
    const filteredBooks = books.filter((item) => item.id != book_id);
    books = filteredBooks;
    return  res.status(200).json("deleted");
});



app.patch("/books/:book_id", (req, res) => {
    const {book_id} = req.params;
    const {title,author, publishedAt} = req.body;
    const book = books.find((item) => item.id === book_id);
    console.log(book)
    
    book.author = author ? author : book.author;
    book.title = title ? title : book.title;
    book.publishedAt = publishedAt ? publishedAt : book.publishedAt;

    return res.status(200).json(book);
    

});



app.listen(port, () => {
    console.log("servidor rodando na porta " + port);
});

