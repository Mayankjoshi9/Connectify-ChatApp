const User = require("../models/user");

exports.searchUser=async(req,res)=>{
    try {
        const {email}=req.body;
        if(!email){
            return res.status(422).json({
                success:false,
                message:"email parameter missing"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found",
            })
        }

        return res.status(200).json({
            success:true,
            data:user,
            message:"user found"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"something went wrong , while searching user ",
        })
    }
}