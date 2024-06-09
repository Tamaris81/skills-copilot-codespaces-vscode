//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000;

//Create a function to read the file
function readData() {
    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);
    return data;
}

//Create a function to write the file
function writeData(data) {
    let writeData = JSON.stringify(data, null, 2);
    fs.writeFileSync('data.json', writeData);
}

//Middleware
app.use(bodyParser.json());

//Get all comments
app.get('/comments', (req, res) => {
    let data = readData();
    res.send(data);
});

//Get comment by id
app.get('/comments/:id', (req, res) => {
    let data = readData();
    let comment = data.find(comment => comment.id == req.params.id);
    if (comment) {
        res.send(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

//Post a new comment
app.post('/comments', (req, res) => {
    let data = readData();
    let newComment = {
        id: data.length + 1,