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
const app = express();
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log("Server is ok");
});
app.get('/greeting', (req, res) => {
    res.send({hi: 'here'});
});
app.get('/', (req, res) => {
    res.send({hi: 'Sweetheart'});
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

app.put('/updateBook', (req, res) => {
    const oldSubject = req.params.oldSubject;
    const newSubject = req.params.newSubject;
    for (let book of books) {
        if (book.subject === oldSubject) {
            book.subject = newSubject;
            res.json(book);
            return;
        }
    }
});

app.post('/addBook', (req, res) => {

    const newBook =req.body;
    books.push(newBook)
});

app.get('/displayAllBooks', (req, res) => {
    res.json(books);
    return;
});



