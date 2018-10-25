const express = require('express');
const app2 = express();
const app3 = express();
const part1Router = require('./routes/api/part1');

const todoRouter = require('./routes/api/todo');

app2.use('/server', part1Router);
app3.use('/todo', todoRouter);







