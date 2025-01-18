const User=require("../models/user");
const Profile=require("../models/profile")
const otpGenerator=require("otp-generator");
const Otp=require("../models/otp")
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailsender");
require("dotenv").config();

exports.login=async(req,res)=>{
    try{
       const { email,password}=req.body;
       if(!email || !password){
         return  res.status(403).json({
               success:false,
               message:"All Field are Required",
          })
       }
       const user=await User.findOne({email:email}).populate("additionalDetails");
       if(!user){
        return res.status(401).json({
            success:false,
            message:"user not registered"
        })
       }

       if(await bcrypt.compare(password,user.password)){
           const payload={
            email:user.email,
            id:user._id,
           }
           const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"5h",
           });
           user.token=token;
           user.password=undefined;
           
           const options={
             expires:new Date(Date.now()+3*24*60*60*1000),
             httpOnly:true,
           };
            return res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"Login Successfull."
           });
       }
       else{
        return  res.status(401).json({
            success:false,
            message:"Password is Incorrect",
        })
       }

    }catch(error){
         return res.status(500).json({
            success:false,
            message:"Unable to Login. Please Login Again! ",
         })
    }
};

exports.otp= async(req,res)=>{
    try{
        const{email}=req.body;
        if(!email){
           return res.status(401).json({
                success:false,
                message:"Please Provide Email",
            })
        }
        const user=await User.findOne({email});
        if(user){
           return res.status(401).json({
                success:false,
                message:"Already Register",
            })
        }

        var otp=otpGenerator.generate(6,
            {lowerCaseAlphabets:false , upperCaseAlphabets: false,
                 specialChars: false})
        
        let result=await Otp.findOne({otp});

        while(result){
             otp=otpGenerator.generate(6,
                {lowerCaseAlphabets:false , upperCaseAlphabets: false,
                     specialChars: false})
             result= await Otp.findOne({otp});
            
        }

        const otpBody=await Otp.create({email:email,otp:otp});

        return res.status(200).json({
            success:true,
            otpBody:otpBody,
            message:"otp Created Successfully",
        })



    }catch(error){
       return res.status(500).json({
            success:false,
            message:"Error in Creating Otp",
        })
    }
}

exports.signup=async (req,res)=>{
    try{
        const {name,email,password,confirmPassword,otp}= req.body;
        if ( !name || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required ",
            })
        }

        if(password!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirmPassword are not same",
            })
        }

        const ExistingUser=await User.findOne({email});
        if(ExistingUser){
            return res.status(400).json({
                success:false,
                message:"User Already Registered",
            })
        }
        const otpBody=await Otp.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log("otp : ",otpBody);
        if(!otpBody){
            return res.status(400).json({
                success:false,
                message:"otp not found"
            })
        }
        if(otpBody.otp!=otp){
           return res.status(400).json({
            status:false,
            message:"Otp not Matching"
           })
        }
        const profile = await Profile.create({
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${name}`,  // Add image here
        });

        const hashedPassword= await bcrypt.hash(password,10);
        const user=await User.create({email:email,name:name,
            password:hashedPassword,additionalDetails:profile._id});
        
        
       return res.status(200).json({
            success:true,
            message:"User Registered Successfully",
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User can't registered.",
        })
    }
}

exports.changePassword= async(req,res)=>{
    try {
        const {oldPassword,password}=req.body;
        const id=req.user.id;
        if(!password && !oldPassword){
            return res.status(400).json({
                success:false,
                message:"all fields are required "
            })
        }
        const userDetail=await User.findById(id);
        if(!userDetail){
           return  res.status(400).json({
                success:false,
                message:"user detail is not found",
            })
        }
        const Ismatch=await bcrypt.compare(oldPassword,userDetail.password);
        if(!Ismatch){
          return  res.status(400).json({
                success:false,
                message:"The Password is incorrect",
            })
        }

        const hashPassword=await bcrypt.hash(password,10);
        const updatedUserDetail=await User.findByIdAndUpdate(id,
            {password:hashPassword},
             {new:true}
        )

        try {
            await mailSender(userDetail.email,
                "password has been updated",
                `password updated successfully for ${updatedUserDetail.name}`

            )

        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"error while senting email",
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"Password Updated successfully",
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while updating Password",
        })
    }
}

exports.searchUser = async (req, res) => {
    try {
        const searchTerm = req.query.q ? req.query.q.trim() : '';  // Trim and check query
        
        if (!searchTerm) {
            return res.status(422).json({
                success: false,
                message: "Search term (email) parameter is missing"
            });
        }

        // Perform a case-insensitive search using regex
        const users = await User.find({
            $or:[
               { name:{$regex:searchTerm,$options:'i'}},
               { email:{$regex:searchTerm,$options:'i'}}
            ],
            
        }).select("-password").populate("additionalDetails")


        return res.status(200).json({
            success: true,
            data: users,
            message: "Users found"
        });

    } catch (error) {
        console.error("Error searching for users:", error);  // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "An error occurred while searching for users",
        });
    }
};