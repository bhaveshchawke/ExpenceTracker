import { useState, useEffect } from "react";
import { FiX, FiCalendar, FiFileText, FiTag } from "react-icons/fi";
import { addExpence, editTransaction, getAllBudgetCard } from "../Services/TransactionServices";
import { UseMessage } from "../Hooks/UseMessage";

export const AddExpence = ({ category, onClose, onCloseCat, editingTransaction, onSuccess }) => {
  const [amount, setAmount] = useState(editingTransaction ? editingTransaction.amount : "");
  const [date, setDate] = useState(editingTransaction ? new Date(editingTransaction.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState(editingTransaction ? editingTransaction.note : "");

  // Naya state dropdown ke liye
  const [selectedCategoryId, setSelectedCategoryId] = useState(editingTransaction && editingTransaction.category ? editingTransaction.category._id : "");
  const [categoriesList, setCategoriesList] = useState([]);

  const { showMessage } = UseMessage();

  // Agar 'category' prop nahi aata (Transaction Page se), toh hum saari categories DB se mangwayenge
  useEffect(() => {
    if (!category) {
      const fetchCategories = async () => {
        try {
          const response = await getAllBudgetCard();
          const list = response.data || [];
          setCategoriesList(list);
          if (list.length > 0 && !selectedCategoryId) {
            setSelectedCategoryId(list[0]._id); // Default pehli category set kar do
          }
        } catch (error) {
          console.error("Failed to load categories:", error);
        }
      };
      fetchCategories();
    }
  }, [category]);

  const transData = {
    amount: amount,
    date: date,
    note: note,
    categoryId: category ? category._id : selectedCategoryId,
  };

  const handleData = async () => {
    try {
      let expense;
      if (editingTransaction) {
        expense = await editTransaction({ ...transData, _id: editingTransaction._id });
        showMessage(expense.message || "Expense updated!", "success");
      } else {
        expense = await addExpence(transData);
        showMessage(expense.message || "Expense added!", "success");
      }
      if (onSuccess) onSuccess();
      if (onClose) onClose();
      if (onCloseCat) onCloseCat();
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md mx-auto bg-white border border-gray-100 rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Decorative Header */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-400 to-teal-500"></div>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {editingTransaction ? "Edit Expense" : "Add Expense"}
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                {category ? (
                  <span className="bg-gray-100 text-gray-600 text-sm font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    <span>{category.icon}</span>
                    {category.title}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500 font-medium">
                    Select a category below
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                if (onClose) onClose();
                if (onCloseCat) onCloseCat();
              }}
              className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-xl transition-colors cursor-pointer"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Category Dropdown (Sirf tab dikhega jab category prop nahi hoga) */}
            {!category && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Category
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiTag className="text-gray-400 text-lg" />
                  </div>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                  >
                    {categoriesList.length === 0 && (
                      <option>Loading categories...</option>
                    )}
                    {categoriesList.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Amount Spent
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-bold text-lg">₹</span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-gray-400 placeholder:font-normal"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400 text-lg" />
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Note */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Note / Description
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-4 pointer-events-none">
                  <FiFileText className="text-gray-400 text-lg" />
                </div>
                <textarea
                  rows="2"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What was this for?"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <button
              onClick={handleData}
              className="w-full py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-bold shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              {editingTransaction ? "Update Expense" : "Save Expense"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
