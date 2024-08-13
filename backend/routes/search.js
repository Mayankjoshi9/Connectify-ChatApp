const express=require("express");
const { searchUser } = require("../controllers/SearchUser");
const {auth}=require("../middlewares/auth")
const router=express.Router();

router.post("/searchUser",auth,searchUser);

module.exports=router;