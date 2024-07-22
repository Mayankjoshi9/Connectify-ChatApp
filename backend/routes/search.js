const express=require("express");
const { searchUser } = require("../controllers/SearchUser");
const router=express.Router();

router.post("/searchUser",searchUser);

module.exports=router;