const express = require('express');
const mysql = require('mysql');
const app = express();

// create connection object
const connection = mysql.createConnection({
    host: 'sql7.freesqldatabase.com',
    user: 'sql7606284',
    password: '8fvVqcjvwy',
    database: 'sql7606284'
});

// connect to database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to database');
});

// define API route
app.get("/streetQuery", (req, res) => {
    // perform SELECT query
    const streetQuery = `
        SELECT id, street_name, env_id, imageurl 
        FROM street
    `;

    
    connection.query(streetQuery, (error, results, fields) => {
        if (error) {
            console.error('Error querying database: ', error);
            return;
        }
        // return JSON response
        res.json(results);
    });
});


app.get("/storeQuery", (req, res) => {
    const shopQuery = `
    SELECT s.store_name, s.imageurl, s.address, s.open_time, s.close_time, c.class_name, sz.size_name, str.street_name, s.rating
    FROM store s
    INNER JOIN goods_class c ON s.class = c.id
    INNER JOIN store_size sz ON s.size = sz.id
    INNER JOIN street str ON s.street = str.id;
    
    `;
    connection.query(shopQuery, (error, results, fields) => {
        if (error) {
            console.error('Error querying database: ', error);
            return;
        }
        // return JSON response
        res.json(results);
    });
});

app.get("/analyseQuery", (req, res) => {
    const anQuery = `
    SELECT str.street_name, s.rating, com.market
    FROM street str
    INNER JOIN store c ON str.id = s.street
    INNER JOIN competition com ON str.id = com.id;
    
    `;
    connection.query(anQuery, (error, results, fields) => {
        if (error) {
            console.error('Error querying database: ', error);
            return;
        }
        // return JSON response
        res.json(results);
    });
});



// start server
app.listen(5001, () => {
    console.log("Server started on port 5001");
});
