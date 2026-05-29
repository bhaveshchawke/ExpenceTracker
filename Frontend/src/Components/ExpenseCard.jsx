export const ExpenseCard = ({ text, money }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Title (उदा: Total Balance) */}
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
        {text}
      </h3>

      {/* Amount (उदा: ₹25,000) */}
      <div className="text-3xl font-bold text-gray-900 mt-2">₹{money}</div>
    </div>
  );
};
