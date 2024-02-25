const express = require("express");
const userRouter = express.Router();
const zod = require("zod");
const { User } = require('../database/db')
const jwt = require("jsonwebtoken");
const {JWTSECRET} = require('../config');
const { authMiddleware } = require("../middleware/auth");


const signUpSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

const signInSchema = zod.object({
  userName:zod.string().email(),
  password: zod.string()
});

userRouter.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const { success, error } = signUpSchema.safeParse(body);
    if (success) {
      const user = await User.findOne({
        userName: body.userName,
      });
      //Check if user already existjwt.sign
      if (user) {
        res.json({ message: "User already exists" }).status(400);
        return ;
      }
      //Create new user
      const newUser = await User.create(body);
      const token = jwt.sign({ userId: newUser._id }, JWTSECRET);
      res.status(200).json({ message: "User created successfully", token });
    } else {
      console.log(error);
      res.status(400).json({ message: "Invalid input, failed to parse schema" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to create user" });
  }
});

userRouter.post('/signin', async (req, res) => {
  try {
    console.log('signin log -> ', req.body);
    const { success } = signInSchema.safeParse(req.body);
    if(success) {
      const user = await User.findOne({
        userName: req.body.userName
      });

      if(user) {
        if(user.password === req.body.password) {
          return res.status(200).json({message: 'Successful signin', id: "" + (user._id)});
        } else {
          return res.status(200).json({ message: 'Invalid password'});
        }
      } else {
        return res.status(400).json({message: 'User does not exist'});
      }
    }
    else {
      return res.status(400).json({ message: 'Invalid request. Make sure you are sending the correct data'}); 
    }
  } catch (error) {
    console.log('Printing error -> ', error.toString());
    return res.status(500).json({ message: 'Something went wrong. Signin failed'});
  }
});

module.exports = { userRouter };
