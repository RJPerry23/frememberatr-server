require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 1337;
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

//make middleware function for JWT
//implement on all endpoints that depend on being logged in
//check to see if there is a token
//if there is, it needs to be processed
//if there isn't do nothing

app.use('/users', userRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});