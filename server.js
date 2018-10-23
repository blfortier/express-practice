const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Global variable array
/* global myArray*/
myArray = ['blue', 'orange', 'yellow', 'red', 'green'];


// A route that displays my name 
app.get('/name', (req, res) => res.send('<h1>Brittney Fortier</h1>'));

// A dynamic route that says something using the parameter sent to it
// For a parameter, enter your favorite holiday
/*app.get('/:faveHoliday', (req, res) => {
    const faveHoliday = req.params.faveHoliday;
    res.send(`<h1>My favorite holiday is ${faveHoliday}</h1>`);
});
*/

// Create a query route. Accepts 2 numebers
// and sends back a mathematical equation
// and the result
app.get('/math', (req, res) => {
    var num1 = parseInt(req.query.num1);
    var num2 = parseInt(req.query.num2);
    var result = (num1 * num2);
    res.send(`<h1>${num1} * ${num2} = ${result}</h1>`);
});

// A POST route that accepts a username and password
app.post('/login/:name/:pass', (req, res) => {
    var userName = req.params.name;
    var password = req.params.pass;

    // validate the username and password
    if(userName === "John123" && password === "Monkeys456" ) {
        res.json('logged in');
    } else {
        res.json('invalid credentials');
    }
});

// Create a POST request that has an item attribute
// Add this item to the global array I initiated
app.post('/addItem/:item', (req, res) => {
   var item = req.params.item;
   myArray.push(item);
   console.log(myArray);
  // res.json(myArray);
   res.json('You have added ' + item + ' to the array!');
});

app.delete('/deleteItem/:item', (req, res) => {
   var item = req.params.item;
   
   var location = myArray.indexOf(item);
   console.log(location);
   
   if (location != -1) {
       myArray.splice(location);
       res.json('The item ' + item + ' is there');
   } else {
       res.json('The item is not present');
   }
   
    
});

// use indexOf() to see if the array has a certain element 
// use splice to delete the item if it is present 





app.listen(port, () => console.log(`Listening on port ${port}`));