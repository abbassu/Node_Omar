const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000; // Choose any desired port

// Configure MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'mydatabase',
});

// Establish MySQL connection
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Define your CRUD endpoints
// 1. Create (POST)
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  const newItem = { name, description };
  const query = 'INSERT INTO items SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) throw err;
    console.log('Created new item:', result.insertId);
    res.send('Item created successfully!');
  });
});

// 2. Read (GET)
app.get('/api/items', (req, res) => {
  const query = 'SELECT * FROM items';

  connection.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// 3. Update (PUT)
app.put('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  const { name, description } = req.body;
  const updatedItem = { name, description };
  const query = 'UPDATE items SET ? WHERE id = ?';

  connection.query(query, [updatedItem, itemId], (err, result) => {
    if (err) throw err;
    console.log('Updated item:', itemId);
    res.send('Item updated successfully!');
  });
});

// 4. Delete (DELETE)
app.delete('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  const query = 'DELETE FROM items WHERE id = ?';

  connection.query(query, itemId, (err, result) => {
    if (err) throw err;
    console.log('Deleted item:', itemId);
    res.send('Item deleted successfully!');
  });
});


////////////////////////////////////////////////////////
app.get('/employees', (req, res) => {
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      console.error('Error retrieving data from MySQL:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
    // res.send(`ddddddddddddddddddddd`)
    // console.log("ddddddddddd")
  });
});


app.get('/careers', (req, res) => {
  connection.query('SELECT * FROM careers', (err, results) => {
    if (err) {
      console.error('Error retrieving data from MySQL:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});


app.get('/managers', (req, res) => {
  connection.query('SELECT * FROM managers', (err, results) => {
    if (err) {
      console.error('Error retrieving data from MySQL:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

////////////////////////////////////////////////////////



// Start the server
app.listen(8081, () => {
  console.log(`Server is running on port ${port}`);
});