const express=require("express");
const app=express();
const cors=require("cors")
require("dotenv").config();
const dbConnect=require("./config/database.js")
const userRoutes=require("./routes/auth.js")
const cookieParser=require("cookie-parser")

dbConnect();


app.use(express.json());
app.use(cookieParser());


app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

const port=process.env.PORT|| 2000;

//routes
app.use("/api/v1/auth",userRoutes)


//def route
app.get('/',(req,res)=>{
    res.send("hello, server is ready. ");
})

app.listen(port,()=>{
    console.log(`app is running at port ${port}`);
})