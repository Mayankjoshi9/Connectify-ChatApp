const express=require("express")
const router=express.Router();
const {createChat,fetchChat}=require("../controllers/CreateChat");

const {auth}=require("../middlewares/auth");


router.post("/createSession",auth,createChat);
router.get("/fetchChat",auth,fetchChat);

module.exports=router;

