import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import {ArrowLeft, Mail} from 'lucide-react';

const ForgetPassword = () => {
  const [email, setEmail] = useState();
  const [isSubmit, setIsSubmit] = useState();

  const { isLoading, forgetPassword } = useAuthStore();

  // Define validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  
  const handleSubmit = async (e) => {
    // e.preventDefault();
    await forgetPassword(e);
    setIsSubmit(true);
  };

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="">
        {!isSubmit ? (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values.email);
              handleSubmit(values.email);
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="text-center">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-black to-gray-700 text-transparent bg-clip-text ">
                  Forget Password
                </h2>
                <p className="text-gray-600 mb-6">
                  Enter your email address, and we'll send you a reset link.
                </p>

                {/* Custom Input component integrated with Formik */}
                <Field
                  name="email"
                  type="text"
                  placeholder="Email"
                  component={Input}
                  value={email}
                />

                <motion.div>
                  <motion.button
                    className="bg-black hover:bg-zinc-800 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline w-full"
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
                      "Forget Password"
                    )}
                  </motion.button>
                </motion.div>
                <div className="px-8 py-8 flex justify-center ">
                  <Link
                    to="/login"
                    className="text-sm text-black hover:underline flex items-center"
                  >
                    <ArrowLeft className="h-3 w-4 mr-2" /> Back to Login
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-20 h-20 rounded-full bg-black flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="h-12 w-12 text-white " />
            </motion.div>

            <p className="text-gray-500 mb-6">
              If a account exist for {email}, you will receive a password reset
              link shortly.
            </p>
            <div className="px-8 py-8 flex justify-center ">
              <Link
                to="/login"
                className="text-sm text-black hover:underline flex items-center"
              >
                <ArrowLeft className="h-3 w-4 mr-2" /> Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword
