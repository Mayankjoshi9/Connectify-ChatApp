const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({
    chatSessionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat',
        require:true,
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true,
    },
    content:{
        type:String,
        require:true,
    },
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