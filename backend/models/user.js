const mongoose=require("mongoose");

const UserSchema= new mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim:true,
    },
    name:{
        type:String,
        require:true,
        trim:true,

    },
    password:{
        type:String,
        require:true,
        trim:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
    },
    token:{
        type:String,
        trim:true,
    },
    resetPasswordExpires:{
        type:Date,
    }
},{timestamps:true});

module.exports= mongoose.model("User",UserSchema);