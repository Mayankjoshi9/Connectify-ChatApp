const express=require("express")
const router=express.Router();
const {createChat,fetchChat,groupChat}=require("../controllers/CreateChat");

const {auth}=require("../middlewares/auth");


router.post("/createSession",auth,createChat);
router.get("/fetchChat",auth,fetchChat);
router.post("/createGroup",auth,groupChat);

module.exports=router;

