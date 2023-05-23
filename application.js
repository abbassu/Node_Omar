const mysql=require('mysql');
const express=require('express');
const Joi=require('joi');
const db=require('./DB_Conn');

 const app=express();
 
// git Job List according to id

app.get('/api/application',(req,res)=>{
   // let id=req.params.id;
   //WHERE app_ID=
    const sql="SELECT * FROM application ";
    db.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        if(!result)
        {
            res.status(404).send('This application with given ID was not exist');
        }
        res.send(result);

    });
});


app.use(express.json());
// edit on Application
app.post('/api/insertApplication',(req,res)=>{

    const ApplicationSchema = Joi.object({
        resume: Joi.string().required(),
        cover_letter: Joi.string().required(),
        applied_date: Joi.date().format('YYYY-MM-DD').required()
      });

    const ApplicationData = req.body;
   
    
    const result=ApplicationSchema.validate(ApplicationData);
    if(result.error)
    {
        console.error('Validation error: ', result.error);
        res.status(400).json({ error: 'Invalid request body' });
        return;
    }
    
    const resume=req.body.resume;
    const cover_letter=req.body.cover_letter;
    const applied_date=req.body.applied_date;
    const status="Submitted";
    
    

    

    //insert job_list
    
    const sql="INSERT INTO application(resume, cover_letter, status, applied_date) VALUES (?,?,?,?)";
    db.query(sql,[resume,cover_letter,status,applied_date],(err,result)=>{
        if (err) {
            console.error('Error inserting Application: ', err);
            res.status(500).send('Error inserting Application');
            return;
          }
          console.log('Application inserted successfully!');
          res.status(200);
          res.send('Application inserted successfully!');
        });

    


 })

 //update Application
app.put('/api/edit_Application/:id',(req,res)=>{

    const updateSchema = Joi.object({
        status: Joi.string().required()
      });
      
      const result1 = updateSchema.validate(req.body);
      if (result1.error) {
        console.error("Validation error: ", result1.error);
        res.status(400).json({ error: "Invalid request body" });
        return;
      }
    
    const id=req.params.id;
    let status=req.body.status;



    const sql="UPDATE Application SET status=?  WHERE app_ID= ?";
    db.query(sql,[status,id],(err,result)=>{
        if(err) {
            console.error("Error updating Application: ", err);
            res.status(500).send("An error occurred while updating the Application");
            return;
        }
        res.send('Application successfully updated');
        console.log('Application successfully updated');
    })
})




app.delete('/delete_Application/:id',(req,res)=>{
    const id=req.params.id;

    const sql="delete from Application WHERE JobList_ID= ?";
    db.query(sql,id,(err,result)=>{
        if(err){
            console.error("Error deleting Application: ", err);
            res.status(500).send("An error occurred while deleting the Application");
            return;
        }
        if(!result)
        {
            res.status(404).send('This Application with given ID was not exist');
        }
        res.send('The Application with id = '+id+' is deleted !');
    })
})

app.listen(3000,()=>{
    console.log('Listening on Port 3000 ...')
});



