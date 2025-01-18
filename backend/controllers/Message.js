const Message = require("../models/message");
const Chat=require("../models/chat");
const mongoose = require('mongoose');

exports.fetchMessage = async (req, res) => {
    try {
        
        const { chatSessionId } = req.params;
        const userId = req.user.id;

        // Check if chatSessionId is provided
        if (!chatSessionId) {
            return res.status(403).json({
                success: false,
                message: "Parameter missing: chatSessionId",
            });
        }
        

        const chat=await Chat.findById(new mongoose.Types.ObjectId(chatSessionId)).populate({
             path:"messages",
             match:{
                isDeleted:false,
                deletedFor:{$nin:[userId]}
             },
             populate:{
                path:'sender',
                select:'name email',
             }
        }     );

        
        if (!chat ) {
            return res.status(404).json({
                success: false,
                message: "No message found for this chat session",
            });
        }

        return res.status(200).json({
            success: true,
            body: chat.messages,
            message: "Messages found",
        });

    } catch (error) {
        console.error("Error fetching messages:", error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "Error while fetching messages",
        });
    }
};

exports.clearAllMessage = async (req, res) => {
    try {
        const { chatSessionId } = req.params;
        const userid = req.user.id;

        if (!chatSessionId) {
            return res.status(403).json({
                success: false,
                message: "parameter missing",
            })
        };
        
        const message= await Message.updateMany(
            {chatSessionId:chatSessionId},
            {$push: {deletedFor:userid}},
            {new:true}
        );

        if(!message){
            return res.status(404).json({
                success: false,
                message: "No messages found for this chat session",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Messages cleared for the user",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred!"

        })
    }
}