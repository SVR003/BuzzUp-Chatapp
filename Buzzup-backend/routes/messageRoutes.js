import express from 'express'
import { userAuth } from '../middlewares/authUser.js'
import { getMessages, getUsersForSidebar, markMessageSeen, sendMessage } from '../controllers/messageController.js'

const messageRouter = express.Router()

messageRouter.get("/users", userAuth, getUsersForSidebar)
messageRouter.get("/:id", userAuth, getMessages)
messageRouter.put("/mark/:id", userAuth, markMessageSeen)
messageRouter.post("/send/:id", userAuth, sendMessage)


export default messageRouter