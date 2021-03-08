const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dbConnection = require('./database/connection');
const errorHandler = require('./errors/errorHandler');
const sport = require('./sport');
const tournament = require('./tournament');
const match = require('./match');

const app = express();

let corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/sports', sport);
app.use('/matches', match);
app.use('/tournaments', tournament);
app.use(errorHandler);

dbConnection.init(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Listening on port: ${process.env.PORT || 3000}`);
    });
});