const express=require("express");
const { fetchMessage } = require("../controllers/Message");
const { auth } = require("../middlewares/auth");

const router=express.Router();

router.get("/:chatSessionId",auth,fetchMessage);

module.exports=router;