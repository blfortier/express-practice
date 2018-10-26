// Part one router
const express = require('express');
const partOneRouter = express.Router();


// Global variable array
/* global myArray*/
myArray = ['blue', 'orange', 'yellow', 'red', 'green'];


// A GET request that displays my name 
partOneRouter.get('/name', (req, res) => {
    res.status(200).send('<h1>Brittney Fortier</h1>');
});


// A dynamic GET  route that says something using the parameter sent to it
// For a parameter, enter your favorite holiday
partOneRouter.get('/input/:faveHoliday', (req, res) => {
    const faveHoliday = req.params.faveHoliday;
    res.status(200).send(`<h1>My favorite holiday is ${faveHoliday}</h1>`);
});

// Create a query route. Accepts 2 numbers
// and sends back a mathematical equation
// and the result
partOneRouter.get('/math', (req, res) => {
    const num1 = parseInt(req.query.num1);
    const num2 = parseInt(req.query.num2);

    //console.log(typeof num1, typeof num2);

    if (isNaN(num1) && isNaN(num2)) {
        // status 422 --> unprocessable entity
        res.status(422).send({ status: 422, message: 'You did not enter any queries' });

    }
    else if (isNaN(num1) || isNaN(num2)) {
        res.status(422).send({ status: 422, message: 'You only entered one query item' });
    }
    else {
        const result = num1 * num2;
        res.status(200).send(`<h1>${num1} * ${num2} = ${result}</h1>`);
    }
});

// A POST route that accepts a username and password
partOneRouter.post('/login/:name/:pass', (req, res) => {
    const userName = req.params.name;
    const password = req.params.pass;

    // check if the username and password match the static username/password
    if (userName === "John123" && password === "Monkeys456") {
        res.status(200).json('logged in');
    }
    else {
        // status 403 --> forbidden
        res.status(403).json('invalid credentials');
    }
});


// Create a POST request that has an item attribute
// Add this item to the global array I initiated
partOneRouter.post('/addItem/:item', (req, res) => {
    const item = req.params.item;
    const location = myArray.indexOf(item);

    // if the item is not already in the array, add it to array
    if (location === -1) {
        myArray.push(item);
        console.log(myArray);
        res.status(200).json('You have added ' + item + ' to the array!');
    }
    else {
        // status 409 --> conflict
        res.status(409).json({ status: 409, message: `${item} already exists in the array` });
    }
});

// create a DELETE request that has an item attribute
// remove this item from the array, if present
partOneRouter.delete('/delete/:item', (req, res) => {
    const item = req.params.item;
    const location = myArray.indexOf(item);
    console.log(location);

    // if item is there, delete it from array
    if (location != -1) {
        myArray.splice(location, 1);
        res.status(200).json(myArray);
    }
    else {
        // status 412 --> precondition failed
        res.status(412).json({ status: 412, message: 'The item you want to delete is not present' });
    }
});

// export the router module to server
module.exports = partOneRouter;













