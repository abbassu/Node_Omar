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

app.get('/employees/get/:id', (req, res) => {
  console.log("iii11")

  const employeeId = req.params.id;
  // Retrieve the employee from the "employees" table
  connection.query('SELECT * FROM employees WHERE id = ?', [employeeId], (err, result) => {
    if (err) {
      console.error('Error retrieving employee:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
  console.log("iii22")

      const employee = result[0];
      res.json(employee);
    }
  });
});


app.get('/employees/delete/:id', (req, res) => {
  console.log("iii")
  const employeeId = req.params.id;
  connection.query('DELETE FROM employees WHERE id = ?', [employeeId], (err, result) => {
    if (err) {
      console.error('Error deleting employee:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      res.json({ message: 'Employee deleted successfully' });
    }
  });
});

// app.get('/employees/add', (req, res) => {
//   console.log("------------------",req.body)
//   // const { id,name, address, experience, birthdate, specialization } = req.body;
//   // Insert the new employee into the "employees" table
//   // connection.query('INSERT INTO employees (id,name, address, experience, birthdate, specialization) VALUES (2,Abbas, haifa, 4, 12-1-2002, dev)', (err, result) => {
//   //   if (err) {
//   //     console.error('Error inserting employee:', err);
//   //     res.status(500).json({ error: 'Internal Server Error' });
//   //   } else {
//   //     res.status(201).json({ message: 'Employee added successfully' });
//   //   }
//   // });
// });

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

app.get('/test', (req, res) => {
  res.json({ message: 'Employee deleted successfully',body:req.body });
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

// app.get('/managers444/:id', (req, res) => {
//   const employeeId = req.params.id;
//   console.log("22222222eeeeeee222---",employeeId)
//   connection.query('SELECT * FROM managers', (err, results) => {
//     if (err) {
//       console.error('Error retrieving data from MySQL:', err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     res.json(results);
//   });
// });

// API endpoint to delete an employee
// app.delete('/employees/delete', (req, res) => {
//   const employeeId = req.params.id;
//   console.log("22222222222---",employeeId)

//   // Delete the employee from the "employees" table
//   db.query(`DELETE FROM employees WHERE id = 2`, [2], (err, result) => {
//     if (err) {
//       console.error('Error deleting employee:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else if (result.affectedRows === 0) {
//       console.log("11111111111")
//       res.status(404).json({ error: 'Employee not found' });
//     } else {
//       console.log("22222222222")

//       res.json({ message: 'Employee deleted successfully' });
//     }
//   });
// });







////////////////////////////////////////////////////////



// Start the server
app.listen(8081, () => {
  console.log(`Server is running on port ${port}`);
});








const mysql=require('mysql');
const express=require('express');
const Joi=require('joi');
const db=require('./DB_Conn');

 const app=express();





app.get('/api/application/GPA', (req, res) => {
    const { GPA } = req.query;
  
    // Construct the SQL query based on the received criteria
    const sql = `SELECT * FROM application
    WHERE GBA > ${Number(GPA)};
  `;
  
    // Execute the SQL query
    db.query(sql, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error retrieving jobs' });
        return;
      }
      res.json(results); // Return the matching job listings as the API response
    });
  });

