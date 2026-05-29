import { ExpenseCard } from "../Components/ExpenseCard";
import { CategoryChart } from "../Components/CategoryChart";
import { IncomeExpenseChart } from "../Components/IncomeExpenseChart";
import { NavLink } from "react-router";
import { UseAuthData } from "../Hooks/UseAuthData";
//services
export const DashBoard = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser, loading } = UseAuthData();
  const expenseData = [
    {
      title: "Total Balance",
      money: 25000,
      colorType: "neutral",
    },
    {
      title: "Monthly Income",
      money: 40000,
      colorType: "income",
    },
    {
      title: "Monthly Expense",
      money: 15000,
      colorType: "expense",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* --- NEW HERO SECTION --- */}
      {/* एक प्रीमियम ग्रैडिएंट बैकग्राउंड, गोल किनारे (rounded-2xl) और ओवरफ्लो हिडन ताकि अंदर की डिज़ाइन बाहर न निकले */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-6 sm:p-10 shadow-lg text-white flex flex-col sm:flex-row items-start sm:items-center justify-between">
        {/* Decorative Background Glows (ये पीछे हलकी सी चमक देंगे) */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 -mb-12 w-32 h-32 rounded-full bg-indigo-400 opacity-20 blur-2xl"></div>

        {/* Text Content */}
        <div className="relative z-10">
          {isLoggedIn ? (
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              Welcome back {user?.userName || "user"}
            </h1>
          ) : (
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              Welcome user
            </h1>
          )}
          <p className="text-indigo-100 text-sm sm:text-base max-w-lg">
            You're doing great! You have spent 37% of your monthly budget. Keep
            tracking to stay on top of your financial goals.
          </p>
        </div>

        {/* Action Button (अब बटन वाइट कलर का है ताकि इंडिगो बैकग्राउंड पर अलग से चमके) */}
        <div className="mt-6 sm:mt-0 relative z-10 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-indigo-600 transition-transform transform bg-white rounded-xl hover:bg-gray-50 hover:scale-105 shadow-md flex items-center justify-center gap-2">
            <NavLink to={"/addtransactions"}>
              {" "}
              <span className="text-lg leading-none">+</span> Add Transaction
            </NavLink>
          </button>
        </div>
      </section>

      {/* SECTION 1: Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {expenseData.map((data, index) => {
          return (
            <ExpenseCard
              key={index}
              text={data.title}
              money={data.money}
              colorType={data.colorType}
            />
          );
        })}
      </section>

      {/* SECTION 2: Analytics / Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart />
        <IncomeExpenseChart />
      </section>

      {/* SECTION 3: Recent Transactions */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 min-h-[300px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            Recent Transactions
          </h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            View All &rarr;
          </button>
        </div>

        <div className="flex items-center justify-center h-48 border-2 border-dashed border-gray-100 rounded-lg text-gray-400">
          <p className="text-sm font-medium">
            [ Transactions List Will Appear Here ]
          </p>
        </div>
      </section>
    </div>
  );
};
