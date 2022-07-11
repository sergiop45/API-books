const Sequelize = require("sequelize");
const connection = require("../database/database");

const Books = connection.define("books", {
    title:{ 
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    publishedAt: {
        type: Sequelize.STRING,
        allowNull:false
    }
    
});

Books.sync({force:false}).then( console.log("tabela books criada"))
.catch((error) => console.log("erro " + error + " ao criar tabela"));

module.exports = Books;