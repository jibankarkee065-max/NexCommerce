const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    // Check if Authorization header exists
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from:
            // Authorization: Bearer TOKEN
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // Find user from decoded token
            req.user = await User.findById(decoded.id).select("-password");

            // Check if user exists
            if (!req.user) {
                return res.status(401).json({
                    message: "User not found"
                });
            }

            // Continue to protected route
            next();

        } catch (error) {
            console.log("JWT ERROR:", error.message);

            return res.status(401).json({
                message: "Not authorized, token failed",
                error: error.message
            });
        }

    } else {
        return res.status(401).json({
            message: "Not authorized, no token"
        });
    }
};

//Middleware to check if the user is an admin
const admin = (req , res , next ) =>{
    if(req.user && req.user.role ==="admin"){
        next();
    }
    else{
        res.status(403).json({message:"Not authorized as an admin"});
    }
}



module.exports = { protect, admin };