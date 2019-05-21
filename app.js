const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send('Server connected');
});

app.listen(8080, (req, res) => {
    console.log('Server started on port 8080...');
});