const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors =require('../middleware/catchAsyncError');

// Register a user => /api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/8c8f1b4646ffda10251816c4225e9b05_dtwiys',
            url: 'https://res.cloudinary.com/dfqlao0kz/image/upload/v1678217803/shopit/image/upload/v1606305757/avatars/8c8f1b4646ffda10251816c4225e9b05_dtwiys.jpg'
        }
    })

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    })
})

//Log in user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

     // Checks if email and password is entered by user
     if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    const token = user.getJwtToken();

    res.status(200).json({
        success: true,
        token
    })

})