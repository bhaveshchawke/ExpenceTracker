import {
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiArrowDownRight,
  FiArrowUpRight,
  FiTrash2,
  FiEdit2,
} from "react-icons/fi";
import { getTransactions, deleteTransaction } from "../Services/TransactionServices";
import { useEffect, useState } from "react";
import { UseMessage } from "../Hooks/UseMessage";
import { AddExpence } from "../Components/AddExpence";

export const TransactionPage = () => {
  const { showMessage } = UseMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getData = async () => {
    try {
      const response = await getTransactions();
      setTransactions(response.data || []);
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const response = await deleteTransaction(id);
        showMessage(response.message || "Transaction deleted", "success");
        // refresh data
        const updatedData = await getTransactions();
        setTransactions(updatedData.data || []);
      } catch (error) {
        showMessage(error.message || "Failed to delete", "error");
      }
    }
  };
  const processedTransactions = transactions
    .filter((txn) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        (txn.note && txn.note.toLowerCase().includes(term)) ||
        (txn.category?.title && txn.category.title.toLowerCase().includes(term))
      );
    })
    .sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.date) - new Date(a.date);
      if (sortOrder === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortOrder === "highest") return Number(b.amount) - Number(a.amount);
      if (sortOrder === "lowest") return Number(a.amount) - Number(b.amount);
      return 0;
    });

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
        <button
          onClick={() => {
            setEditingTransaction(null);
            setIsOpen(true);
          }}
          className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm flex justify-center items-center gap-2"
        >
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex w-full md:w-auto items-center gap-3 relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <FiFilter className="text-lg" />
          </button>
          
          {isFilterOpen && (
            <div className="absolute right-0 top-12 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
              <div className="p-2">
                <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Sort By</p>
                <button
                  onClick={() => { setSortOrder("newest"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors ${sortOrder === "newest" ? "text-indigo-600 font-medium" : "text-gray-700"}`}
                >
                  Newest First
                </button>
                <button
                  onClick={() => { setSortOrder("oldest"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors ${sortOrder === "oldest" ? "text-indigo-600 font-medium" : "text-gray-700"}`}
                >
                  Oldest First
                </button>
                <button
                  onClick={() => { setSortOrder("highest"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors ${sortOrder === "highest" ? "text-indigo-600 font-medium" : "text-gray-700"}`}
                >
                  Highest Amount
                </button>
                <button
                  onClick={() => { setSortOrder("lowest"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors ${sortOrder === "lowest" ? "text-indigo-600 font-medium" : "text-gray-700"}`}
                >
                  Lowest Amount
                </button>
              </div>
            </div>
          )}
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
          {processedTransactions?.map((txn) => (
            <div
              key={txn._id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50/50 transition-colors"
            >
              {/* Title & Date & Icon */}
              <div className="col-span-5 flex items-center gap-4">
                <div className="p-2.5 rounded-full bg-rose-100 text-rose-600">
                  <FiArrowDownRight className="text-lg" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {txn.note || "Expense"}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(txn.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Category Badge */}
              <div className="col-span-3 hidden sm:block">
                <span className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md flex items-center gap-1.5 w-fit">
                  {txn.category?.icon} {txn.category?.title || "Unknown"}
                </span>
              </div>

              {/* Amount */}
              <div className="col-span-2 text-right">
                <span className="text-sm font-bold text-gray-900">
                  -₹{Number(txn.amount || 0).toLocaleString("en-IN")}
                </span>
              </div>

              {/* Action Menu */}
              <div className="col-span-2 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setEditingTransaction(txn);
                    setIsOpen(true);
                  }}
                  className="p-1.5 text-indigo-400 rounded-md hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  title="Edit Transaction"
                >
                  <FiEdit2 className="text-lg" />
                </button>
                <button
                  onClick={() => handleDelete(txn._id)}
                  className="p-1.5 text-rose-400 rounded-md hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Transaction"
                >
                  <FiTrash2 className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <span className="text-xs text-gray-500">
            Showing {processedTransactions.length > 0 ? 1 : 0} to {processedTransactions.length} of {processedTransactions.length} entries
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
      {isOpen && (
        <AddExpence
          onClose={() => {
            setIsOpen(false);
            setEditingTransaction(null);
          }}
          editingTransaction={editingTransaction}
          onSuccess={getData}
        />
      )}
    </div>
  );
};
