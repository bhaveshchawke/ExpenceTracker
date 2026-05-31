import { FiPieChart, FiPlus } from "react-icons/fi";
import { BudgetCard } from "../Components/BudgetCard";
import { useEffect, useState } from "react";
import { CreateCatagory } from "../Components/CreateCatagory";
import { getAllBudgetCard, deleteCategory } from "../Services/TransactionServices";
import { UseMessage } from "../Hooks/UseMessage";
import { AddExpence } from "../Components/AddExpence";
export const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const { showMessage } = UseMessage();

  const getData = async () => {
    try {
      const response = await getAllBudgetCard();
      setCategories(response.data || []);
      const totalAllocate = response.data.reduce((acc, curr) => {
        return acc + Number(curr.limit);
      }, 0);
      setTotalAmount(totalAllocate);
    } catch (error) {
      showMessage(error.message || "Failed to fetch categories", "error");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category? All related expenses might be affected.")) {
      try {
        const response = await deleteCategory(id);
        showMessage(response.message || "Category deleted", "success");
        getData(); // Refresh the list
      } catch (error) {
        showMessage(error.message || "Failed to delete category", "error");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* 1. Clean Header Section */}
      <section className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <FiPieChart className="text-indigo-600" />
            Set Monthly Budgets
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-2xl">
            Plan your spending limits. Stay on top of your financial goals by
            allocating a budget to each category.
          </p>
        </div>

        {/* Total Summary */}
        <div className="flex flex-col md:items-end bg-gray-50/50 px-5 py-3 rounded-xl border border-gray-100 w-full md:w-auto">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Total Allocated
          </span>
          <span className="text-2xl font-bold text-gray-900">
            ₹{totalAmount}
          </span>
        </div>
      </section>

      {/* 2. Budget Cards Grid */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-2">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-800">Your Categories</h2>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {categories.length}
            </span>
          </div>
          <button
            onClick={() => {
              setIsOpen(true);
              setEditingCategory(null);
            }}
            className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-semibold transition-colors duration-300 shadow-sm"
          >
            <FiPlus className="text-lg" />
            Create Category
          </button>
        </div>

        {isOpen && (
          <CreateCatagory
            setIsOpen={() => setIsOpen(false)}
            editingCategory={editingCategory}
            onSuccess={getData}
          />
        )}

        {/* CSS Grid for the cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories?.map((data) => {
            return (
              <BudgetCard
                key={data._id}
                name={data.title}
                icon={data.icon}
                placeholder={data.limit}
                onAddExpense={() => setSelectedCategory(data)}
                onClick={() => {
                  setEditingCategory(data);
                  setIsOpen(true);
                }}
                onDelete={() => handleDeleteCategory(data._id)}
              />
            );
          })}
        </div>
        {selectedCategory && (
          <AddExpence
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
          />
        )}
      </section>
    </div>
  );
};
