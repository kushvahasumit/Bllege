import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../../components/Input";
import { useAuthStore } from "../../store/authStore";

function Login() {
      const [isLoading, setIsLoading] = useState(false);
      const {logIn, error} = useAuthStore();

      const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Required"),
      });
      
      const handleSubmit = async (values) => {
        try {
          console.log("Email:", values.email);
          setIsLoading(true);
          await logIn(values.email, values.password);
          setIsLoading(false);
        } catch (error) {
          console.log(error)
        }};
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="p-4 max-w-sm w-full">
              <h2 className="text-3xl font-bold mb-6">
                Happy to see you again !
              </h2>
              <p className="text-base mb-1">
                For testing, use the following credentials:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Email:</strong> aprilsamy1@sitp.com
                </li>
                <li>
                  <strong>Password:</strong> 123456
                </li>
              </ul>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  component={Input}
                  // placeholder="Enter your email"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  component={Input}
                  // placeholder="Enter your password"
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

              <motion.div
                className="flex items-center justify-between"
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
              >
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
                    "Sign In"
                  )}
                </motion.button>
              </motion.div>

              <div>
                <p className="text-stone-400 flex justify-center text-xs mt-6">
                  <strong>
                    <Link
                      to={"/forget-password"}
                      className="pr-2 text-blue-600 hover:underline"
                    >
                      forget password?
                    </Link>
                  </strong>{" "}
                  Dont't worry!
                </p>
              </div>

              <div className="border border-solid border-stone-200 mt-3" />
              <div className="flex items-center justify-center mt-1">
                <p>
                  New to Bllege?{" "}
                  <strong>
                    {" "}
                    <Link to={"/sign-up"} className="hover:underline">
                      Sign Up
                    </Link>{" "}
                  </strong>{" "}
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Login;
