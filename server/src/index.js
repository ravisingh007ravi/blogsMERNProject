const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route.js');
const dotenv = require('dotenv');
require('dotenv').config()

const app = express();
app.use(express.json());

const DB = process.env.URL;
const port = process.env.PORT;

mongoose.connect(DB)
    .then(() => console.log("Mongoose is Connected😊😊"))
    .catch((err) => console.log(err));

app.use('/', route);

app.listen(port, () => console.log(`Server is Running Succesfully ${port}💕`));