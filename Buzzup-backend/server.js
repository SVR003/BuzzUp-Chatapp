import express from 'express'
import cors from 'cors'
import http from 'http'
import 'dotenv/config'
import { connectDb } from './lib/db.js'
import userRouter from './routes/userRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import { Server } from 'socket.io'
import User from './models/userModel.js'
import aiRouter from './routes/aiRoutes.js'

const app = express()
const server = http.createServer(app)

// socket io server initialization
export const io = new Server(server, {
    cors: {origin: "*"}
})

// Store online users
export const userSocketMap = {};

// Socket io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    // console.log("User Connected", userId);
    
    if(userId) userSocketMap[userId] = socket.id;

    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        // console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

app.use(express.json({limit: "4mb"}))
app.use(cors())

app.use('/api/status', (req,res) => res.send("Server is Live"))
app.use('/api/auth', userRouter)
app.use('/api/message', messageRouter)
app.use('/api/ai', aiRouter)

// create an ai assistant

const seedAiUser = async () => {
    try {
        const aiUser = await User.findOne({ email: "ai@buzzup.com"});

        if(!aiUser){
            await User.create({
                email: "ai@buzzup.com",
                fullName: "Buzz AI",
                password: "buzzai123",
                profilePic: "https://th.bing.com/th/id/OIP.D6Ec5hVuAYZ-jgatFlpC6wHaIF?w=145&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
                bio: "Hi! I am BuzzUp AI Assistant",
                isBot: true
            })
            console.log("BuzzAi created successfully");
        }else{
            console.log("BuzzAi already exists");
            
        }
    } catch (error) {
        console.log("failed to seed Ai", error.message);
        
    }
}

await connectDb()
await seedAiUser()

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log("Server is Running at PORT:" +PORT ))

