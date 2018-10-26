const express = require('express');
const todoRouter = express.Router();

// array of todos
const todoArray = [
    {   id: 0, 
        title: 'social worker',
        author: 'Cristene', 
        task: 'help children'
    },
    { 
        id: 1,
        title: 'receptionist',
        author: 'Leah', 
        task: 'set appointments'
        
    },
    {
        id: 2,
        title: 'warehouse worker', 
        author: 'Bobby', 
        task: 'work hard'
    },
    { 
        id: 3,
        title: 'teacher', 
        author: 'Laurie', 
        task: 'mold minds'
    },
];

// A GET route that returns all todos in the array
todoRouter.get('/todo', (req, res) => {
    if (todoArray.length == 0 || todoArray == 'undefined') {
        res.status(404).json({ status: 404, message: 'That does not exists' });
    }
    else {
        res.status(200).send(todoArray);
    }
});

// create a dynamic GET route that returns one task
todoRouter.get('/todo/:task', (req, res) => {
    const task = req.params.task;
    const isThere = false;
    const oneTask = [];

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
todoRouter.get('/todo/search/:task', (req, res) => {
    const task = req.params.task;
    const isThere = false;
    const found = [];

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
todoRouter.post('/todo/addItem/:key/:value', (req, res) => {
    const key = req.params.key;
    const value = req.params.value;
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
todoRouter.delete('/todo/delete/:id', (req, res) => {
    const id = req.params.id;
    const search = todoArray.indexOf(todoArray[id]);

    if (search !== -1) {
        todoArray.splice(id, 1);
    }
    else {
        return res.status(422).json({ status: 422, message: 'Not found' });
    }

});

// create a route that updates an existing task
todoRouter.post('/todo/update/:id/:key/:value', (req, res) => {
    const id = req.params.id;
    const key = req.params.key;
    const value = req.params.key;

    if (id === 'undefined' || key === 'undefined') {
        res.status(422).json({ status: 422, message: 'No parameters entered' });
    }
    else {
        todoArray[0].key = value;
        res.json(todoArray[0]);
    }
});


module.exports = todoRouter;