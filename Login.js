const mysql=require('mysql');
const express=require('express');
const Joi=require('joi');
const db=require('./DB_Conn');
const bcrypt = require('bcrypt');

 const app=express();
 app.use(express.json());
// Add Seeker

app.post('/api/insertJob_Seeker',(req,res)=>{

//validation schema
const schema = Joi.object({
    name: Joi.string().required(),
    Email: Joi.string().email().required(),
    Password: Joi.string().min(6).required(),
    address: Joi.string().required(),
    Phone_Number: Joi.number().required(),
  });

  // Validate request body
const result = schema.validate(req.body);

if (result.error) {
  // Validation failed
  const errorMessage = result.error.details[0].message;
  return res.status(400).json({ error: errorMessage });
}
    
    const name=req.body.name;
    const Email=req.body.Email;
    const Password=req.body.Password;
    const address=req.body.address;
    const Phone_Number=req.body.Phone_Number;

  // Hash the password
  bcrypt.hash(Password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }
    


    //insert Job Seeker
    
    const sql="INSERT INTO Job_Seeker (name, Email, Password,address,Phone_Number) VALUES (?,?,?,?,?)";
    db.query(sql,[name,Email,hashedPassword,address,Phone_Number],(err,result)=>{
        if (err) {
            console.error('Error inserting Job Seeker: ', err);
            res.status(500).send('Error inserting Job Seeker');
            return;
          }
          console.log('Job Seeker inserted successfully!');
          res.status(200);
          res.send('Job Seeker inserted successfully!');
        });
      });


 })


 // SignIN for Job Seeker

 app.post('/signin', (req, res) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
      });
      
      // Validate the request body
      const { error, value } = schema.validate(req.body);
      
      // Check for validation errors
      if (error) {
        // Handle the validation error
        return res.status(400).json({ error: error.details[0].message });
      }
      
      // If validation succeeds, continue with the username and password values
      const { username, password } = value;
  
    // Retrieve the user from the database
    db.query('SELECT * FROM Job_Seeker WHERE name = ?', username, (err, results) => {
      if (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      if (results.length === 0) {
        res.status(401).json({ error: 'Invalid credentials' });
        console.log(results);
        return;
      }
      
      //Compare the password with the hashed password
      bcrypt.compare(password, user.Password, (err, match) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
  
        if (!match) {
          res.status(401).json({ error: 'Invalid credentials' });
          return;
        }
  
        res.status(200).json({ message: 'User signed in successfully' });
      });
    });
  });

 app.listen(5001,()=>{
    console.log('Listening on Port 5001 ...')
});