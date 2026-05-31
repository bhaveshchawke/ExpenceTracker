import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const IncomeExpenseChart = ({ data = [] }) => {
  return (
    <div className="w-full h-72 bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex flex-col">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Cash Flow (Last 6 Months)
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
        >
          {/* बैकग्राउंड की हल्की लाइनें */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />

          <XAxis
            dataKey="name"
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
            cursor={{ fill: "#F3F4F6" }}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
          />

          {/* इनकम के लिए इंडिगो (Indigo) और एक्सपेंस के लिए लाल (Red) कलर */}
          <Bar
            dataKey="Income"
            fill="#4F46E5"
            radius={[4, 4, 0, 0]}
            barSize={16}
          />
          <Bar
            dataKey="Expense"
            fill="#EF4444"
            radius={[4, 4, 0, 0]}
            barSize={16}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
