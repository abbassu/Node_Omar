
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
        throw err;
    }
   
    console.log('MySql Connected...');
});



