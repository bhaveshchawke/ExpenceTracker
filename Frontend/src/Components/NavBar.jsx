import { useState } from "react";
import { FaCircleUser, FaRegMoon } from "react-icons/fa6";
import { IoIosLogIn } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router";
import { UseAuthData } from "../Hooks/UseAuthData";
import { logoutService } from "../Services/AuthServices";
import { UseMessage } from "../Hooks/UseMessage";
export const NavBar = () => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const { isLoggedIn, user, setIsLoggedIn, setUser, loading } = UseAuthData();
  const { showMessage } = UseMessage();
  //logout function
  const handleLogout = async () => {
    try {
      const data = await logoutService();
      setIsLoggedIn(false);
      setUser(null);
      showMessage(data.message, "success");
    } catch (error) {
      showMessage(error.message, "error");
    }
  };
  return (
    <>
      {/* 
        1. TOP NAVBAR 
        यहाँ border-gray-200 और shadow-sm लगाया है ताकि यह पेज से बिल्कुल अलग दिखे 
      */}
      <nav className="sticky top-0 z-50 flex items-center justify-between w-full px-6 py-3.5 bg-white border-b border-gray-200 shadow-sm">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpenMenu(!isOpenMenu)}
            className="p-1.5 text-gray-600 transition-all rounded-md hover:bg-gray-100 focus:outline-none"
          >
            {isOpenMenu ? (
              <FiX className="text-xl" />
            ) : (
              <FiMenu className="text-xl" />
            )}
          </button>

          {/* Brand Name: Indigo Color for Premium Corporate Look */}
          <div className="text-lg font-bold tracking-tight text-gray-900 select-none">
            <NavLink to={"/"}>
              Kharcha<span className="text-indigo-600">Pani</span>
            </NavLink>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* <button className="p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-900">
            <FaRegMoon className="text-lg" />
          </button> */}

          <NavLink to="/profile">
            <button className="p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-900" title="My Profile">
              <FaCircleUser className="text-lg" />
            </button>
          </NavLink>

          {/* Solid Indigo Login Button */}
          {loading ? (
            <div className="w-24 h-10 animate-pulse bg-gray-200 rounded-md hidden md:block"></div>
          ) : isLoggedIn ? (
            // Agar login hai toh LOGOUT dikhao
            <button
              onClick={handleLogout}
              className="items-center hidden cursor-pointer gap-1.5 px-4 py-2 text-sm font-medium text-white transition-all bg-red-600 rounded-md md:flex hover:bg-red-700 shadow-sm"
            >
              <IoIosLogIn className="text-lg" /> <span>Logout</span>
            </button>
          ) : (
            // Agar login nahi hai toh LOGIN dikhao
            <NavLink to={"/login"}>
              <button className="items-center hidden cursor-pointer gap-1.5 px-4 py-2 text-sm font-medium text-white transition-all bg-indigo-600 rounded-md md:flex hover:bg-indigo-700 shadow-sm">
                <IoIosLogIn className="text-lg" /> <span>Login</span>
              </button>
            </NavLink>
          )}
          {/* Mobile Login / Logout */}
          {loading ? (
            <div className="w-10 h-10 animate-pulse bg-gray-200 rounded-full md:hidden"></div>
          ) : isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="p-2 text-red-600 transition-colors rounded-full md:hidden hover:bg-red-50"
            >
              <IoIosLogIn className="text-xl" />
            </button>
          ) : (
            <NavLink to={"/login"}>
              <button className="p-2 text-indigo-600 transition-colors rounded-full md:hidden hover:bg-indigo-50">
                <IoIosLogIn className="text-xl" />
              </button>
            </NavLink>
          )}
        </div>
      </nav>

      {/* 2. OVERLAY */}
      {isOpenMenu && (
        <div
          onClick={() => setOpenMenu(false)}
          className="fixed inset-0 z-30 transition-opacity bg-slate-900/20 backdrop-blur-sm"
        ></div>
      )}

      {/* 3. SIDEBAR SECTION (White Background with distinct Right Border) */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 ease-in-out flex flex-col pt-20 ${
          isOpenMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col px-3 space-y-1 mt-4">
          <SidebarItem text="Dashboard" path={"/"} />
          <SidebarItem text="Transactions" path={"/transactions"} />
          <SidebarItem text="Budgets" path={"/budgets"} />
          <SidebarItem text="Reports & Analytics" path={"/reports"} />
          {user?.isAdmin && (
            <>
              <div className="my-2 border-t border-gray-100"></div>
              <SidebarItem text="Admin Dashboard" path={"/admin-dashboard"} />
            </>
          )}
        </div>

        <div className="mt-auto p-4 border-t border-gray-200 text-xs text-center text-gray-500 font-medium">
          Made by <span className="text-indigo-600 font-semibold">Bhavesh</span>
        </div>
      </aside>
    </>
  );
};

// Sidebar Item - Active state highlighted with soft Indigo
const SidebarItem = ({ text, path }) => (
  <NavLink
    to={path}
    // यहाँ NavLink हमें खुद बताता है कि यह लिंक एक्टिव है या नहीं
    className={({ isActive }) =>
      `block px-4 py-2.5 text-sm font-medium transition-all rounded-md ${
        isActive
          ? "bg-indigo-50 text-indigo-700" // अगर एक्टिव है तो नीला
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // अगर नहीं है तो ग्रे
      }`
    }
  >
    {text}
  </NavLink>
);
