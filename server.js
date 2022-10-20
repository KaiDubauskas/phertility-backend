const express = require('express');
const request = require('request');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require('axios');
require('dotenv').config();

app.use(express.json());
app.use(bodyParser.json());

const url = 'https://api.musixmatch.com/ws/1.1';
const key = process.env.API_KEY;

//gets top 10 Taylor Swift Songs sorted by track rating
app.get('/api/songs', function(req, res){
  axios.get(`${url}/track.search?q_artist=taylor%20swift&page_size=10&page=1&s_track_rating=desc&apikey=${key}`)
.then((response) => {
  const data = response.data;
  const i = getRandomInt(data.length);
  res.send(data.message.body.track_list);
})
.catch((error) => {
  console.log(error);
});
});
 

//get lyrics for song based on id 
app.get('/api/songs/lyrics/:id', function(req, res){
  let idParam = parseInt(req.params.id);
  axios.get(`${url}/track.lyrics.get?track_id=${idParam}&apikey=${key}`)
.then((response) => {
  const data = response.data;
  res.send(data.message.body.lyrics.lyrics_body);
})
.catch((error) => {
  console.log(error);
});
});





  
  // Helper function - gets a random integer up to (but not including) the maximum
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };
  
  







const port = 5004;
app.listen(port, () => console.log(`Listening on port ${port}...`));