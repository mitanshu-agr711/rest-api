const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('./modl/user');
require('./db/conn');

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



const secretKey = 'Mitanshu'; 

app.use(bodyParser.json());


app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
     const existingUser = await User.findOne({ email });

     if (existingUser) {
       return res.status(400).json({ message: 'User with this email already exists' });
     }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log(password, user,"password uswer")
    const passwordMatch =  await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials Password' });
    }

 
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    
    res.status(200).json({ message: 'Signin successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});