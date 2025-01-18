const mongoose=require("mongoose");

const UserSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
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
    },
    chats:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }]

},{timestamps:true});

module.exports= mongoose.model("User",UserSchema);