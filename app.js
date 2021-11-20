const books = [
    {
        "authorName": "Hossein",
        "title": "Node.js",
        "publisher": "Lambton",
        "subject": "Web",
        "datePublished": "2021/10/19"
    },
    {
        "authorName": "Hossein",
        "title": "Node.js II",
        "publisher": "Lambton",
        "subject": "Web Programing",
        "datePublished": "2021/10/19"
    }

];
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
    console.log(jsonPath);
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

app.get('/getTodo', (req, res) => {

    const jsonPath = path.resolve(__dirname, 'data/todos.json');
    console.log(jsonPath);
    const savesTodos = fs.readFile(jsonPath, (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        data = JSON.parse(data);
        res.send(data);
    });
});
app.get('/', (req, res) => {
    const jsonPath = path.resolve(__dirname, 'updateBooks.html');
    console.log(jsonPath);

    res.render(jsonPath,{name:"hossein"});
});

