const axios=require('axios');
const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
app.use(cors());

//process.env.RAPID_API_KEY
//https://arbeitnow-free-job-board.p.rapidapi.com/api/job-board-api
app.get('/skills',async(req,res)=>{
    const options = {
        method: 'GET',
        url: 'https://arbeitnow-free-job-board.p.rapidapi.com/api/job-board-api',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': '2993546486mshd19e8e2221d5618p130bd1jsne9abffd5ad1a',
          'X-RapidAPI-Host': 'arbeitnow-free-job-board.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          //console.log(response.data);
          res.json(response.data);
      } catch (error) {
          console.error(error);
      }
})

//
app.get('/getFreeJob',async(req,res)=>{
    const options = {
        method: 'GET',
        url: 'https://arbeitnow-free-job-board.p.rapidapi.com/api/job-board-api',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': '2993546486mshd19e8e2221d5618p130bd1jsne9abffd5ad1a',
          'X-RapidAPI-Host': 'arbeitnow-free-job-board.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          //console.log(response.data);
          res.json(response.data);
      } catch (error) {
          console.error(error);
      }

})





app.get('/external-data', async (req, res) => {
    try {
      const response = await axios.get('https://arbeitnow-free-job-board.p.rapidapi.com/api/job-board-api'); // Replace with the actual external API URL
  
      // Return the response data to the client
      res.json(response.data);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });



app.listen(5000,()=>{
    console.log('Listening on Port 5000 ...')
});
