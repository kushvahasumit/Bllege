import { useState, useEffect } from "react";
import { Formik, Form, Field} from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../../components/Input";
import { useAuthStore } from "../../store/authStore";

function SignupForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { signUp, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
      try {
        setIsLoading(true);
        console.log("Email:", values.email);
        await signUp(values.email,values.password);
        setIsLoading(false);
        navigate("/email-verification");
      } catch (error) {
        setIsLoading(false);
      }
    };


    const restrictedDomains = ["gmail.com", "yahoo.com", "hotmail.com"];
    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .required("Required")
        .test(
          "domain-check",
          "Email from this domain is not allowed",
          (value) => {
            if (!value) return false;
            const emailDomain = value.split("@")[1].toLowerCase();
            return !restrictedDomains.includes(emailDomain);
          }
        ),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    });

    return (
      <div className="w-full h-full flex items-center justify-center ">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="p-4 max-w-sm w-full">
              <h2 className="text-3xl font-bold mb-6">Sign Up for Bllege</h2>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-0" htmlFor="email">
                  Email
                </label>
                <h1 className="mb-2 text-lostSouls hover:underline">
                  Please use your college email !!
                </h1>
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

              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}

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
                    "Sign Up"
                  )}
                </motion.button>
              </motion.div>

              <div>
                <p className="text-stone-400 text-xs mt-6">
                  By creating an account, you agree to our <u> Terms </u> &{" "}
                  <u> Privacy Policy</u> !
                </p>
              </div>

              <div className="border border-solid border-stone-200 mt-3" />
              <div className="flex items-center justify-center mt-1">
                <p>
                  Already a member?{" "}
                  <strong>
                    {" "}
                    <Link to={"/login"} className="hover:underline">
                      Sign in
                    </Link>{" "}
                  </strong>{" "}
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
}

function SignupPage() {
  return (
    <div className="h-screen flex">
      <div className="w-full">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
