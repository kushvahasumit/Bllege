import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const EmailVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const { verificationEmail } = useAuthStore();

  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1 && value !== "") {
        inputRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRef.current[index - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const enteredOtp = otp.join("");
    try {
        setIsLoading(false);
        await verificationEmail(enteredOtp);
        navigate("/");
      } catch (error) {
        console.log("otp Error :",error);
      }
    //API call for verification
    // setTimeout(() => {
    //   setIsLoading(false);
      

    //   console.log("OTP entered:", enteredOtp);
      
    //   // after sucess of otp
      
    // }, 2000);
  };

  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="p-4 max-w-sm w-full">
        <div>
          <h1 className="text-3xl font-bold text-center bg-clip-text">
            Verify Your Email
          </h1>
          <p className="text-center mb-4 text-stone-400">
            Enter the 6-digit code sent to your email!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-400 text-white border-2 border-stone-500 rounded-lg focus:border-white focus:outline-none"
              />
            ))}
          </div> 
          
          <motion.div>
            <motion.button
              className="bg-black hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block w-5 h-5 border-t-2 border-r-2 border-white border-solid rounded-full"
                ></motion.div>
              ) : (
                "Verify Me"
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
