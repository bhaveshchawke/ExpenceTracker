import axios from "axios";
axios.defaults.withCredentials = true;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// create budget card
export const createBudgetCard = async (data) => {
  try {
    const response = await axios.post(
      `${backendUrl}/budget/createBudgetCard`,
      data,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get buget cards

export const getAllBudgetCard = async () => {
  try {
    const response = await axios.get(`${backendUrl}/budget/getBudgetCard`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
//add transactions

export const addExpence = async (data) => {
  try {
    const response = await axios.post(
      `${backendUrl}/transactions/addTransactions`,
      data,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get transaction data
export const getTransactions = async () => {
  try {
    const response = await axios.get(
      `${backendUrl}/transactions/getTransactions`,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get All expences
export const getAllExpenses = async () => {
  try {
    const response = await axios.get(
      `${backendUrl}/transactions/getAllExpenses`,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
//get all budget cards
export const getAllBudgetCards = async () => {
  try {
    const response = await axios.get(
      `${backendUrl}/transactions/getAllBudgetCards`,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
//for edit categry page
export const editCategry = async (data) => {
  try {
    const response = await axios.post(`${backendUrl}/budget/editCategry`, data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete category
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${backendUrl}/budget/deleteCategory/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete transaction
export const deleteTransaction = async (id) => {
  try {
    const response = await axios.delete(`${backendUrl}/transactions/deleteTransaction/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// edit transaction
export const editTransaction = async (data) => {
  try {
    const response = await axios.post(`${backendUrl}/transactions/editTransaction`, data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
