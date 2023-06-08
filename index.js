const express=require("express")
const {Server}=require("socket.io")
const {createServer}=require("http");
const {connection}=require("./config/db")
const {userRouter}=require("./route/user.router")
const{authenticate}=require("./middleware/authenticate")

const app=express()
const cors=require("cors")

const httpServer=createServer(app)
const io=new Server(httpServer)
const port=process.env.port

//middleware
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home page of Chat-App")
})

app.use("/user",userRouter)
io.on("connection",(socket)=>{
    console.log("User connected");
    socket.broadcast.emit("hello")

    socket.on("chat message",(msg)=>{
        io.emit("chat message",msg)
    })
})












httpServer.listen(port,async()=>{
    try{
        await connection
        console.log("DB connected")
    }
    catch(error){
       
        console.log(error.message)
    }
    console.log(`Server running in Port  ${port}`)
})