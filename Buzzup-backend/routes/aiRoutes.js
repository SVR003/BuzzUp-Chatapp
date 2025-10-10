import express from 'express'
import { userAuth } from '../middlewares/authUser.js'
import { chatWithAi } from '../controllers/aiController.js'

const aiRouter = express.Router()

aiRouter.post('/chat', userAuth, chatWithAi)

export default aiRouter