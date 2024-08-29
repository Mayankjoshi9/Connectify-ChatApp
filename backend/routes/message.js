const express=require("express");
const { fetchMessage, clearAllMessage } = require("../controllers/Message");
const { auth } = require("../middlewares/auth");

const router=express.Router();


router.get("/fetchMessages/:chatSessionId",auth,fetchMessage);
router.post("/clearAllMessage/:chatSessionId",auth,clearAllMessage);

module.exports=router;