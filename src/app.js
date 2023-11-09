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
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// Create a user model
const User = mongoose.model('User', userSchema);

const secretKey = 'Mitanshu'; // Replace with a secure secret key

app.use(bodyParser.json());

// Endpoint for user signup
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {

     // Check if the user with the provided email already exists
     const existingUser = await User.findOne({ email });

     if (existingUser) {
       return res.status(400).json({ message: 'User with this email already exists' });
     }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '1h' });

    // Send token in the response
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint for user signin
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    // Send token in the response
    res.status(200).json({ message: 'Signin successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
