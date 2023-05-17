const mysql=require('mysql');
const express=require('express');



//Connect to database

const db=mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root123',
    database : 'mydatabase',
    port :'8081'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
   
    console.log('MySql Connected...');

});


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


app.listen(3000,()=>{
    console.log('Listening on Port 3000 ...')
});



