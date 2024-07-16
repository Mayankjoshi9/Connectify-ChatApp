const mongoose=require("mongoose");

const UserSchema= new mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim:true,
    },
    Name:{
        type:String,
        require:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,
        trim:true,
    }
});

module.exports= mongoose.model("User",UserSchema);