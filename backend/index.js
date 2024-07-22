const express=require("express");
const app=express();
const cors=require("cors")
require("dotenv").config();
const dbConnect=require("./config/database.js")
const userRoutes=require("./routes/auth.js")
const cookieParser=require("cookie-parser");
const searchRoute=require("./routes/search.js")

dbConnect();


app.use(express.json());
app.use(cookieParser());


app.use(
	cors({
		origin:"http://localhost:5173",
		credentials:true,
	})
)

const port=process.env.PORT|| 2000;

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/search",searchRoute);


//def route
app.get('/',(req,res)=>{
    res.send("hello, server is ready. ");
})

app.listen(port,()=>{
    console.log(`app is running at port ${port}`);
})