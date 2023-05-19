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

 

    //insert job_list
    db.query('INSERT INTO employer SET ?',employerData,(err,result)=>{
        if (err) {
            console.error('Error inserting employer: ', err);
            res.sendStatus(500);
            return;
          }
          if(!result)
          {
              res.status(404).send('This Job_List with given ID was not exist');
          }
          console.log('Employer inserted successfully!');
          res.sendStatus(200);
          res.send(result);
        });

    


 })

// app.put('/api/edit_JobList/:id',(req,res)=>{

//     const updateSchema = Joi.object({
//         Employer_Name: Joi.string().required(),
//         Email: Joi.string().email().required(),
//       });
      
//       const result1 = updateSchema.validate(req.body);
//       if (result1.error) {
//         console.error("Validation error: ", result1.error);
//         res.status(400).json({ error: "Invalid request body" });
//         return;
//       }
    
//     const id=req.params.id;
//     let name=req.body.Employer_Name;
//     let email=req.body.Email;

//     var form_data = {
//         Employer_Name: name,
//         Email: email
//     }
//     const sql="UPDATE Employer SET ? WHERE Employer_ID= ?";
//     db.query(sql,[form_data,id],(err,result)=>{
//         if(err) {
//             console.error("Error updating employer: ", err);
//             res.status(500).send("An error occurred while updating the employer");
//             return;
//         }
//         res.send('Employer successfully updated');
//         console.log('Employer successfully updated');
//     })
// })


// app.delete('/api/delete_JobList/:id',(req,res)=>{
//     const id=req.params.id;

// })


app.listen(3000,()=>{
    console.log('Listening on Port 3000 ...')
});



