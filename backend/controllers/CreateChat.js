const Chat=require("../models/chat");
const User=require("../models/user")

exports.createChat=async(req,res)=>{
    try {
        const {curruser,user}=req.body;
        // const id=req.user.id;
        if(!curruser || !user){
           return res.status(400).json({
                success:false,
                message:"missing parameters"
            })
        }
        
        let chat=await Chat.findOne({
            participants:{$all:[curruser._id,user._id]},
        });

        if(chat){
            return res.status(400).json({
                success:false,
                message:"chat session already exists. ",
            })
        }
        
        chat=await Chat.create({participants:[curruser._id,user._id]});
        User.findByIdAndUpdate(curruser._id,{$push:{chats:chat._id}},{new:true});
        
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
        
        const chat = await Chat.find ({
            participants:userid,
        }).populate({
            path:"participants",
            select:"email name createdAt",
            populate:{
                path:"additionalDetails"
            }
        }
        );

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