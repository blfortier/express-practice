const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const todo = require('./routes/api/todo');
const partOne = require('./routes/todo');

// Use the body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers needed to run the app
app.use('/partOne', partOne);
app.use('/todo', todo);


// port that the app is binded to
app.listen(port, () => console.log(`Listening on port ${port}`));
