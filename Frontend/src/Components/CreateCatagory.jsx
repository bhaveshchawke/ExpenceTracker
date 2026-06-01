import { useState } from "react";
import { FiPlus, FiTag } from "react-icons/fi";
import { createBudgetCard } from "../Services/TransactionServices";
import { UseMessage } from "../Hooks/UseMessage";
import { useEffect } from "react";
import { editCategry } from "../Services/TransactionServices";
export const CreateCatagory = ({ setIsOpen, editingCategory, onSuccess }) => {
  const { showMessage } = UseMessage();
  const icons = [
    "🍔",
    "🚕",
    "🛍️",
    "🎬",
    "⚡",
    "🏠",
    "💊",
    "✈️",
    "🎮",
    "📚",
    "👕",
    "☕",
  ];
    title: editingCategory ? editingCategory.title : "",
    limit: editingCategory ? editingCategory.limit : "",
    icon: editingCategory ? editingCategory.icon : "🍔",
  });
  const handleData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    if (editingCategory) {
      setData({
        title: editingCategory.title,
        limit: editingCategory.limit,
        icon: editingCategory.icon,
      });
    }
  }, [editingCategory]);
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        // Update wali API call
        const response = await editCategry({
          ...data,
          _id: editingCategory._id,
        });
        showMessage(response.message || "Category updated", "success");
      } else {
        // Purana Create wala logic
        const response = await createBudgetCard(data);
        showMessage(response.message, "success");
      }
      if (onSuccess) onSuccess();
      setIsOpen(false);
    } catch (error) {
      showMessage(error.message, "error");
    }
  };
  const handleOnClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="w-full max-w-md mx-auto bg-white border border-gray-100 rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Top Decorative Header */}
        <div className="h-3 bg-gradient-to-r from-indigo-500 to-purple-500 w-full"></div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Title Area */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {editingCategory ? "Update Category" : "Create New Category"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {editingCategory
                ? "Update your category details and limits below."
                : "Add a custom category to track your expenses better."}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Category Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FiTag className="text-indigo-500" />
                Category Name
              </label>
              <input
                name="title"
                value={data.title}
                onChange={(e) => handleData(e)}
                type="text"
                placeholder="e.g. Groceries"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Monthly Budget Limit */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span className="text-indigo-500 font-bold text-base">₹</span>
                Monthly Budget Limit
              </label>
              <input
                name="limit"
                value={data.limit}
                onChange={(e) => handleData(e)}
                type="number"
                placeholder="e.g. 5000"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Select Icon */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                Choose an Icon
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {icons.map((icon, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setData(prev => ({ ...prev, icon: icon }))}
                    className={`w-10 h-10 flex items-center justify-center text-xl rounded-xl transition-all duration-300 ${
                      data.icon === icon
                        ? "bg-indigo-100 border-2 border-indigo-500 shadow-sm scale-110"
                        : "bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:scale-105"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center gap-3">
            <button
              onClick={handleOnClose}
              className="flex-1 cursor-pointer   px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="cursor-pointer flex-1 px-4 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <FiPlus className="text-lg" />
              {editingCategory ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
