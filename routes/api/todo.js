const express = require('express');
const todoRouter = express.Router();

var todo = [
    {id: 1, title: 'The Girl on the Train', author: 'Paula Hawkins', pages: 336, binding: 'hardcover', publisher: 'Riverhead Books'},
  
];

console.log(todo);


todoRouter.get('/viewArray', (req, res) => {
    res.send(`The array contains the following: ${todo}`); 
});


module.exports = todoRouter;