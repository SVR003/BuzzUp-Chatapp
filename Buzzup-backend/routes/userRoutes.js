import express from 'express'
import { authCheck, signup, updateProfile, userLogin } from '../controllers/userController.js';
import { userAuth } from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/signup', signup)
userRouter.post('/login', userLogin)
userRouter.put('/update-profile', userAuth, updateProfile)
userRouter.get('/check', userAuth, authCheck)

export default userRouter;
