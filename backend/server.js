const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://nexus-auth-ivory.vercel.app/signup"
}));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connection established"))
    .catch(err => console.log(err));

app.use("/api/auth", require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));