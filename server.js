const express = require('express');

const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const note = [

];

// Routes
// ========================================================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

// Create an `/add` route that returns `add.html`
//
// YOUR CODE HERE
//
app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'add.html'));
});

