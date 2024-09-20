

const express=require("express");
const cors=require("cors")
require("dotenv").config();
const dbConnect=require("./config/database.js")
const userRoutes=require("./routes/auth.js")
const cookieParser=require("cookie-parser");
const searchRoute=require("./routes/search.js")
const Message = require('./models/message.js');
const chatRoute=require("./routes/chat.js")
const messageRoute=require("./routes/message.js")


const {createServer}=require("http");
const {Server}= require("socket.io");
const { cloudinaryConnect } = require("./config/cloudinary.js");
const fileUpload = require("express-fileupload");




const app=express();
const server= createServer(app);
const io=new Server(server,{
	cors:{
		origin:"*",
		methods:["GET","POST"],
		credentials:true,
	},
	connectionStateRecovery: {}
});

app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)

dbConnect();


app.use(express.json());
app.use(cookieParser());
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

cloudinaryConnect();


io.on("connection",(socket)=>{
	console.log("User Connected");

	socket.on('CreateSession',(sessionId,user1Id,user2Id)=>{
		socket.join(sessionId);
		io.to(user1Id).emit('sessionCreated',sessionId);
		io.to(user2Id).emit('sessionCreated',sessionId);
	});
	
	socket.on('join',(chatSessionId)=>{
		console.log(`User joined chat session: ${chatSessionId}`);
		socket.join(chatSessionId);
	})

	socket.on('sendMessage',async(message)=>{
		try {
			const newMessage= await Message.create({
				chatSessionId:message.chatSessionId,
				sender:message.senderId,
				content:message.content});

			const populatedMessage = await Message.findById(newMessage._id).populate("sender", "email name");
			
			io.to(message.chatSessionId).emit('message',populatedMessage);
		} catch (error) {
			console.log('Error in saving message',error);
			
		}
	});

	socket.on('disconnect',()=>{
		console.log('user disconnected');
	})
})

const port=process.env.PORT|| 2000;

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/search",searchRoute);
app.use("/api/v1/chat",chatRoute);
app.use("/api/v1/message",messageRoute);


//def route
app.get('/',(req,res)=>{
    res.send("hello, server is ready. ");
})

server.listen(port,()=>{
    console.log(`app is running at port ${port}`);
})