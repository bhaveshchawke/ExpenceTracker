import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc"; // Google Icon के लिए react-icons/fc
import { Link, useNavigate } from "react-router-dom"; // पेज बदलने के लिए
import { useState } from "react";
import { loginUser } from "../Services/AuthServices";
import { UseMessage } from "../Hooks/UseMessage";
import { UseAuthData } from "../Hooks/UseAuthData";
export const Login = () => {
  const { showMessage } = UseMessage();
  const { setIsLoggedIn, setUser } = UseAuthData();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleLoginData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await loginUser(loginData.email, loginData.password);
      setIsLoggedIn(true);
      setUser(responce.user);
      showMessage(responce.message, "success");
      navigate("/");
    } catch (error) {
      showMessage(error, "error");
    }
  };
  return (
    // पूरी स्क्रीन को कवर करने और बीच में लाने के लिए min-h-screen और flex का उपयोग
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Logo & Heading */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 select-none">
          Kharcha<span className="text-indigo-600">Pani</span>
        </h2>
        <h2 className="mt-6 text-2xl font-bold text-gray-900 tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Please enter your details to sign in.
        </p>
      </div>

      {/* Login Form Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-200 sm:rounded-2xl sm:px-10">
          <form className="space-y-6">
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
                  type="email"
                  name="email"
                  onChange={handleLoginData}
                  placeholder="you@example.com"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all"
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
                  type="password"
                  name="password"
                  onChange={handleLoginData}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900 cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <div className="mt-6">
              <button className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <FcGoogle className="text-xl" />
                Google
              </button>
            </div>
          </div>
        </div>

        {/* Link to Register */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};
