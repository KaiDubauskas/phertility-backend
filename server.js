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

 
/*
var top10Songs = [];
for(let j = 0; j<data.message.body.track_list.length; j++){
  top10Songs.push(data.message.body.track_list[j].track.track_id);
  console.log(top10songs);
}
res.send(top10Songs);
*/

//gets top 10 Taylor Swift Songs sorted by track ratings
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




//taylor swift artist id: 259675
//&apikey=f1865c1ca1fde95012cf743b577990fe
/*
axios.get('https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=sexy%20and%20i%20know%20it&q_artist=lmfao&apikey=f1865c1ca1fde95012cf743b577990fe')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
  */

  
  // Helper function - gets a random integer up to (but not including) the maximum
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };
  
  







const port = 5004;
app.listen(port, () => console.log(`Listening on port ${port}...`));