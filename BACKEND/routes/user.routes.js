import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import productModel from '../models/product.js'
import dotenv from "dotenv";

dotenv.config();
const userRouter = express.Router();
userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", { username, password });
  
    try {
      const user = await userModel.findOne({ username });
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ success: false, message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Invalid password");
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ success: true, token, user: { username: user.username, email: user.email } });
  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  
userRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
  
      const user = await userModel.create({
        username,
        email,
        password
      });
  
      res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  

export default userRouter;