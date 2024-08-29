const mongoose=require("mongoose");

const groupSchema=new mongoose.Schema({
    participants:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:"User",
        }
    ],
    name:{
        type:String,
        trim:true,
        require:true,
    },
    desc:{
        type:String,
        trim:true,
        require:true,
    },
    admin:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }]
},{timestamps:true});

