import { useEffect, useState } from "react";
import { UseAuthData } from "../Hooks/UseAuthData";
import { UseMessage } from "../Hooks/UseMessage";
import { FiUsers, FiDollarSign, FiActivity } from "react-icons/fi";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AdminDashboard = () => {
  const { user } = UseAuthData();
  const { showMessage } = UseMessage();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalExpenses: 0,
    recentUsers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admin/stats`, {
          withCredentials: true,
        });
        setStats(response.data);
      } catch (error) {
        showMessage(
          error.response?.data?.error || "Failed to load admin stats",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, [showMessage]);

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <p className="text-red-500 font-bold text-xl">Access Denied: Admins Only</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-2">Platform Overview & Statistics</p>
        </div>
        <div className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-bold text-sm tracking-wide uppercase">
          Admin Mode
        </div>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:border-indigo-300 transition-colors">
          <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <FiUsers className="text-2xl" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Total Users
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {stats.totalUsers.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:border-rose-300 transition-colors">
          <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
            <FiDollarSign className="text-2xl" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Global Expenses
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              ₹{stats.totalExpenses.toLocaleString("en-IN")}
            </h3>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:border-emerald-300 transition-colors">
          <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <FiActivity className="text-2xl" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Server Status
            </p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">
              Online
            </h3>
          </div>
        </div>
      </section>

      {/* Recent Users Table */}
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Recently Joined Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Joined On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentUsers.length > 0 ? (
                stats.recentUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                          {u.fullName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900">{u.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
