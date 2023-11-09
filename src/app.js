const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
// mongoose.connect('mongodb://0.0.0.0:27017/user', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Define a user schema
// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
// });

// Create a user model
