const mysql=require('mysql');
const express=require('express');
const Joi=require('joi');

const pool=mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : 'root123',
    database : 'mydatabase',
    port :'8081'
})

const app= express();

app.get('/get/:id',(req,res)=>{
    const id= req.params.id;
    pool.getConnection((err,conn)=>{
        if(err){
            res.send('Error Occured')
        }
        const sql="SELECT * FROM Job_Listing WHERE JobList_ID= ?";
        conn.query(sql,id,(err,result)=>{
            if(!err){
                res.send(result);
            }
            conn.release();
        })
    })
})


app.use(express.json);
app.put('/api/edit_JobList/:id',(req,res)=>{

    // const updateSchema = Joi.object({
    //     Employer_Name: Joi.string().required(),
    //     Email: Joi.string().email().required(),
    //   });
      
    //   const result1 = updateSchema.validate(req.body);
    //   if (result1.error) {
    //     console.error("Validation error: ", result1.error);
    //     res.status(400).json({ error: "Invalid request body" });
    //     return;
    //   }
      
    //const id=req.params.id;
    // let name=req.body.Employer_Name;
    // let email=req.body.Email;

//     var form_data = {
//         Employer_Name: req.body.name,
//         Email: req.body.email
//     }
//     pool.getConnection((err,conn)=>{
//         if(err){
//             res.send('Error Occured')
//         }
//     const sql="UPDATE Employer SET ? WHERE Employer_ID= ?";
//     conn.query(sql,[form_data,id],(err,result)=>{
//         if(err) {
//             console.error("Error updating employer: ", err);
//             res.status(500).send("An error occurred while updating the employer");
//             conn.release();
//             return;
//         }
//         res.send('Employer successfully updated');
//         console.log('Employer successfully updated');
//     })
// })
})

app.post('/test',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})
app.listen(4000,()=>{
    console.log('Listening on Port 4000 ...')
});