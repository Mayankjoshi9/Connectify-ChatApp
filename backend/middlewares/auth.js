const jwt=require("jsonwebtoken");
require("dotenv").config()

exports.auth=async(req,res,next)=>{
    try {
        const token = req.body.token || req.cookies.token
         || req.header("Authorization").replace("Bearer ","");

         if(!token){
            res.status(401).json({
               success:false,
               message:"Token is Missing",
            })
         }
         try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
         }catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid.',
            })
         }
         next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token ",
        });
    }
}