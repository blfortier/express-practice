const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
/*const p1router = express.Router();
const part1 = require('./routes/api/part1');

*/
const todo = require('./routes/api/todo');
const partOneRouter = express.Router();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/todo', todo);

/*app.use('/api/posts', part1);
 */
// Global variable array
/* global myArray*/
myArray = ['blue', 'orange', 'yellow', 'red', 'green'];


// A route that displays your name 
app.get('/name', (req, res) => {
    res.status(200).send('<h1>Brittney Fortier</h1>');
});

// A dynamic route that says something using the parameter sent to it
// For a parameter, enter your favorite holiday
/*app.get('/:faveHoliday', (req, res) => {
    const faveHoliday = req.params.faveHoliday;
    res.status(200).send(`<h1>My favorite holiday is ${faveHoliday}</h1>`);
});
*/

// Create a query route. Accepts 2 numbers
// and sends back a mathematical equation
// and the result
app.get('/math', (req, res) => {
    var num1 = parseInt(req.query.num1);
    var num2 = parseInt(req.query.num2);

    console.log(typeof num1, typeof num2);

    if (isNaN(num1) && isNaN(num2)) {
        // status 422 --> unprocessable entity
        res.status(422).send({ status: 422, message: 'You did not enter any queries' });

    }
    else if (isNaN(num1) || isNaN(num2)) {
        res.status(422).send({ status: 422, message: 'You only entered one query item' });
    }
    else {
        var result = num1 * num2;
        res.status(200).send(`<h1>${num1} * ${num2} = ${result}</h1>`);
    }
});

// A POST route that accepts a username and password
app.post('/login/:name/:pass', (req, res) => {
    var userName = req.params.name;
    var password = req.params.pass;

    // validate the username and password
    if (userName === "John123" && password === "Monkeys456") {
        res.status(200).json('logged in');
    }
    else {
        res.status(422).json('invalid credentials');
    }
});

// Create a POST request that has an item attribute
// Add this item to the global array I initiated
app.post('/addItem/:item', (req, res) => {
    var item = req.params.item;
    var location = myArray.indexOf(item);

    // if the item is not already in the array, add it to array
    if (location == -1) {
        myArray.push(item);
        console.log(myArray);
        // res.json(myArray);
        res.json('You have added ' + item + ' to the array!');
    }
    else {
        // status 409 --> conflict
        res.status(409).json({ status: 409, message: `${item} already exists in the array` });
    }
});

// create a DELETE request that has an item attribute
// remove this item from the array, if present
app.delete('/deleteItem/:item', (req, res) => {
    var item = req.params.item;

    var location = myArray.indexOf(item);
    console.log(location);

    // if item is there, delete it from array
    if (location != -1) {
        myArray.splice(location, 1);
        res.json(myArray);

    }
    else {
        // status 412 --> precondition failed
        res.status(412).json({ status: 412, message: 'The item you want to delete is not present' });
    }
});

/*************************************        Part 2     **********************************************/

var todoArray = [
    { id: 0, title: 'The Girl on the Train', author: 'Paula Hawkins', pages: 336, binding: 'hardcover', publisher: 'Riverhead Books'},
    { id: 1, title: 'The Fallout', author: 'Jen Rivers', pages: 148, binding: 'hardcover', publisher: 'Scholastice Press'},
    { id: 2, title: 'New Beginnings', author: 'Jeremy Dunhill', pages: 231, binding: 'paperback', publisher: 'Gemstone Inc.'}
];



// A GET route that returns all todos in the array
app.get('/viewArray', (req, res) => {
    if (todoArray.length == 0 || todoArray == 'undefined') {
        res.status(404).json({ status: 404, message: 'That does not exists' });
    }
    else {
        res.status(200).send(todoArray);
    }
});


// create a dynamic GET route that returns one task
app.get('/task/:task', (req, res) => {
            var task = req.params.task;
            var isThere = false;
            var oneTask = [];

            // cycle through the array looking for the searched paramater
            todoArray.forEach(task => {
                for (const prop in task) {
                    if (isThere == task[prop]) {
                        oneTask = task;
                        isThere = true;
                    }
                }

                if (isThere) {
                    res.status(200).send(oneTask);
                } else {
                    // status 400 --> bad request
                    res.status(400).send({ status: 400, message: "What you searched for doesn't exist" });
                }
           });
});



            // create a GET route that returns all todos with the seached parameter
            app.get('search/:task', (req, res) => {
                var task = req.params.task;
                var isThere = false;
                var found = [];

                // search through array for task
                todoArray.forEach(task => {
                    for (const prop in task) {
                        if (isThere == task[prop]) {
                            found.push(task);
                            isThere = true;
                        }
                    }
                });

                // if found, display the todos that match
                if (!isThere) {
                    res.status(400).json({ status: 400, message: "What you searched for doesn't exists" });
                }
                else {
                    res.status(200).json(found);
                }
            });


            // use a POST route to add an attribute to the object
            app.post('/addAttribute/:key/:value', (req, res) => {
                var key = req.params.key;
                var value = req.params.value;
                console.log(key, value);

                if (key === 'undefined' || value === 'undefined') {
                    res.status(422).json({ status: 422, message: 'You did not enter a required attribute' });
                }
                else {
                    todoArray[0].key = value;
                    res.status(200).json(todoArray[0]);
                }
            });

            // create a DELETE route to delete a todo from the object
            app.delete('/delete/:id', (req, res) => {
                var id = req.params.id;
                var search = todoArray.indexOf(todoArray[id]);

                if (search !== -1) {
                    todoArray.splice(id, 1);
                }
                else {
                    return res.status(422).json({ status: 422, message: 'Not found' });
                }

            });

            // create a route that updates an existing task
            app.post('/update/:id/:key/:value', (req, res) => {
                var id = req.params.id;
                var key = req.params.key;
                var value = req.params.key;

                if (id === 'undefined' || key === 'undefined') {
                    res.status(422).json({ status: 422, message: 'No parameters entered' });
                }
                else {
                    todoArray[0].key = value;
                    res.json(todoArray[0]);
                }
            });




            module.exports = partOneRouter;




            app.listen(port, () => console.log(`Listening on port ${port}`));
