import {
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiArrowDownRight,
  FiArrowUpRight,
} from "react-icons/fi";

export const TransactionPage = () => {
  // डमी डेटा (बैकएंड से ऐसा ही डेटा आएगा)
  const transactionsData = [
    {
      id: 1,
      title: "Zomato Food Order",
      category: "Food & Dining",
      date: "20 May 2026",
      amount: 450,
      type: "expense",
    },
    {
      id: 2,
      title: "Freelance Client (Web Dev)",
      category: "Salary",
      date: "18 May 2026",
      amount: 15000,
      type: "income",
    },
    {
      id: 3,
      title: "Uber Ride to Office",
      category: "Transportation",
      date: "17 May 2026",
      amount: 250,
      type: "expense",
    },
    {
      id: 4,
      title: "Amazon AWS Bill",
      category: "Bills",
      date: "15 May 2026",
      amount: 1200,
      type: "expense",
    },
    {
      id: 5,
      title: "Sold Old Monitor",
      category: "Misc Income",
      date: "10 May 2026",
      amount: 3500,
      type: "income",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* 1. Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Transactions
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage all your income and expenses.
          </p>
        </div>
        <button className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm flex justify-center items-center gap-2">
          <span>+</span> Add New
        </button>
      </header>

      {/* 2. Search & Filters Bar (सफेद डिब्बा) */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex w-full md:w-auto items-center gap-3">
          <select className="flex-1 md:w-auto px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-500">
            <option>All Types</option>
            <option>Income</option>
            <option>Expense</option>
          </select>
          <select className="flex-1 md:w-auto px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-500">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
          </select>
          <button className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
            <FiFilter className="text-lg" />
          </button>
        </div>
      </section>

      {/* 3. The Ledger List (Transactions Table/List) */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* List Header (सिर्फ बड़ी स्क्रीन पर दिखेगा) */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="col-span-5">Transaction Name</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-2 text-right">Amount</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-gray-100">
          {transactionsData.map((txn) => (
            <div
              key={txn.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50/50 transition-colors"
            >
              {/* Title & Date & Icon */}
              <div className="col-span-5 flex items-center gap-4">
                <div
                  className={`p-2.5 rounded-full ${txn.type === "income" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}
                >
                  {txn.type === "income" ? (
                    <FiArrowUpRight className="text-lg" />
                  ) : (
                    <FiArrowDownRight className="text-lg" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {txn.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{txn.date}</p>
                </div>
              </div>

              {/* Category Badge */}
              <div className="col-span-3 hidden sm:block">
                <span className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md">
                  {txn.category}
                </span>
              </div>

              {/* Amount */}
              <div className="col-span-2 text-right">
                <span
                  className={`text-sm font-bold ${txn.type === "income" ? "text-emerald-600" : "text-gray-900"}`}
                >
                  {txn.type === "income" ? "+" : "-"}₹
                  {txn.amount.toLocaleString()}
                </span>
              </div>

              {/* Action Menu (3 dots) */}
              <div className="col-span-2 flex justify-end">
                <button className="p-1.5 text-gray-400 rounded-md hover:text-gray-900 hover:bg-gray-200 transition-colors">
                  <FiMoreVertical className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <span className="text-xs text-gray-500">
            Showing 1 to 5 of 5 entries
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded hover:bg-gray-50 cursor-not-allowed opacity-50">
              Prev
            </button>
            <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
