import { FiPlus } from "react-icons/fi";
import { ExpenceProgressCard } from "../Components/ExpenceProgressCard";
import { getAllExpenses } from "../Services/TransactionServices";
import { getAllBudgetCards } from "../Services/TransactionServices";
import { useEffect, useState } from "react";
export const BudgetPage = () => {
  const [budgetData, setBudgetData] = useState([]);
  const calculateProgress = (categories, transactions) => {
    const mergedData = categories.map((cat) => {
      const categoryTxns = transactions.filter(
        (txn) => cat.title === txn.title,
      );
      const totalSpent = categoryTxns.reduce((acc, curr) => {
        return acc + Number(curr.amount || 0);
      }, 0);
      const limit = Number(cat.limit || 0);
      let percentage = limit > 0 ? (totalSpent / limit) * 100 : 0;
      if (percentage > 100) percentage = 100;
      return {
        ...cat,
        spent: totalSpent,
        limit: limit,
        percentage: percentage,
        isOverBudget: totalSpent > limit,
      };
    });
    setBudgetData(mergedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, categoriesRes] = await Promise.all([
          getAllExpenses(),
          getAllBudgetCards(),
        ]);
        const categories = categoriesRes.data || [];
        const transactions = transactionsRes.data || [];
        calculateProgress(categories, transactions);
      } catch (error) {
        console.error("Data fetch fail ho gaya", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* 1. Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Budgets
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Keep your spending in check by setting category limits.
          </p>
        </div>
        {/* <button className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm flex justify-center items-center gap-2">
          <FiPlus className="text-lg" /> Create Budget
        </button> */}
      </header>

      {/* 2. Progress Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgetData.map((data) => (
          <ExpenceProgressCard key={data._id} data={data} />
        ))}
      </section>
    </div>
  );
};
