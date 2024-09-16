import { User } from "../model/User.js";
import bcryptjs from 'bcryptjs';
import { generateVerification } from "../utils/generateVerification.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetToken.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";

export const signup = async (req, res) => {
    const {email,password,name} = req.body;
    try {
        if(!email || !password || !name){
            throw new Error("All Field are required");
        }

        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({sucess:false,message: "User already exists"});
        }

        const hashPassword = await bcryptjs.hash(password,10); //hashed in 10 digit 
        const verificationToken = generateVerification();

        const user = new User({
          email,
          password: hashPassword,
          name,
          verificationToken,
          verificationTokenExpireAt: Date.now() + 24*60*60*1000 // 24 hrs
        });

        await user.save();
        console.log(user);

        // JWT authentication

        generateTokenAndSetCookie(res,user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
          sucess:true,
          message:"user created sucessfully",
          user:{
            ...user._doc,
            password:undefined
          }
        })
    } catch (error) {
        res.status(400).json({ sucess: false, message: error.message});
    }
};

export const verifyEmail = async (req,res) =>{
  const {emailCode} = req.body;

  try {
    const user = await User.findOne({
      verificationToken: emailCode,
      verificationTokenExpireAt: {$gt: Date.now()}
    })

    if(!user){
      return res.status(400).json({sucess:false, message:"Invalid or expired Verification code"});
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpireAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      sucess: true,
      message: "Email Verified sucessfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
        res.status(400).json({ sucess: false, message: error.message });
  }
}

export const login = async (req, res) => {
  res.send("login route");
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({sucess:true, message: "Logged Out sucessfully!!"});
};