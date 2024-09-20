const User = require("../models/user");

exports.searchUser = async (req, res) => {
    try {
        const searchTerm = req.query.q ? req.query.q.trim() : '';  // Trim and check query

        if (!searchTerm) {
            return res.status(422).json({
                success: false,
                message: "Search term (email) parameter is missing"
            });
        }

        // Perform a case-insensitive search using regex
        const users= await User.find({ name: { $regex: searchTerm, $options: 'i' } }, {name:1,email:1}).populate("additionalDetails");
        return res.status(200).json({
            success: true,
            data: users,
            message: "Users found"
        });

    } catch (error) {
        console.error("Error searching for users:", error);  // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "An error occurred while searching for users",
        });
    }
};
