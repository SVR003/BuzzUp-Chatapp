import Groq from "groq-sdk/index.mjs";
import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import { io, userSocketMap } from "../server.js";


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY})

const getAiUser = async () => {
    return await User.findOne({ email: "ai@buzzup.com"})
}

// function to chat with Ai

export const chatWithAi = async (req,res) => {
    try {

        const { text } = req.body;
        const senderId = req.user._id;

        if(!text){
            return res.status(400).json({ success: false, message: "Enter a text message"})
        }

        const aiUser = await getAiUser()
        if(!aiUser){
            return res.status(500).json({ success: false, message: "Ai Assistant not initialised"})
        }

        const userMessage = await Message.create({
            senderId,
            receiverId: aiUser._id,
            text
        })

        // emit user message

        const senderSocketId = userSocketMap[senderId];
        if (senderSocketId) {
        io.to(senderSocketId).emit("newMessage", userMessage);
        }

        // ✅ Call Groq API to get AI response
        const response = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant", // free & fast model
        messages: [{ role: "user", content: text }],
        });

        const aiReply = response.choices[0].message.content;

        // ✅ Save AI response
        const botMessage = await Message.create({
        senderId: aiUser._id,
        receiverId: senderId,
        text: aiReply,
        });

        // Emit AI response to user socket
        if (senderSocketId) {
        io.to(senderSocketId).emit("newMessage", botMessage);
        }

        res.json({ success: true, userMessage, botMessage });

        
    } catch (error) {
       console.log("Ai chat error", error.message);

       res.status(500).json({ success: false, message: "AI Assistant error" });
    }
}