const express= require('express')
const cors=require('cors')
const app=express();
const helmet=require('helmet')
require('dotenv').config()
app.use(cors({
  origin: 'https://horizon-blogs-jrbk.onrender.com', // Allow only your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(helmet())
app.use(express.json())
const db= require('./db/db')
const port= process.env.PORT||3000
const userRouter=require('./Routes/userRoute')
const blogRoute=require('./Routes/blogRoutes')
// listen to the app # refector`
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use("/blog",blogRoute);
app.use("/user",userRouter)
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)

})


