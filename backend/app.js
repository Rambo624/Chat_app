const express=require("express")
const app=express()
const {chats}=require("./utils/data")
const dotenv=require("dotenv").config()
const userRoute=require("./Routes/userRoute")
const chatRoute=require("./Routes/chatRoute")
const messageRoute=require("./Routes/messageRoute")
const uri = process.env.MONGO_URL;
const cookieParser=require("cookie-parser")
const mongoose=require("mongoose")
const port=process.env.PORT
const cors=require("cors")

const allowedOrigins = [
  'http://localhost:5173',"https://chat-app-frontend-omega-fawn.vercel.app/"
  

 
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'], // Allowed headers
  exposedHeaders: [ 'Set-Cookie']
};


mongoose.connect(uri)
  .then(() => {
    console.log('Connected successfully to MongoDB with Mongoose');
 
  })
  
  .catch((err) => {
    console.error('Mongoose connection error:', err);
  });

  

app.use(cors(corsOptions))
  app.use(express.json());
  app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send(chats)
})
app.use("/",userRoute)
app.use("/chat",chatRoute)
app.use("/messages",messageRoute)


const server=  app.listen(port,(req,res)=>{
  console.log("server running on 3000")
})

const io = require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin:'http://localhost:5173'
  }

});


io.on('connection', (socket) => {

socket.on("setup",(userData)=>{
  socket.join(userData._id)
  console.log("connected to socket")
  socket.emit("connected")
})
socket.on("join chat",(room)=>{
  socket.join(room)
  console.log(`User joined in ${room}`)
})

socket.on("new message",(newMessageReceived)=>{
  var chat=newMessageReceived.chat


  if(!chat.users) return console.log("no users in the chat")
chat.users.forEach((user) => {
  if (user._id==newMessageReceived.sender._id) return
  socket.in(user._id).emit("message received",newMessageReceived)
});
 
})

});

