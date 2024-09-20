const mongoose=require("mongoose");

const ProfileSchema= new mongoose.Schema({
    image:{
         type:String,
         trim:true,
    },
    about:{
        type:String,
        trim:true,
        default: 'Hey there! I am using this app.'
    }

});

module.exports=mongoose.model("Profile",ProfileSchema);