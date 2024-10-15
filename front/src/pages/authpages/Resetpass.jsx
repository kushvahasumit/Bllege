import React from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";

const Resetpass = () => {
  const { resetPassword, error, isLoading, message } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await resetPassword(token, values.password);
      setSubmitting(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="p-4 max-w-sm w-full">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-black to-gray-700 text-transparent bg-clip-text">
              Reset Password
            </h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {message && (
              <p className="text-green-500 text-sm mb-4">{message}</p>
            )}

            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="password"
              >
                New Password
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Enter new password"
                component={Input}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm New Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                component={Input}
              />
            </div>

            <motion.div
              className="flex items-center justify-between"
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.button
                className="bg-black hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
                disabled={isSubmitting || isLoading}
                whileHover={{ scale: 1.02 }}
              >
                {isLoading || isSubmitting
                  ? "Resetting..."
                  : "Set New Password"}
              </motion.button>
            </motion.div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Resetpass;
