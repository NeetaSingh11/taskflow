const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill all fields",
        });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
        return res.status(400).json({
            message: "User already exists",
        });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
        name,
        email,
        password: hashedPassword,
        });

        res.status(201).json({
        message: "User Registered Successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
        message: "Server Error",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all fields",
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } 
    catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};