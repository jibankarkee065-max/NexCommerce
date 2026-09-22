const expreess =require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const router = expreess.Router();

//@router  POST /api/users/register
//@desc Register a new user
//@access public
router.post("/register", async(req, res) => {
    const {name, email, password} = req.body;
    try{
        //Regisration login 
        res.send({name, email,password});

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");

    }
});

model.exports = router;