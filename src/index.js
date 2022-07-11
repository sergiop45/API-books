const express = require("express");
const app = express();
const port = 1515;
const connection = require("../database/database");
const Books = require("../models/books");


connection.authenticate().then(console.log("conexao com DB realizada"))
.catch((error) => console.log("erro " + error + " ao conectar com DB"));

app.use(express.json());


app.post("/books", (req, res) => {

    const {title, author, publishedAt} = req.body;
    const book = {title, author, publishedAt};
    Books.create({
        title: book.title,
        author: book.author,
        publishedAt: book.publishedAt
    }).then(res.status(201).json(book))
    .catch((error) => {
        res.status(500).json("erro " + error + " ao inserir no Banco de dados");
    })
    

});

app.get("/books", (req, res) => {

    Books.findAll().then((books) => {
        res.status(200).json(books);
    });
});

app.get("/books/:book_id", (req, res) => {
    const {book_id} = req.params;

    if(isNaN(book_id)) {
        return res.status(400).json("sintaxe invalida, passe um numero como id!");
    } else {
            Books.findByPk(book_id).then((book) => {
            if(!book) { 
                return res.status(404).json("not found");
            } else {
                res.status(200).json(book);
            }
        });
    }
    
});


app.delete("/books/:book_id", (req, res) => {

    const {book_id} = req.params;
    Books.destroy({
        where: {
            id: book_id
        }
    }).then(() => {
        return  res.status(200).json("deleted");
    }).catch((error) => {
        res.status(500);
    });
       

});



app.patch("/books/:book_id", (req, res) => {
    const id = req.params.book_id;
    const {title,author, publishedAt} = req.body;
    console.log(id)
    Books.update({
        title: title,
    }, {where : { id : id}}).then(() => {
        return res.status(200);
    }).catch((error) => {
        res.status(500);
    });

});



app.listen(port, () => {
    console.log("servidor rodando na porta " + port);
});

