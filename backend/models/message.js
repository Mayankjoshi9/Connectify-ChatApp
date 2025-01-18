const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    readBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', 
    }],
    isDeleted:{
        type:Boolean,
        default:false,
    },
    deletedFor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
    ]
},{timestamps:true});

module.exports=mongoose.model("Message",messageSchema);