import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UseMessage } from "../Hooks/UseMessage";

import {
  FiMail,
  FiLock,
  FiUser,
  FiSmartphone,
  FiArrowLeft,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { sendUserData } from "../Services/AuthServices";
import { sendOTP } from "../Services/AuthServices";
export const Register = () => {
  const navigate = useNavigate();
  // Step 1: User Details, Step 2: OTP Verification
  const { showMessage } = UseMessage();
  const [step, setStep] = useState(1);

  //for get input data//
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  // console.table(userData);
  const [otp, setOTP] = useState("");
  //for get inputs from user//
  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };
  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const data = await sendUserData(userData);
      console.log(data);
      showMessage(data.message, "success");
      setStep(2);
    } catch (err) {
      console.log("API Error:", err);
      showMessage(err.message, "error");
    }
  };
  const handleVerifyOTP = async () => {
    try {
      const data = await sendOTP(userData.email, otp);
      console.log(data);
      showMessage(data.message, "success");
      navigate("/login");
    } catch (err) {
      console.log("API Error:", err);
      showMessage(err.message, "error");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* messageBox */}

      {/* Brand Logo & Heading */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 select-none">
          Kharcha<span className="text-indigo-600">Pani</span>
        </h2>
        <h2 className="mt-6 text-2xl font-bold text-gray-900 tracking-tight">
          {step === 1 ? "Create an account" : "Verify your account"}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {step === 1
            ? "Start tracking your finances today."
            : "We've sent a 6-digit code to your email/phone."}
        </p>
      </div>

      {/* Register / OTP Form Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-200 sm:rounded-2xl sm:px-10">
          {/* ================= STEP 1: Details Form ================= */}
          {step === 1 && (
            <form className="space-y-5" onSubmit={handleSendOTP}>
              {/* Full Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    required
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleInput}
                    type="text"
                    placeholder="Bhavesh Chawke"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    required
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInput}
                    placeholder="you@example.com"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Mobile Number (OTP के लिए ज़रूरी) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    +91
                  </span>
                  <div className="absolute inset-y-0 left-12 pl-2 flex items-center pointer-events-none">
                    <FiSmartphone className="text-gray-400" />
                  </div>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInput}
                    placeholder="98765 43210"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    required
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInput}
                    placeholder="Create a strong password"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start mt-4">
                <div className="flex items-center h-5">
                  <input
                    required
                    id="terms"
                    type="checkbox"
                    name="isChecked"
                    value={userData.checked}
                    onChange={handleInput}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    htmlFor="terms"
                    className="text-gray-600 cursor-pointer"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Terms
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
              </div>

              {/* Send OTP Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Send OTP & Continue
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 2: OTP Form ================= */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-gray-700 text-center mb-4">
                  Enter the 6-digit OTP
                </label>
                <input
                  type="text"
                  maxLength="6"
                  name="OTP"
                  onChange={(e) => setOTP(e.target.value)}
                  placeholder="• • • • • •"
                  className="block w-full px-4 py-4 text-center text-3xl tracking-[1em] font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                />
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerifyOTP}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Verify & Create Account
              </button>

              <div className="flex flex-col items-center gap-4 mt-6">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Resend OTP
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
                >
                  <FiArrowLeft /> Back to details
                </button>
              </div>
            </div>
          )}

          {/* Social Sign up (सिर्फ Step 1 पर दिखेगा) */}
          {step === 1 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <FcGoogle className="text-xl" />
                  Google
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Link to Login */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Log in here
          </NavLink>
        </p>
      </div>
    </div>
  );
};
