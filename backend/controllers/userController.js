const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc Register a User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    //Checking if the user already exists in the database
    const userAvailable = await User.findOne({ username });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists!");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({ _id: user.id, username: user.username });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});


//@desc Login User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ username });

    // compware password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            // payload
            user: {
                id: user._id,
                username: user.username,
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "4h",
            }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(400);
        throw new Error("Invalid login credentials!");
    }
});


//@desc Update user info
//@route PUT /api/users/update
//@access private
const updateUser = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const { pass } = req.body;
    // hash password
    const hashedPassword = await bcrypt.hash(pass, 10);
    const updatedUser = await User.findOneAndUpdate(
        {
            _id: id,
        },
        {
            password: hashedPassword
        },
        { new: true },
    );
    if (updatedUser) {
        res.status(200).json({ _id: updatedUser.id, username: updatedUser.username });
    } else {
        res.status(400);
        throw new Error("Could not update!");
    }
});


//@desc Current User Info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});



module.exports = { registerUser, loginUser, currentUser, updateUser };