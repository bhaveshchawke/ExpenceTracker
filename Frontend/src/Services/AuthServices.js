import axios from "axios";
axios.defaults.withCredentials = true;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
//send userData
export const sendUserData = async (data) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/register`, data);

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
//sendOTP
export const sendOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/verifyOTP`, {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
//send Login Data
export const loginUser = async (email, password) => {
  const userData = {
    email,
    password,
  };

  try {
    const responce = await axios.post(
      `${backendUrl}/auth/verifyUser`,
      userData,
    );
    return responce.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};
//check login
export const checkAuth = async () => {
  try {
    const response = await axios.get(`${backendUrl}/auth/me`);
    return response.data;
  } catch (error) {
    return { isLoggedIn: false };
  }
};
//logout
export const logoutService = async () => {
  const response = await axios.post(`${backendUrl}/auth/logout`);
  return response.data;
};
