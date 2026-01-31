const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.Mongo_Url)
    .then(() => console.log("connection established"))
    .catch(err => console.log(err));

app.use("/api/auth", require('./routes/auth'));

app.listen(5000, console.log("Server Started on Port 5000"));