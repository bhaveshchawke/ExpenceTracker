import { createBrowserRouter, RouterProvider } from "react-router";
import { AppLayout } from "./Layouts/AppLayout";
import { DashBoard } from "./Pages/DashBoard";
import { TransactionPage } from "./Pages/TransactionPage";
import { BudgetPage } from "./Pages/BudgetPage";
import { ReportsPage } from "./Pages/ReportsPage";
import { ManageCategories } from "./Pages/ManageCategories";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { ForgotPassword } from "./Pages/ForgotPassword";
import { ProfilePage } from "./Pages/ProfilePage";
import { AdminDashboard } from "./Pages/AdminDashboard";
import { ProtectedRoute } from "./Routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/transactions",
        element: (
          <ProtectedRoute>
            <TransactionPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/budgets",
        element: (
          <ProtectedRoute>
            <BudgetPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reports",
        element: (
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "/setbudget",
        element: (
          <ProtectedRoute>
            <ManageCategories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
