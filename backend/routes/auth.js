const express=require("express")
const router=express.Router()
const {auth}=require("../middlewares/auth");

const{
    login,otp,signup,changePassword
}=require("../controllers/Auth");

const{
    resetPasswordToken,resetPassword
}=require("../controllers/ResetPassword");


router.post("/login",login)
router.post("/signup",signup)
router.post("/sendOtp",otp)
router.post("/resetPasswordToken",resetPasswordToken);
router.post("/resetPassword",resetPassword);
router.post("/changePassword",auth,changePassword);

module.exports=router