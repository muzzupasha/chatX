import bcrypt from "bcryptjs";
import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";

const USERNAME_REGEX = /^[A-Za-z0-9_]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,64}$/;

// funtion for registering a new user
export const register = async (req, res) => { 
    try {
        const { userName, fullName, password, confirmPassword, gender} = req.body;
        if (!userName || !fullName || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!USERNAME_REGEX.test(userName)) {
            return res.status(400).json({
                message: "Username must be 3-20 letters, numbers, or underscores.",
            });
        }
        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({
                message: "Password must be 8-64 characters and include uppercase, lowercase, a number, and a symbol.",
            });
        }
        if (password !== confirmPassword) { 
            return res.status(400).json({ message: "Passwords do not match" });
        }

       const existingUser = await User.findOne({userName}); 
       if (existingUser) {
        return res.status(400).json({
            message: "User Already exists please login",
            success:false
        })
       }

        // Hash the password using bcrypt with a salt round of 10
       const hashedPassword = await bcrypt.hash(password, 10); 

       // Generate a stable avatar URL for the new account.
       const profilePhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(
           fullName,
       )}&background=0f766e&color=fff`;

        await User.create({
            fullName, 
            userName,
            password: hashedPassword,
            gender,
            profilePhoto,
        })
       
       return res.status(201).json({ 
        message: "User registered successfully",
        success: true
    });

    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


// function for user login
export const Login = async (req, res) =>{
     
    try {
     const {userName, password} = req.body;

     // All fields are required
     if (!userName || !password) {
            return res.status(400).json({ message: "All fields are required" });
     }
    
     // Check if the user exists in the database
    const existingUser = await User.findOne({userName}); 

     if (!existingUser){
     return res.status(400).json({
        message: "User is not registered please register first",
        success:false
    });
    }  
    
    // password comparison using bcrypt
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect){
        return res.status(400).json({
            message: "Invalid Password",
            success:false
        });
    }

    // Token generation logic added here for successful login
    const tokenData = {
        userId:existingUser._id   // user id is variable name in tokenData object
    }
     
    // Generate a JWT token with the user ID and a secret key, set to expire in 1 day
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: "1d"});
    
    // Set the token in a cookie and send a success response with user details
    return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly:true, sameSite:"strict"}).json({        // const token = xyz
        message: "User logged in successfully",
        success:true,
        userId:existingUser._id,
        fullName:existingUser.fullName,
        userName:existingUser.userName,
        gender:existingUser.gender,
        profilePhoto:existingUser.profilePhoto,
    })

    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

// function for user logout
export const Logout = (req, res) =>{
 try {
    return res.status(200).cookie("token", "" , {maxAge: 0}).json({
        message: "User logged out successfully",
        success: true
    });
 } catch (error) {
    console.error("Error during user logout:", error);
    return res.status(500).json({ message: "Internal server error" });
 }
}

export const getAuthUser = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            userId: user._id,
            fullName: user.fullName,
            userName: user.userName,
            gender: user.gender,
            profilePhoto: user.profilePhoto,
        });
    } catch (error) {
        console.error("Error fetching authenticated user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// function to get other users except the logged-in user
export const getOtherUser = async (req, res) =>{
    try {
        const loggedInUserId = req.id // Assuming the authenticated user's ID is stored in req.id
        const otherUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password") // getting all users except the logged-in user and excluding the password field
        return res.status(200).json({
            message: "Other users fetched successfully",
            success: true,
            otherUsers
        });

    } catch (error) {
        console.error("Error fetching other user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// function debouncing the user search input
export const checkUsername = async (req, res) => {
    try {
        const userName = String(req.query.userName || "").trim();

        if (!USERNAME_REGEX.test(userName)) {
            return res.status(400).json({
                message: "Username must be 3-20 letters, numbers, or underscores.",
            });
        }
 
        const existingUser = await User.exists({ userName }); // Check if a user with the given username exists in the database
        return res.status(200).json({ available: !existingUser }); // Return true if the username is available, false otherwise
    } catch (error) {
        console.error("Error checking username availability:", error);
        return res.status(500).json({ message: "Unable to check username" });
    }
};