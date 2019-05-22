require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


// CREATE DATABASE
const sequelize = new Sequelize(process.env.COURSES_API_DB, process.env.COURSES_API_USERNAME, process.env.COURSES_API_PASSWORD, {
    host: process.env.COURSES_API_HOST,
    dialect: 'postgres'
});

const Courses = sequelize.define('course', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });
  
  // TEST DB CONNECTION
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



app.get('/', (req, res) => {
    res.send('Server and DB connected');
});

// GET ALL COURSES
app.get('/api/courses', (req, res) => {
    sequelize.query('SELECT * FROM course').then((courses) => {
        res.send(courses);
    });
});

app.listen(8080, (req, res) => {
    console.log('Server started on port 8080...');
});