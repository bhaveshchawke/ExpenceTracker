import { createBrowserRouter, RouterProvider } from "react-router";
import { AppLayout } from "./Layouts/AppLayout";
import { DashBoard } from "./Pages/DashBoard";
import { TransactionPage } from "./Pages/TransactionPage";
import { BudgetPage } from "./Pages/BudgetPage";
import { ReportsPage } from "./Pages/ReportsPage";
import { AddTranscationsPage } from "./Pages/AddTranscationsPage";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
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
        path: "/budgests",
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
        path: "/addtransactions",
        element: (
          <ProtectedRoute>
            <AddTranscationsPage />
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
