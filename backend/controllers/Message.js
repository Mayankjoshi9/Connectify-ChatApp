const Message = require("../models/message");
const Chat = require("../models/chat");
const mongoose = require('mongoose');

exports.fetchMessage = async (req, res) => {
    try {

        const { chatSessionId } = req.params;
        const { page } = req.query;
        const userId = req.user.id;
        const pagelimit = 6;
        const skip = (page - 1) * pagelimit;


        if (!chatSessionId) {
            return res.status(403).json({
                success: false,
                message: "Parameter missing: chatSessionId",
            });
        }


        const chat = await Chat.findById(new mongoose.Types.ObjectId(chatSessionId)).populate({
            path: "messages",
            match: {
                isDeleted: false,
                deletedFor: { $nin: [userId] }
            },
            options: {
                limit: pagelimit,
                skip: skip,
                sort: {
                    createdAt: -1
                }
            },
            populate: {
                path: 'sender',
                select: 'name email',
            }
        });


        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "No message found for this chat session",
            });
        }

        const messages = chat.messages.reverse();
        const count= await Chat.findById(chatSessionId).populate({
            path: "messages",
            match: {
                isDeleted: false,
                deletedFor: { $nin: [userId] }
            },
            }).countDocuments();
        const hasMoreMessages = count < (pagelimit * page);

        return res.status(200).json({
            success: true,
            body: messages,
            hasMoreMessages: hasMoreMessages,
            message: "Messages found",
        });

    } catch (error) {
        console.error("Error fetching messages:", error); 
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

        const message = await Message.updateMany(
            { chatSessionId: chatSessionId },
            { $push: { deletedFor: userid } },
            { new: true }
        );

        if (!message) {
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