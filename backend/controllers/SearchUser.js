const User = require("../models/user");

exports.searchUser=async(req,res)=>{
    try {
        const {email}=req.body;
        if(!email){
            res.status(403).json({
                success:false,
                message:"email parameter missing"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            res.status(400).json({
                success:false,
                message:"user not found",
            })
        }

        res.status(200).json({
            success:true,
            data:user,
            message:"user found"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong , while searching user ",
        })
    }
}