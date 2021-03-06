require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const _ = require('lodash');

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
}).catch(err => {
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

// GET A SPECIFIC COURSE
app.get('/api/courses/:courseTitle', (req, res) => {
    const title = req.params.courseTitle;

    sequelize.query('SELECT * FROM course WHERE title = ?', {
        replacements: [title], type: sequelize.QueryTypes.SELECT
    }).then(course => {
        res.send(course)
    });
});

//ADD A NEW COURSE
app.post('/api/courses', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    sequelize.query('INSERT INTO course (title, description) VALUES ($1, $2)', 
    { bind: [title, description], type: sequelize.QueryTypes.SELECT}
    ).then(() => {
        res.send('Successfuly added course')
    });
});

// UPDATE A SPECIFIC COURSE
app.patch('/api/courses/:courseTitle', (req, res) => {
    const title = req.params.courseTitle;
    const updatedTitle = req.body.title;
    const updatedDesc = req.body.description;

    sequelize.query('UPDATE course SET title = ?, description = ? WHERE title = ?', {
        replacements: [updatedTitle, updatedDesc, title], type: sequelize.QueryTypes.SELECT
    }).then(() => {
        res.send('Successfully updated course')
    });
});

// DELETE A SPECIFIC COURSE
app.delete('/api/courses/:courseTitle', (req, res) => {
    const title = req.params.courseTitle;

    sequelize.query('DELETE FROM course WHERE title = ?', {
        replacements: [title], type: sequelize.QueryTypes.SELECT
    }).then(() => {
        res.send('Successfully deleted course')
    });
});

// DELETE ALL COURSES
app.delete('/api/courses', (req, res) => {
    sequelize.query('DELETE FROM course').then(() => { res.send('Succesfully deleted all courses') })
});



app.listen(8080, (req, res) => {
    console.log('Server started on port 8080...');
});