import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { generateVerification } from "../utils/generateVerification.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetToken.js";
import { sendResetEmail, sendResetSucessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";
import { User } from "../model/User.js";

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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email
    });
    if(!user){
      return res.status(400).json({sucess: false, message: "Invalid credentials!"})
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);
    if(!isValidPassword){
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid credentials!" });
    }

    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      sucess: true,
      message: "LogIn sucessfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
        res.status(400).json({ sucess: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({sucess:true, message: "Logged Out sucessfully!!"});
};

export const forgetPassword = async (req, res) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({email});

    if(!user){
      return res
        .status(400)
        .json({ sucess: false, message: "Does't find this User!" });
    }

    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000; // 1hr

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpireAt = resetTokenExpireAt;

    await user.save();

    // send email...
    await sendResetEmail(user.email, `${process.env.RESET_URL}/reset-password/${resetToken}`);

    res.status(200).json({ sucess: true, message: "Password reset link sent to your email!" });
  } catch (error) {
    res.status(400)
    .json({ sucess: false, message: "Invalid credentials!" });
  }
};

export const resetPassword = async (req,res) =>{

  try {
    const {token} = req.params;
    const {password} = req.body; 

    const user = await User.findOne({
      resetPasswordToken : token,
      resetPasswordExpireAt : {$gt : Date.now()},
    })

    if (!user) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid or Expired token! Please try again :)" });
    }

    // update password
      const hashNewPassword = await bcryptjs.hash(password, 10); //hashed in 10 digit
      
      user.password = hashNewPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpireAt = undefined;
      await user.save();

      await sendResetSucessEmail(user.email);
      
      res
        .status(200)
        .json({
          sucess: true,
          message: "Password reset sucessful!",
        });
  } catch (error) {
    res.status(400)
    .json({ sucess: false, message: "Invalid credentials!" });
  }
}

export const checkAuth = async (req,res)=>{
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({
          sucess: false,
          message: "User not found!",
        });
    }

    res.status(200).json({success : true, user});
  } catch (error) {
    res.status(400).json({ sucess: false, message: error_message });
  }
}