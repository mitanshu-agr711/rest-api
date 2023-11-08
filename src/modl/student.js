const mongoose = require('mongoose');
var validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true,"Email Id is already present"],
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error(`Invalid email`);
            }
        }
    },
});

const User =new mongoose.model('Student', userSchema);

module.exports = User;
 