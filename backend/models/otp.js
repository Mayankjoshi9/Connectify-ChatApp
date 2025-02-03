const mongoose =require("mongoose");
const mailSender=require("../utils/mailsender");
const { OtpEmail } = require("../mail/OtpEmail");

const otpSchema= new mongoose.Schema({
    email:{
      type:String,
      required:true,
      trim:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:10*60,
    },
});

async function sendVerificationEmail(email, otp) {
    try {
        if (!email || !otp) {
            throw new Error("Email or OTP is missing");
        }
        await mailSender(email, "Verification Email", OtpEmail({ otp }));

    } catch (error) {
        console.error("Failed to send OTP:", error);
        throw new Error("Email sending failed");
    }
}

otpSchema.pre("save", async function (next) {
    try {
        if (this.isNew) {
            if (!this.email || !this.otp) {
                throw new Error("Email or OTP is missing in document");
            }
            await sendVerificationEmail(this.email, this.otp);
        }
        next();
    } catch (error) {
        console.error("Error in pre-save middleware:", error);
        next(error); // Pass error to Mongoose
    }
});


module.exports=mongoose.model("Otp",otpSchema)
