const express = require("express")
const cors = require("cors")
const app = express()
const http = require("http")
const {Server} = require("socket.io")
const server = http.createServer(app)
app.use(cors())
const io = new Server(server,{
    cors:{
        origin:"https://abhinav-codes-chatapp.vercel.app/"
    }
})

io.on("connection",socket=>{
    console.log("User connected:" + socket.id)
    
    socket.on("join_room",data=>{
        socket.join(data)
        console.log("User connected in room:" + data + " id:"+socket.id)
        
    })
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)
    }) 
    

    socket.on("disconnect",()=>{
        console.log("User disconnected" + socket.id)
    })
})
server.listen(9000,()=>{
 console.log("Server started")
})
