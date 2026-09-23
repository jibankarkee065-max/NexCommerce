const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// @route   POST /api/user/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        let user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User({
            name,
            email: email.trim().toLowerCase(),
            password
        });

        await user.save();

        const payLoad = {
            user: {
                id: user._id,
                role: user.role
            }
        };

        jwt.sign(
            payLoad,
            process.env.JWT_SECRET,
            { expiresIn: "40h" },
            (err, token) => {
                if (err) {
                    return res.status(500).json({
                        message: "Token generation failed",
                        error: err.message
                    });
                }

                res.status(201).json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token
                });
            }
        );
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
});

// @route   POST /api/user/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        console.log("EMAIL FROM POSTMAN:", email);
        console.log("USER FOUND:", user ? "YES" : "NO");

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await user.matchPassword(password);

        console.log("PASSWORD MATCH:", isMatch);

        if (!isMatch) {
            return res.status(400).json({
                message: "Password does not match"
            });
        }

        const payLoad = {
            user: {
                id: user._id,
                role: user.role
            }
        };

        jwt.sign(
            payLoad,
            process.env.JWT_SECRET,
            { expiresIn: "40h" },
            (err, token) => {
                if (err) {
                    return res.status(500).json({
                        message: "Token generation failed",
                        error: err.message
                    });
                }

                res.json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token
                });
            }
        );

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
});


//@route GET /api/users/profile
// @desc Get logged-in user's profile (protected Route)
//access private

router.get("/profile", protect,async (req , res) => {
    res.json(req.user);
});

module.exports = router;