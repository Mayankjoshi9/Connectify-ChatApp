const Message = require("../models/message");


exports.fetchMessage=async(req,res)=>{
    try {
        const {chatSessionId}=req.params;
        if(!chatSessionId){
           return res.status(403).json({
                success:false,
                message:"parameter missing",
            })
        }

        const message= await Message.find({chatSessionId}).populate('sender','name email');

       return res.status(200).json({
            success:true,
            body:message,
            message:"found message"
        })
    } catch (error) {
        return res.status(500).json({
            sucess:false,
            message:"Error while fetcing Messsage",
        })
    }
}