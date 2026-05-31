export const ExpenseCard = ({ text, money }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-shadow duration-200">
      {/* Title (उदा: Total Balance) */}
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {text}
      </h3>

      {/* Amount (उदा: ₹25,000) */}
      <div className="text-2xl font-bold text-gray-900 mt-1">₹{money}</div>
    </div>
  );
};
