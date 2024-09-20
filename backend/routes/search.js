const express = require("express");
const { searchUser } = require("../controllers/SearchUser");
const { auth } = require("../middlewares/auth");
const router = express.Router();

// Route for searching users, protected by authentication middleware
router.get("/searchUser",auth,searchUser);

module.exports = router;
