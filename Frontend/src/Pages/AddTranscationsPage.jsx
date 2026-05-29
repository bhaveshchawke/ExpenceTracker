import { useState } from "react";
import { 
  FiArrowUpRight, 
  FiArrowDownRight, 
  FiCalendar, 
  FiTag, 
  FiFileText, 
  FiSave
} from "react-icons/fi";

export const AddTranscationsPage = () => {
  const [type, setType] = useState("expense");

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 mt-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Add New Transaction
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Record your income or expense to keep your finances updated.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* 1. Transaction Type Toggle */}
          <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-200">
            <button
              onClick={() => setType("expense")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                type === "expense"
                  ? "bg-white text-rose-600 shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <FiArrowDownRight className={type === "expense" ? "text-rose-500 text-lg" : "text-lg"} />
              Expense
            </button>
            <button
              onClick={() => setType("income")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                type === "income"
                  ? "bg-white text-emerald-600 shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <FiArrowUpRight className={type === "income" ? "text-emerald-500 text-lg" : "text-lg"} />
              Income
            </button>
          </div>

          {/* 2. Amount Input (Prominent) */}
          <div className="flex flex-col items-center justify-center py-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Amount</p>
            <div className="relative flex items-center justify-center w-full max-w-xs">
              <span className={`absolute left-4 text-3xl font-light ${type === "expense" ? "text-rose-400" : "text-emerald-400"}`}>
                ₹
              </span>
              <input
                type="number"
                placeholder="0.00"
                className={`w-full bg-transparent text-center text-5xl font-bold placeholder:text-gray-200 focus:outline-none focus:ring-0 transition-colors ${
                  type === "expense" ? "text-rose-600" : "text-emerald-600"
                }`}
                style={{ paddingLeft: "3rem", paddingRight: "1rem" }}
              />
            </div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-4"></div>
          </div>

          {/* 3. Details Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Title / Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FiFileText className="text-gray-400" />
                Title
              </label>
              <input
                type="text"
                placeholder="What was this for? (e.g. Zomato lunch)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FiTag className="text-gray-400" />
                Category
              </label>
              <div className="relative">
                <select 
                  className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>Select Category</option>
                  {type === "expense" ? (
                    <>
                      <option>Food & Dining</option>
                      <option>Transportation</option>
                      <option>Shopping</option>
                      <option>Bills & Utilities</option>
                    </>
                  ) : (
                    <>
                      <option>Salary</option>
                      <option>Freelance</option>
                      <option>Investments</option>
                      <option>Other Income</option>
                    </>
                  )}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FiCalendar className="text-gray-400" />
                Date
              </label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              />
            </div>
            
          </div>
        </div>

        {/* Footer / Submit Button */}
        <div className="bg-gray-50 border-t border-gray-200 p-6 sm:px-8">
          <button className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors">
            <FiSave className="text-lg" />
            Save Transaction
          </button>
        </div>
      </div>
    </div>
  );
};
