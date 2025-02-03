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
            return res.status(200).json({
                success:true,
                data:chat,
                message:"chat session already exists. ",
            })
        }
        
        chat=await Chat.create({participants:[curruser._id,user._id]});
        await User.findByIdAndUpdate(curruser._id,{$push:{chats:chat._id}},{new:true});
        await User.findByIdAndUpdate(user._id,{$push:{chats:chat._id}},{new:true});

        console.log(chat);
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
        const chats = await User.findById(userid)
    .select("chats")
    .populate({
        path: "chats",
        populate: {
            path: "participants",
            select: "email name createdAt",
            populate: {
                path: "additionalDetails",
            },
        },
    })
    .then(user => user?.chats);
        // const chat = await Chat.find ({
        //     participants:userid,
        // }).populate({
        //     path:"participants",
        //     select:"email name createdAt",
        //     populate:{
        //         path:"additionalDetails"
        //     }
        // }
        // );

        return res.status(200).json({
            success:true,
            data:chats,
            message:"all chat fetched",
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error in fetching chat",
        })
    }
}


exports.groupChat=async(req,res)=>{
    try {
        const {chatName,users}=req.body;
        const userid=req.user.id;

        if(!users || !chatName){
            return res.status(400).json({
                success:false,
                message:"missing parameters",
            })
        }
        if(users.length<1){
            return res.status(400).json({
                success:false,
                message:"at least 2 users",
            })
        }
        users.push(userid);
        const groupchat=await Chat.create({
            participants:users,
            groupName:chatName,
            admin:req.user.id,
            isGroup:true,
        }).populate(
            {
                path: "participants",
                select: "email name createdAt",
                populate: {
                    path: "additionalDetails",
                },
            },

        );
        
        await User.updateMany(
            { _id: { $in: users } }, // Match multiple user IDs
            { $push: { chats: groupchat._id } } // Push the group chat ID to the chats array
          );
          
        return res.status(200).json({
            success:true,
            data:groupchat,
            message:"group chat created."
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error in creating group",
        })
    }
}