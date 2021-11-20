const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const Port = process.env.PORT || 3000;
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.listen(Port, () => {
    console.log("Server is ok");
});

app.post('/addTodo', (req, res) => {
    const newTodo = {text} = req.body;
    if (!newTodo)
        res.status(400).send({message: 'text is required'});

    const jsonPath = path.resolve(__dirname, 'data/todos.json');

    const savesTodos = fs.readFile(jsonPath, (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        data = JSON.parse(data);
        data.push(newTodo);
        data = JSON.stringify(data);
        fs.writeFile(jsonPath, data, err => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.send(newTodo);
        });
    });
});

app.delete('/todos', (req, res) => {
    const newTodo = req.body;
    if (!newTodo)
        res.status(400).send({message: 'text is required'});

    const jsonPath = path.resolve(__dirname, 'data/todos.json');
    fs.readFile(jsonPath, (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        data = JSON.parse(data);
        data = data.filter(x =>
            x.title !== newTodo.title
            && x.text !== newTodo.text
            && x.date !== newTodo.date);

        data = JSON.stringify(data);
        fs.writeFile(jsonPath, data, err => {
            if (err) {
                res.status(500).send(err);
                return;
            } else
                res.status(200).send('deleted');
        });
    });
});

app.put('/todos', (req, res) => {
    console.log('/todos');
    // const newTodo = req.body.newTodo;
    // const oldTodo = req.body.oldTodo;
    // if (!newTodo || !oldTodo)
    //     res.status(400).send({message: 'text is required'});
    //
    // const jsonPath = path.resolve(__dirname, 'data/todos.json');
    // fs.readFile(jsonPath, (err, data) => {
    //     if (err) {
    //         res.status(500).send(err);
    //         return;
    //     }
    //     data = JSON.parse(data);
    //     data.forEach((x, i) => {
    //         if (x.title === newTodo.title
    //             && x.text === newTodo.text
    //             && x.date === newTodo.date)
    //             data[i] = newTodo;
    //     });
    //
    //     data = JSON.stringify(data);
    //     fs.writeFile(jsonPath, data, err => {
    //         if (err) {
    //             res.status(500).send(err);
    //         } else
    //             res.status(200).send(newTodo);
    //     });
    // });
});

app.get('/', (req, res) => {
    const jsonPath = path.resolve(__dirname, 'updateBooks.html');


    res.render(jsonPath, {name: "hossein"});
});

app.get('/getTodo', (req, res) => {

    const jsonPath = path.resolve(__dirname, 'data/todos.json');

    fs.readFile(jsonPath, (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        data = JSON.parse(data);
        res.send(data);
    });
});
