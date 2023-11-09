const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
     type: String,
     require: true,
     trim: true,
     unique: true,
     lowercase: true,
     index: true,
  },
  email: {
     type: String,
     require: true,
     trim: true,
     unique: true,
     lowercase: true,
  },
  password: {
     type: String,
     require: true,
  },
},{ timestamps: true });

//For get fullName from when we get data from database
// userSchema.virtual("name").get(function() {
//    return `${this.firstName} ${this.lastName}`;
//  });

// Create a user model
module.exports = mongoose.model("User", userSchema);