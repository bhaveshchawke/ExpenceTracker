import axios from "axios";
axios.defaults.withCredentials = true;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getTransactionPage = async () => {
  try {
    const response = await axios.get(
      `${backendUrl}/transactions/getTransactionPage`,
    );
    return response.message;
  } catch (error) {
    return error.messae;
  }
};
