
const Chat=require("../models/chat");

exports.createChat=async(req,res)=>{
    try {
        const {curruser,user}=req.body;
        if(!curruser || !user){
           return res.status(400).json({
                success:false,
                message:"missing parameters"
            })
        }
        
        let chat=await Chat.findOne({
            participants:{$all:[curruser,user]},
        });

        if(!chat){
            chat=await Chat.create({participants:[curruser,user]});
        }

       return res.status(200).json({
            success:true,
            data:chat,
            message:"chat session created",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"session can't created",
        })
    }
}

exports.fetchChat=async(req,res)=>{
    try {
        const userid=req.user.id;
        
        const chat = await Chat.find({
            participants:userid,
        }).populate("participants","email name");

        return res.status(200).json({
            success:true,
            data:chat,
            message:"all chat fetched",
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error in fetching chat",
        })
    }
}