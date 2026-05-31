import {
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiPieChart,
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { getAllBudgetCard, getAllExpenses } from "../Services/TransactionServices";

export const ReportsPage = () => {
  const [summary, setSummary] = useState({
    totalBudget: 0,
    totalExpense: 0,
    netSaving: 0,
    savingsRate: 0,
    topCategories: [],
    trendData: [], // Graph ke liye naya state
  });

  const calculateMegaData = (expenses, budgets) => {
    // 1. Total Budget
    const totalBudget = budgets.reduce((acc, curr) => {
      return acc + Number(curr.limit || 0);
    }, 0);

    // 2. Total Expense
    const totalExpense = expenses.reduce((acc, curr) => {
      return acc + Number(curr.amount || 0);
    }, 0);

    // 3. Net Saving
    const netSaving = totalBudget - totalExpense;

    // 4. Savings Rate (%)
    const savingsRate = totalBudget > 0 ? ((netSaving / totalBudget) * 100).toFixed(1) : 0;

    // 5. Top Spending Categories logic
    const categoryTotals = {};
    expenses.forEach((ex) => {
      const catName = ex.title || "Other"; 
      categoryTotals[catName] = (categoryTotals[catName] || 0) + Number(ex.amount || 0);
    });

    const topCategories = Object.keys(categoryTotals)
      .map((name) => ({
        name,
        amount: categoryTotals[name],
        percentage: totalExpense > 0 ? (categoryTotals[name] / totalExpense) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3); 

    // 6. Trend Data for Graph (Pichle 6 mahine ka data)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentDate = new Date();
    const generatedTrendData = [];

    // Loop chalayenge pichle 6 mahino ke liye (5 se 0 tak)
    for (let i = 5; i >= 0; i--) {
      // Date object banayenge har mahine ke liye
      const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const targetMonth = targetDate.getMonth();
      const targetYear = targetDate.getFullYear();

      // Is mahine ke saare kharche filter karein
      const monthExpenses = expenses.filter((ex) => {
        // Yaad rahe database mein date "date" field mein hai
        const exDate = new Date(ex.date || ex.createdAt || Date.now()); 
        return exDate.getMonth() === targetMonth && exDate.getFullYear() === targetYear;
      });

      // Is mahine ka total kharcha jodein
      const monthExpenseTotal = monthExpenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

      generatedTrendData.push({
        month: monthNames[targetMonth],
        budget: totalBudget, // Monthly budget ko fix rakha hai reference ke liye
        expense: monthExpenseTotal
      });
    }

    return { 
      totalBudget, 
      totalExpense, 
      netSaving, 
      savingsRate, 
      topCategories, 
      trendData: generatedTrendData 
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allExpenses, allBudgets] = await Promise.all([
          getAllExpenses(),
          getAllBudgetCard(),
        ]);
        const expenses = allExpenses.data || [];
        const budgets = allBudgets.data || [];
        
        const newSummary = calculateMegaData(expenses, budgets);
        setSummary(newSummary);
      } catch (error) {
        console.error("Data fetch failed:", error);
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
            Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Deep dive into your financial habits and trends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg flex items-center gap-2 shadow-sm">
            <FiCalendar className="text-gray-400" />
            Last 6 Months
          </div>
        </div>
      </header>

      {/* 2. KPI Summary Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Budget"
          amount={`₹${summary.totalBudget.toLocaleString("en-IN")}`}
          icon={<FiTrendingUp />}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
        <StatCard
          title="Total Expense"
          amount={`₹${summary.totalExpense.toLocaleString("en-IN")}`}
          icon={<FiTrendingDown />}
          color="text-rose-600"
          bg="bg-rose-50"
        />
        <StatCard
          title="Net Savings"
          amount={`₹${summary.netSaving.toLocaleString("en-IN")}`}
          icon={<FiPieChart />}
          color={summary.netSaving >= 0 ? "text-indigo-600" : "text-red-600"}
          bg={summary.netSaving >= 0 ? "bg-indigo-50" : "bg-red-50"}
        />

        {/* Savings Rate */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-gray-500 mb-1">Savings Rate</p>
          <div className="flex items-end gap-2">
            <h3 className="text-xl font-semibold text-gray-900">{summary.savingsRate}%</h3>
            <span className={`text-sm font-medium mb-0.5 ${summary.netSaving >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {summary.netSaving >= 0 ? "Good" : "Warning"}
            </span>
          </div>
        </div>
      </section>

      {/* 3. Advanced Trend Chart */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Budget vs Expense Trend
        </h2>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={summary.trendData}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
              />

              <Area type="monotone" dataKey="budget" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorBudget)" />
              <Area type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4. Top Spending Categories */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Top Spending Categories
        </h2>

        <div className="space-y-5">
          {summary.topCategories.length > 0 ? (
            summary.topCategories.map((cat, index) => (
              <TopSpendCategory
                key={index}
                name={cat.name}
                amount={cat.amount}
                percentage={cat.percentage}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No expenses recorded yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ title, amount, icon, color, bg }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <div className={`p-1.5 rounded-md ${bg} ${color}`}>{icon}</div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
    </div>
    <h3 className="text-xl font-semibold text-gray-900">{amount}</h3>
  </div>
);

const TopSpendCategory = ({ name, amount, percentage }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium text-gray-700">{name}</span>
      <span className="font-semibold text-gray-900">
        ₹{amount.toLocaleString("en-IN")}
      </span>
    </div>
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);
