import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userSchema.js"; // make sure this file also uses ESM
import Document from "./models/documentSchema.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pen2gether', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("Error ", err);
});

const JWT_SECRET = process.env.JWT_SECRET;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

app.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        if (!passwordPattern.test(password)) {
            return res.status(400).json({ message: "Password does not meet required constraints" });
        } else if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password does not match with confirm password" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: "Successfully registered" });
    }
    catch (err) {
        console.log("Error occurred ", err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        let data=await User.findOne({email});
        console.log(data);
        if(!data){
            return res.status(400).json({message:"User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, data.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        let jwtToken=jwt.sign({_id:data._id,email,password},JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({message:"Login successful",jwtToken});
    }
    catch (err) {
        console.log("Error occurred ", err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

function authenticateUser(req,res,next){
    let token=req.headers.authorization&& req.headers.authorization.split(" ")[1];
    if(!token) return res.status(401).json({message:"No token provided"});
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err) return res.status(403).json({message:"Invalid token"});
        req.user=decoded;
        next();
    })
}
// generateUserId("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNuZWhhQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiU25laGFAMDIiLCJpYXQiOjE3NDYyNTMwOTUsImV4cCI6MTc0NjI1NjY5NX0.maDJIpN6LsIM2J8EL3pN9z3P0oAMbHNAIGmPeCEEzwc");
app.post('/createDoc',authenticateUser,async(req,res)=>{
    const {name,content}=req.body;
    try{
        const existingDoc=await Document.findOne({name});
        if(existingDoc){
            return res.status(400).json({message: `${name} already exists`});
        }
        const newDoc=await Document.create({name,content,owner:req.user._id,collaborators:[req.user._id]});
        await newDoc.save();
        res.status(200).json({document:newDoc,message:"Document Created"});
    }
    catch (err) {
        console.log("Error occurred ", err);
        res.status(500).json({ message: "Internal Server error" });
    }
});
app.listen(5000, () => console.log("Server is running"));