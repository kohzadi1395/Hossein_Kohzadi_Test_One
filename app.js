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
const jsonParser = bodyParser.json();
const app = express();
const Port = process.env.PORT || 3000;
app.engine('html', require('ejs').renderFile);

app.listen(Port, () => {
    console.log("Server is ok");
});
app.get('/greeting', (req, res) => {
    res.send({hi: 'here'});
});
app.get('/updateBooks', (req, res) => {
    res.render(path.resolve(__dirname + '/updateBooks.html'), {
        name: 'hossein',
        data: ['yesterday', 'today', 'tomorrow']
    });
});

app.get('/getBooks/:subject', (req, res, next) => {
    const subject = req.params.subject;
    console.log(subject);
    const book = books.find(c => c.subject === subject);
    if (!book) {
        res.status(404).send('book not find');
    } else {
        res.json(book);
    }
});

app.put('/updateBook/:oldSubject/:newSubject', (req, res) => {
    const oldSubject = req.params.oldSubject;
    const newSubject = req.params.newSubject;
    const book = books.find(c => c.subject === oldSubject);
    if (!book) {
        res.status(404).send('book not find');
    } else {
        book.subject = newSubject;
        res.json(book);
    }
});

app.post('/addTodo', jsonParser, (req, res) => {
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

app.get('/displayAllBooks', (req, res) => {
    res.json(books);
    return;
});



