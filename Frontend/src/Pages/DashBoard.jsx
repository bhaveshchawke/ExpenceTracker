import { ExpenseCard } from "../Components/ExpenseCard";
import { CategoryChart } from "../Components/CategoryChart";
import { IncomeExpenseChart } from "../Components/IncomeExpenseChart";
import { NavLink } from "react-router";
import { UseAuthData } from "../Hooks/UseAuthData";
import { useEffect, useState } from "react";
import {
  getAllBudgetCard,
  getAllExpenses,
} from "../Services/TransactionServices";

export const DashBoard = () => {
  const { isLoggedIn, user, loading } = UseAuthData();

  const [summary, setSummary] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    categoryChartData: [],
    cashFlowData: [],
    recentTransactions: [], // Naya state add kiya
  });

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return; // Wait until auth check is done

      if (!isLoggedIn) {
        const currentDate = new Date();
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const dummyCashFlow = [];
        for (let i = 5; i >= 0; i--) {
          const targetMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i,
            1,
          ).getMonth();
          dummyCashFlow.push({
            name: monthNames[targetMonth],
            Income: 45000,
            Expense: Math.floor(Math.random() * 20000) + 15000,
          });
        }
        setSummary({
          totalBalance: 24500,
          monthlyIncome: 50000,
          monthlyExpense: 25500,
          categoryChartData: [
            { name: "Food", value: 8500 },
            { name: "Rent", value: 12000 },
            { name: "Transport", value: 2500 },
            { name: "Entertainment", value: 2500 },
          ],
          cashFlowData: dummyCashFlow,
          recentTransactions: [
            {
              amount: 450,
              note: "Coffee Shop",
              date: new Date().toISOString(),
              category: { title: "Food", icon: "☕" },
            },
            {
              amount: 1200,
              note: "Supermarket",
              date: new Date(Date.now() - 86400000).toISOString(),
              category: { title: "Groceries", icon: "🛒" },
            },
            {
              amount: 300,
              note: "Bus Ticket",
              date: new Date(Date.now() - 172800000).toISOString(),
              category: { title: "Transport", icon: "🚌" },
            },
          ],
        });
        return;
      }

      try {
        const [allExpenses, allBudgets] = await Promise.all([
          getAllExpenses(),
          getAllBudgetCard(),
        ]);
        const expenses = allExpenses.data || [];
        const budgets = allBudgets.data || [];

        // 1. Total Calculations
        const monthlyIncome = budgets.reduce(
          (acc, curr) => acc + Number(curr.limit || 0),
          0,
        );
        const monthlyExpense = expenses.reduce(
          (acc, curr) => acc + Number(curr.amount || 0),
          0,
        );
        const totalBalance = monthlyIncome - monthlyExpense;

        // 2. Category Chart Data (Pie Chart)
        const categoryTotals = {};
        expenses.forEach((ex) => {
          const catName = ex.category?.title || "Other";
          categoryTotals[catName] =
            (categoryTotals[catName] || 0) + Number(ex.amount || 0);
        });
        const categoryChartData = Object.keys(categoryTotals).map((name) => ({
          name,
          value: categoryTotals[name],
        }));

        // 3. Cash Flow Data (Bar Chart)
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const currentDate = new Date();
        const cashFlowData = [];
        for (let i = 5; i >= 0; i--) {
          const targetDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i,
            1,
          );
          const targetMonth = targetDate.getMonth();
          const targetYear = targetDate.getFullYear();

          const monthExpenses = expenses.filter((ex) => {
            const exDate = new Date(ex.date || ex.createdAt || Date.now());
            return (
              exDate.getMonth() === targetMonth &&
              exDate.getFullYear() === targetYear
            );
          });
          const monthExpenseTotal = monthExpenses.reduce(
            (acc, curr) => acc + Number(curr.amount || 0),
            0,
          );

          cashFlowData.push({
            name: monthNames[targetMonth],
            Income: monthlyIncome, // We are treating the total budget as standard income here
            Expense: monthExpenseTotal,
          });
        }

        // 4. Recent Transactions (Date ke hisaab se sort karke top 4 nikalna)
        const sortedExpenses = [...expenses].sort((a, b) => {
          const dateA = new Date(a.date || a.createdAt || Date.now());
          const dateB = new Date(b.date || b.createdAt || Date.now());
          return dateB - dateA; // Descending order (Sabse naya pehle)
        });
        const recentTransactions = sortedExpenses.slice(0, 4);

        setSummary({
          totalBalance,
          monthlyIncome,
          monthlyExpense,
          categoryChartData,
          cashFlowData,
          recentTransactions,
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };
    fetchData();
  }, [isLoggedIn, loading]);

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const expenseData = [
    {
      title: "Total Balance",
      money: summary.totalBalance,
      colorType: "neutral",
    },
    {
      title: "Monthly Budget", // Changed from Income to Budget since it's limits
      money: summary.monthlyIncome,
      colorType: "income",
    },
    {
      title: "Monthly Expense",
      money: summary.monthlyExpense,
      colorType: "expense",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* --- HERO SECTION --- */}
      <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight mb-1">
            Welcome, {isLoggedIn && user?.userName ? user.userName : "User"}
          </h1>
          <p className="text-gray-500 text-sm max-w-lg">
            You've spent{" "}
            <span className="font-medium text-gray-700">
              {summary.monthlyIncome > 0
                ? (
                    (summary.monthlyExpense / summary.monthlyIncome) *
                    100
                  ).toFixed(0)
                : 0}
              %
            </span>{" "}
            of your monthly budget.
          </p>
        </div>

        <div className="mt-4 sm:mt-0 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm flex items-center justify-center gap-2">
            <NavLink to={"/setbudget"} className="flex items-center gap-1">
              <span>+</span> Manage Categories
            </NavLink>
          </button>
        </div>
      </section>

      {/* SECTION 1: Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {expenseData.map((data, index) => {
          return (
            <ExpenseCard
              key={index}
              text={data.title}
              money={data.money}
              colorType={data.colorType}
            />
          );
        })}
      </section>

      {/* SECTION 2: Analytics / Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart data={summary.categoryChartData} />
        <IncomeExpenseChart data={summary.cashFlowData} />
      </section>

      {/* SECTION 3: Recent Transactions */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-900">
            Recent Transactions
          </h2>
          <NavLink
            to="/transactions"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            View All &rarr;
          </NavLink>
        </div>

        {summary.recentTransactions.length > 0 ? (
          <div className="space-y-4">
            {summary.recentTransactions.map((txn, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Icon Circle */}
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-sm shadow-sm border border-gray-200">
                    {txn.category?.icon ||
                      (txn.category?.title
                        ? txn.category.title.charAt(0)
                        : "O")}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {txn.note || txn.category?.title || "Expense"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {new Date(txn.date || txn.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  -₹{Number(txn.amount).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 border-2 border-dashed border-gray-100 rounded-lg text-gray-400">
            <p className="text-sm font-medium">No recent transactions found.</p>
          </div>
        )}
      </section>
    </div>
  );
};
