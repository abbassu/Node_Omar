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


app.use(express.json());
// edit on job list
app.post('/api/insertJobList',(req,res)=>{

    const JobListSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        requirements: Joi.string().required(),
        salary_range: Joi.string().required(),
        location: Joi.string().required(),
      });

    const JobListData = req.body;
   
    
    const result=JobListSchema.validate(JobListData);
    if(result.error)
    {
        console.error('Validation error: ', result.error);
        res.status(400).json({ error: 'Invalid request body' });
        return;
    }
    
    const title=req.body.title;
    const description=req.body.description;
    const requirements=req.body.requirements;
    const salary_range=req.body.salary_range;
    const location=req.body.location;
    

    //res.send({Message:'successfull'});

    //insert job_list
    //const sql="INSERT INTO employer SET ?";
    const sql="INSERT INTO job_listing(title, description, requirements, salary_range, location) VALUES (?,?,?,?,?)";
    //const sql="SELECT * FROM Job_Listing;";
    db.query(sql,[title,description,requirements,salary_range,location],(err,result)=>{
        if (err) {
            console.error('Error inserting Job List: ', err);
            res.status(500).send('Error inserting Job List');
            return;
          }
          if(!result)
          {
              res.status(404).send('This Job_List with given ID was not exist');
          }
          console.log('Job_List inserted successfully!');
          res.status(200);
          res.send('Job_List inserted successfully!');
        });

    


 })

 //update job list
app.put('/api/edit_JobList/:id',(req,res)=>{

    const updateSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        requirements : Joi.string().required(),
        salary_range : Joi.string().required(),
        location: Joi.string().required()
      });
      
      const result1 = updateSchema.validate(req.body);
      if (result1.error) {
        console.error("Validation error: ", result1.error);
        res.status(400).json({ error: "Invalid request body" });
        return;
      }
    
    const id=req.params.id;
    let title=req.body.title;
    let description=req.body.description;
    let requirements=req.body.requirements;
    let salary_range=req.body.salary_range;
    let location=req.body.location;


    const sql="UPDATE job_listing SET title=?,description=? requirements=? salary_range=? location=?  WHERE JobList_ID= ?";
    db.query(sql,[title,description,requirements,salary_range,location],(err,result)=>{
        if(err) {
            console.error("Error updating Job List: ", err);
            res.status(500).send("An error occurred while updating the Job List");
            return;
        }
        res.send('Job List successfully updated');
        console.log('Job List successfully updated');
    })
})




app.delete('/delete_JobList/:id',(req,res)=>{
    const id=req.params.id;

    const sql="delete from job_listing WHERE JobList_ID= ?";
    db.query(sql,id,(err,result)=>{
        if(err){
            console.error("Error deleting Job List: ", err);
            res.status(500).send("An error occurred while deleting the Job List");
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



