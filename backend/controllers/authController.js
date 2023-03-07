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

    res.status(201).json({
        success: true,
        user
    })
})