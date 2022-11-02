const express = require('express');
const request = require('request');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require('axios');
const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

require('dotenv').config();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));


const key = process.env.API_KEY;


app.get('/api/clinics/:lat/:long', function (req, res) {
  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=Abortion%20Clinic&location=${req.params.lat}%2C${req.params.long}&radius=10000&key=${process.env.API_KEY}`)
    .then((response) => {
      const data = response.data;
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/api/contraceptives/:lat/:long', function (req, res) {
  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=Contraceptive%20Clinic&location=${req.params.lat}%2C${req.params.long}&radius=10000&key=${process.env.API_KEY}`)
    .then((response) => {
      const data = response.data;
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});


const port = process.env.PORT || 5004;
app.listen(port, () => console.log(`Listening on port ${port}...`));
