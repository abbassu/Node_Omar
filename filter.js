const mysql=require('mysql');
const express=require('express');
const Joi=require('joi');
const db=require('./DB_Conn');

 const app=express();





app.get('/api/jobs', (req, res) => {
    const { title, location, salaryRange } = req.query;
  
    // Construct the SQL query based on the received criteria
    const sql = `SELECT * FROM job_listing
      WHERE title LIKE '%${title}%'
      AND location LIKE '%${location}%'
      AND salary_range LIKE '%${salaryRange}%'
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


// filter seekers who applied
  app.get('/api/Job_Seeker', (req, res) => {
    const { name, Email } = req.query;
  
    // Construct the SQL query based on the received criteria
    const sql = `SELECT * FROM Job_Seeker
      WHERE name LIKE '%${name}%'
      AND Email LIKE '%${Email}%'
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


  app.get('/api/application/GPA', (req, res) => {
    const { GPA } = req.query;
    console.log(typeof(GPA));
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


  app.listen(4000,()=>{
    console.log('Listening on Port 4000 ...')
});
  