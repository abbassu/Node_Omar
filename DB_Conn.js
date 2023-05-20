const mysql=require('mysql');

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
        console.error('Error connecting to the database:', err);
        return;
    }
   
    console.log('Connected to the database ...');
});

module.exports=db;