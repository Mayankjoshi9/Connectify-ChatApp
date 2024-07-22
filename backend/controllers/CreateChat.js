const Chat=require("../models/chat");

exports.CreateChat=async(req,res)=>{
    try {
        const {curruser,user}=req.body;
        if(!curruser || !user){
            res.status(400).json({
                success:false,
                message:"missing parameters"
            })
        }
        
        const chat=await Chat.findOne({
            participants:{$all:[curruser,user]},
        });

        if(!chat){
            chat=await Chat.create({participants:[curruser,user]});
        }

        res.status(200).json({
            success:true,
            message:"chat session created",
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"session can't created",
        })
    }
}