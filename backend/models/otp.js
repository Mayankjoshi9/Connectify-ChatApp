const mongoose =require("mongoose");
const mailSender=require("../utils/mailsender")

const otpSchema= new mongoose.Schema({
    email:{
      type:String,
      require:true,
      trim:true,
    },
    otp:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    },
});

async function sendVerificationEmail(email,otp){
    try {
        await mailSender(email,"Verfication Email",`<h1>Otp for You : ${otp}</h1>`)
    } catch (error) {
        console.log("could not send otp ");
        console.log(error);
    }
}

otpSchema.pre("save",async function(next){
    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp);
    }
    next();
})

module.exports=mongoose.model("Otp",otpSchema)
