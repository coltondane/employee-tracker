// imports
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// make a database connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        databse: process.env.DB_NAME
    },
    console.log('Connected to the employees database')
);

// return the current db info
app.get('/api')