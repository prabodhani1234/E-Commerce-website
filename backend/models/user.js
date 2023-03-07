const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your Name Con Not exceed 30 Characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'Your Password must be longer than 8 characters'],
        select: false
    },
    avatar:{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetpasswordToken: String,
    resetPasswordExpire: Date

})
module.exports =mongoose.model('User', userSchema)