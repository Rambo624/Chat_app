const express=require("express")
const app=express()
const {chats}=require("./utils/data")
const dotenv=require("dotenv").config()
const userRoute=require("./Routes/userRoute")
const chatRoute=require("./Routes/chatRoute")
const uri = process.env.MONGO_URL;
const cookieParser=require("cookie-parser")
const mongoose=require("mongoose")
const port=process.env.PORT
const cors=require("cors")

const allowedOrigins = [
  'http://localhost:5173',"https://dev-tinder-frontend.vercel.app"
  

 
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
    app.listen(port,(req,res)=>{
        console.log("server running on 3000")
    })
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

