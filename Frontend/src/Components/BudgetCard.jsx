import { FiEdit2, FiTrash2 } from "react-icons/fi";

export const BudgetCard = ({
  name,
  icon,
  placeholder,
  onAddExpense,
  onClick,
  onDelete,
}) => {
  const bgColors = [
    "from-pink-500 to-rose-500",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-violet-500 to-purple-500",
    "from-orange-500 to-amber-500",
    "from-indigo-500 to-blue-500",
  ];
  const colorIndex = name ? name.charCodeAt(0) % bgColors.length : 0;
  const gradient = bgColors[colorIndex];

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[160px]">
      {/* Colorful Top Accent */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`}></div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        {/* Card Header (Icon & Name) */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* Icon Box (Colored) */}
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-2xl shadow-sm text-2xl text-white bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300`}
            >
              {icon}
            </div>
            {/* Text Area */}
            <div>
              <h3 className="text-gray-900 font-bold text-lg tracking-tight">
                {name}
              </h3>
              <p className="text-sm font-medium text-gray-500 mt-0.5">
                Limit:{" "}
                <span className="text-gray-800 font-bold">₹{placeholder}</span>
              </p>
            </div>
          </div>
          {/* Action Icons (Edit & Delete) */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={onClick}
              className="group/btn flex items-center justify-center w-8 h-8 text-gray-400 bg-white border border-gray-200 rounded-full shadow-sm hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow transition-all duration-300 cursor-pointer"
              title="Edit Category"
            >
              <FiEdit2 className="text-sm group-hover/btn:scale-110 transition-transform duration-300" />
            </button>
            <button
              onClick={onDelete}
              className="group/btn flex items-center justify-center w-8 h-8 text-gray-400 bg-white border border-gray-200 rounded-full shadow-sm hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 hover:shadow transition-all duration-300 cursor-pointer"
              title="Delete Category"
            >
              <FiTrash2 className="text-sm group-hover/btn:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Action Area */}
        <div className="relative z-10 mt-6 pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onAddExpense}
            className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-bold transition-colors duration-300"
          >
            <FiEdit2 className="text-base" />
            Add expense
          </button>
        </div>
      </div>
    </div>
  );
};
