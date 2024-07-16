const express=require("express")
const router=express.Router()

const{
    login,otp,signup
}=require("../controllers/Auth");


router.post("/login",login)
router.post("/signup",signup)
router.post("/sendOtp",otp)

module.exports=router