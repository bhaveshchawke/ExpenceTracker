import {
  FiDownload,
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

export const ReportsPage = () => {
  // डमी डेटा (पिछले 6 महीनों का कैशफ्लो ट्रेंड)
  const trendData = [
    { month: "Jan", income: 35000, expense: 28000 },
    { month: "Feb", income: 38000, expense: 25000 },
    { month: "Mar", income: 42000, expense: 22000 },
    { month: "Apr", income: 39000, expense: 30000 },
    { month: "May", income: 45000, expense: 20000 },
    { month: "Jun", income: 48000, expense: 24000 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* 1. Header Section with Export Button */}
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
          {/* Date Range Selector */}
          <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 shadow-sm">
            <FiCalendar className="text-gray-400" />
            Last 6 Months
          </button>

          {/* Export Button (Premium Feature) */}
          <button className="px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm flex items-center gap-2">
            <FiDownload />
            Export Report
          </button>
        </div>
      </header>

      {/* 2. KPI Summary Cards (वित्तीय स्वास्थ्य) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Income"
          amount="₹2,47,000"
          icon={<FiTrendingUp />}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
        <StatCard
          title="Total Expense"
          amount="₹1,49,000"
          icon={<FiTrendingDown />}
          color="text-rose-600"
          bg="bg-rose-50"
        />
        <StatCard
          title="Net Savings"
          amount="₹98,000"
          icon={<FiPieChart />}
          color="text-indigo-600"
          bg="bg-indigo-50"
        />

        {/* Savings Rate (Percentage) */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-gray-500 mb-1">Savings Rate</p>
          <div className="flex items-end gap-2">
            <h3 className="text-2xl font-bold text-gray-900">39.6%</h3>
            <span className="text-sm font-medium text-emerald-600 mb-1">
              +2.4%
            </span>
          </div>
        </div>
      </section>

      {/* 3. Advanced Trend Chart (Area Chart) */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Income vs Expense Trend
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trendData}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              {/* Gradients (रंगों को फेड करने का इफ़ेक्ट) */}
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                }}
              />

              {/* Smooth Curves (type="monotone") */}
              <Area
                type="monotone"
                dataKey="income"
                stroke="#4F46E5"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorIncome)"
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#EF4444"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorExpense)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4. Top Spending Categories (Mini Bars) */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Top Spending Categories
        </h2>

        <div className="space-y-5">
          <TopSpendCategory
            name="Food & Dining"
            amount={45000}
            percentage={30}
          />
          <TopSpendCategory
            name="Housing & Rent"
            amount={30000}
            percentage={20}
          />
          <TopSpendCategory
            name="Transportation"
            amount={22500}
            percentage={15}
          />
        </div>
      </section>
    </div>
  );
};

// Reusable Mini Component for KPI Cards
const StatCard = ({ title, amount, icon, color, bg }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-md ${bg} ${color}`}>{icon}</div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{amount}</h3>
  </div>
);

// Reusable Mini Component for Top Spends
const TopSpendCategory = ({ name, amount, percentage }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium text-gray-700">{name}</span>
      <span className="font-semibold text-gray-900">
        ₹{amount.toLocaleString()}
      </span>
    </div>
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-indigo-500 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);
