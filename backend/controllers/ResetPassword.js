const User = require("../models/user")
const crypto = require("crypto");
const mailSender = require("../utils/mailsender")
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(403).json({
                success: false,
                message: "All Field are Required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User is not registered"
            })
        }

        const token = crypto.randomBytes(20).toString("hex");

        await User.findOneAndUpdate({ email }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000,
        }, { new: true })

        const url = `http://localhost:5173/update-password/${token}`
        await mailSender(email, "Reset Password Link",
            `<h4>Here your reset Password Link <br><h1>${url}</h1> </h4>`);

        return res.status(200).json({
            success: true,
            message: "Email Sent Successfully.Please check Email"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, while sending reset mail."
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;
        if (!password || !confirmPassword || !token) {
            return res.status(400).json({
                success: false,
                message: "All Parameter required"
            })
        }

        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password are different",
            })
        }

        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "token is invalid."
            })
        }
        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "token expired"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ token: token }, {
            password: hashPassword,
            token: undefined,
            resetPasswordExpires: undefined,
        }, { new: true })


        return res.status(200).json({
            success: true,
            message: "password successfully reseted"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went while resetting password",
        })
    }
}