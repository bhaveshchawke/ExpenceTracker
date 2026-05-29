import { FiPlus } from "react-icons/fi";

export const BudgetPage = () => {
  // डमी बजट डेटा (बैकएंड से आएगा)
  const budgetsData = [
    { id: 1, category: "Food & Dining", icon: "🍔", spent: 3800, limit: 5000 },
    { id: 2, category: "Transportation", icon: "🚕", spent: 2800, limit: 3000 },
    { id: 3, category: "Shopping", icon: "🛍️", spent: 6500, limit: 5000 }, // Over budget (लिमिट पार)
    { id: 4, category: "Entertainment", icon: "🎬", spent: 500, limit: 2000 },
  ];

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
        <button className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm flex justify-center items-center gap-2">
          <FiPlus className="text-lg" /> Create Budget
        </button>
      </header>

      {/* 2. Budgets Grid (कार्ड्स का लेआउट) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgetsData.map((budget) => {
          // प्रोग्रेस का प्रतिशत (Percentage) निकालना
          const percentage = Math.min((budget.spent / budget.limit) * 100, 100);

          // लॉजिक: रंग तय करना
          let progressColor = "bg-indigo-500"; // नॉर्मल
          if (percentage >= 100)
            progressColor = "bg-rose-500"; // लिमिट पार (Red)
          else if (percentage >= 80) progressColor = "bg-amber-500"; // 80% पार (Yellow/Warning)

          return (
            <div
              key={budget.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Card Header: Icon & Category */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-full text-xl">
                    {budget.icon}
                  </div>
                  <h2 className="text-base font-semibold text-gray-900">
                    {budget.category}
                  </h2>
                </div>
              </div>

              {/* Amount Info */}
              <div className="mb-2 flex justify-between items-end">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{budget.spent}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    / ₹{budget.limit}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {percentage.toFixed(0)}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                {/* Actual Progress Line */}
                <div
                  className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                  style={{ width: `${percentage}%` }} // ये लाइन चौड़ाई तय करती है
                ></div>
              </div>

              {/* Status Message (बचे हुए पैसे का अलर्ट) */}
              <div>
                {budget.spent > budget.limit ? (
                  <p className="text-xs font-medium text-rose-600">
                    Over budget by ₹{budget.spent - budget.limit}
                  </p>
                ) : (
                  <p className="text-xs font-medium text-gray-500">
                    ₹{budget.limit - budget.spent} left this month
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
