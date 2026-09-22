const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            types:String,
            required: true,
            unique:true,
            trim:true,
            match:[/.+\@.+\..+/,"plase enter a valid  email address"]

        },

        password:{
            types:String,
            required:true,
            minLength:6,

        },

        role:{
            types:String,
            enum:["Customer","admin"],
            default:"customer",
        },
    },
    {timestamps:true}
);


//password Hash middleware

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    next();

});

// Match User entered password to Hash password

UserSchema.methods.matchPassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword , this.password);
};

 module.exports = mongoose.model("User", UserSchema);