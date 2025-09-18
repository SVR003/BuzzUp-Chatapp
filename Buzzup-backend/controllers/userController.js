import { generateToken } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import cloudinary from "../lib/cloudinary.js"


// New user Signup
export const signup = async (req,res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        
        if( !fullName || !email || !password || !bio){
            return res.json({success: false, message: "All fields are mandatory!"})
        }

        const user = await User.findOne({email})

        if(user){
            return res.json({success: false, message: "User already exists!"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            fullName, email, password: hashedPassword, bio
        })

        const token = generateToken(newUser._id)

        res.json({success: true, userData: newUser, token, message: "Account created successfully"})

    } catch (error) {
        console.log(error.message);
        
        res.json({success: false, message: error.message})
    }
}


// User login

export const userLogin = async (req,res) => {
    const {email, password} = req.body
    
    try {
        
         const userData = await User.findOne({email})

         const isPassword = await bcrypt.compare(password, userData.password)

         if(!isPassword){
            res.json({success: false, message: "Invalid Credentials!"})
         }

         const token = generateToken(userData._id)

         res.json({success: true, userData, token, message: "Login Successfull"})

    } catch (error) {
        console.log(error.message);
        
        res.json({success:false, message: error.message})
    }

}

// Auth user

export const authCheck = (req,res) =>{
    res.json({success: true, user: req.user})
}

// Update user profile

export const updateProfile = async(req,res) => {
    try {
        const { profilePic, bio, fullName} = req.body
    
        const userId = req.user._id

        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName}, {new: true})
        }else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, bio, fullName}, {new: true})
        }

        res.json({success: true, user: updatedUser})
    } catch (error) {

        console.log(error);
        
        res.json({success: false, message: error.message})
    }
}