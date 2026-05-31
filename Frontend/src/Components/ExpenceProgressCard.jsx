export const ExpenceProgressCard = ({ data }) => {
  return (
    <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      {/* Header: Icon, Name & Amount */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl shadow-sm">
            {data.icon}
          </div>
          <h3 className="font-bold text-gray-800">{data.title}</h3>
        </div>
        <div className="text-right flex flex-col">
          <span className={`text-sm font-bold ${data.isOverBudget ? 'text-red-500' : 'text-gray-900'}`}>
            ₹{data.spent.toLocaleString("en-IN")}
          </span>
          <span className="text-xs font-medium text-gray-400">
            of ₹{data.limit.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        {/* Progress Bar Fill */}
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            data.isOverBudget ? "bg-red-500" : "bg-emerald-500"
          }`}
          style={{ width: `${data.percentage}%` }}
        ></div>
      </div>
      
      {/* Bottom Status Text */}
      {data.isOverBudget ? (
        <p className="text-xs text-red-500 mt-3 font-semibold flex items-center gap-1">
          ⚠️ Over budget by ₹{(data.spent - data.limit).toLocaleString("en-IN")}
        </p>
      ) : (
        <p className="text-xs text-gray-500 mt-3 font-medium">
          ₹{(data.limit - data.spent).toLocaleString("en-IN")} remaining
        </p>
      )}
    </div>
  );
};
