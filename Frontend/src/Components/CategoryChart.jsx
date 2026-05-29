import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// डमी डेटा
const data = [
  { name: "Food & Dining", value: 4000 },
  { name: "Transportation", value: 3000 },
  { name: "Shopping", value: 3000 },
  { name: "Entertainment", value: 2000 },
  { name: "Bills & Utils", value: 2780 },
];

// चार्ट के स्लाइस के लिए कलर्स
const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export const CategoryChart = () => {
  return (
    <div className="w-full h-80 bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 mb-2">
        Expenses by Category
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={65} // बीच से खाली रखने के लिए (Doughnut Shape)
            outerRadius={85}
            paddingAngle={5} // स्लाइस के बीच का गैप
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />

          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: "12px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
