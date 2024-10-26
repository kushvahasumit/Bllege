import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type:String,
        required:true
    },
    college:{
        type:String,
        default:"New",
    },
    lastLogin :{
        type: Date,
        default: Date.now
    },
    isVerified: {
        type : Boolean,
        default: false
    },
    resetPasswordToken : String,
    resetPasswordExpireAt: Date,
    verificationToken: String,
    verificationTokenExpireAt: Date,
},{timestamps: true});

export const User = mongoose.model('User',userSchema);