const mongoose=require("mongoose");

const chatSchema=new mongoose.Schema({
    participants:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:"User",
        }
    ],
    groupName:{
        type:String,
        trim:true,
    },
    admin:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    }],
    lastMessage:{
        type:String,
        trim:true,
    },
    isGroup:{
        type:Boolean,
        default:false,
    }
},{timestamps:true});

module.exports=mongoose.model("Chat",chatSchema);
