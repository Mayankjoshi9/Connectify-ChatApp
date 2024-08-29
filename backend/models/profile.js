const mongoose=require("mongoose");

const ProfileSchema= new mongoose.Schema({
    image:{
         type:String,
         trim:true,
    },
    about:{
        type:String,
        trim:true,
    }

});

module.exports=mongoose.model("Profile",ProfileSchema);