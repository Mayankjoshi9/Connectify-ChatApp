const express=require("express")
const router=express.Router();
const {createChat}=require("../controllers/CreateChat");


router.post("/createSession",createChat);

module.exports=router;

