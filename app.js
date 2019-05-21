require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const sequelize = new Sequelize(process.env.COURSES_API_DB, process.env.COURSES_API_USERNAME, process.env.COURSES_API_PASSWORD, {
    host: process.env.COURSES_API_HOST,
    dialect: 'postgres'
});
  

app.get('/', (req, res) => {
    res.send('Server and DB connected');
});

app.listen(8080, (req, res) => {
    console.log('Server started on port 8080...');
});