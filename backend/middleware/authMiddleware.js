const jwt = require("jsonwebtoken");
const User = require("../models/User");


//Middleware to protect routes
const protect  = async(req ,resizeBy, next) => 
{
    let token;
    if(req.headers.authorization && req.headers.authorization.startWith("Bearer")
    ) {
       try{
        

         } catch (error){

         }
          }
        };