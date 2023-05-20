const mysql=require('mysql');
const express=require('express');
const Joi=require('joi');
const db=require('./DB_Conn');

 const app=express();
 
// git Job List according to id

app.get('/api/job_listing/:id',(req,res)=>{
    let id=req.params.id;
    const sql="SELECT * FROM Job_Listing WHERE JobList_ID=";
    db.query(sql+id,(err,result)=>{
        if(err)
        {
            throw err;
        }
        if(!result)
        {
            res.status(404).send('This Job_List with given ID was not exist');
        }
        res.send(result);

    });
});


// app.use((err, req, res, next) => {
//     console.error('Error:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   });

// insert new Job List

app.use(express.json);

app.post('/api/insertJobList',(req,res)=>{

    const employerSchema = Joi.object({
        Employer_Name: Joi.string().required(),
        Email: Joi.string().email().required(),
        Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        Address: Joi.string().required(),
        Company_Name: Joi.string().required(),
        Phone_Number: Joi.number().integer().required()
      });

    const employerData = req.body;
    res.send(employerData);
    console.log(req);
    const result=employerSchema.validate(employerData);
    if(result.error)
    {
        console.error('Validation error: ', result.error);
        res.status(400).json({ error: 'Invalid request body' });
        return;
    }
    //console.log(req.body);
    const Employer_Name=req.body.Employer_Name;
    const Email=req.body.Email;
    const Password=req.body.Password;
    const Address=req.body.Address;
    const Company_Name=req.body.Company_Name;
    const Phone_Number=req.body.Phone_Number;

    //insert job_list
    //const sql="INSERT INTO employer SET ?";
    const sql="INSERT INTO employer(Employer_Name, Email, Password, Address, Company_Name, Phone_Number) VALUES (?,?,?,?,?,?)";
    //const sql="SELECT * FROM Job_Listing;";
    db.query(sql,[Employer_Name,Email,Password,Address,Company_Name,Phone_Number],(err,result)=>{
        if (err) {
            console.error('Error inserting employer: ', err);
            res.status(500).send('Error inserting employer');
            return;
          }
          if(!result)
          {
              res.status(404).send('This Job_List with given ID was not exist');
          }
          console.log('Employer inserted successfully!');
          res.status(200);
          res.send('Employer inserted successfully!');
        });

    


 })

app.put('/api/edit_JobList/:id',(req,res)=>{

    const updateSchema = Joi.object({
        Employer_Name: Joi.string().required(),
        Email: Joi.string().email().required(),
      });
      
      const result1 = updateSchema.validate(req.body);
      if (result1.error) {
        console.error("Validation error: ", result1.error);
        res.status(400).json({ error: "Invalid request body" });
        return;
      }
    
    const id=req.params.id;
    let Employer_Name=req.body.Employer_Name;
    let Email=req.body.Email;

    var form_data = {
        Employer_Name: Employer_Name,
        Email: Email
    }
    const sql="UPDATE Employer SET Employer_Name=?,Email=? WHERE Employer_ID= ?";
    db.query(sql,[Employer_Name,Email,id],(err,result)=>{
        if(err) {
            console.error("Error updating employer: ", err);
            res.status(500).send("An error occurred while updating the employer");
            return;
        }
        res.send('Employer successfully updated');
        console.log('Employer successfully updated');
    })
})


app.delete('/api/delete_JobList/:id',(req,res)=>{
    const id=req.params.id;

})

app.delete('/delete_JobList/:id',(req,res)=>{
    const id=req.params.id;

    const sql="delete from Job_Listing WHERE JobList_ID= ?";
    db.query(sql,id,(err,result)=>{
        if(err){
            console.error("Error deleting employer: ", err);
            res.status(500).send("An error occurred while deleting the employer");
            return;
        }
        if(!result)
        {
            res.status(404).send('This Job_List with given ID was not exist');
        }
        res.send('The Job List with id = '+id+' is deleted !');
    })
})

app.listen(3001,()=>{
    console.log('Listening on Port 3001 ...')
});



